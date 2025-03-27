 // server/index.ts
 import express, { type Request, type Response, type NextFunction, type Express } from "express";
 import { Server } from "socket.io";
 import http from "http";
 import { fileURLToPath } from "url";
 import { dirname, join } from "path";
 import { setupVite, serveStatic, log } from "./vite";
 import helmet from "helmet";
 import compression from "compression";
 import cors from "cors";
 
 const __filename = fileURLToPath(import.meta.url);
 const __dirname = dirname(__filename);
 log(`Server root directory: ${__dirname}`);
 
 const app: Express = express();
 const server = http.createServer(app);
 const io = new Server(server, {
   cors: {
     origin: [
       "http://localhost:5001",
       "https://musicvest-mvp.web.app", // Updated Firebase Hosting URL
     ],
     methods: ["GET", "POST"],
   },
 });
 
 app.use(helmet());
 app.use(compression());
 app.use(cors({
   origin: [
     "http://localhost:5001",
     "https://musicvest-mvp.web.app", // Updated Firebase Hosting URL
   ],
   credentials: true,
 }));
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 
 app.use((req: Request, res: Response, next: NextFunction) => {
   const start = Date.now();
   const path = req.path;
   let capturedJsonResponse: Record<string, any> | undefined = undefined;
 
   const originalJson = res.json;
   res.json = function (body) {
     capturedJsonResponse = body;
     return originalJson.call(this, body);
   };
 
   res.on("finish", () => {
     const duration = Date.now() - start;
     let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
     if (capturedJsonResponse) {
       logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
     }
     if (logLine.length > 80) {
       logLine = logLine.slice(0, 79) + "…";
     }
     log(logLine);
   });
 
   next();
 });
 
 io.on("connection", (socket) => {
   log("New client connected");
   socket.on("disconnect", () => log("Client disconnected"));
 });
 
 (async () => {
   try {
     app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
       const status = err.status || err.statusCode || 500;
       const message = err.message || "Internal Server Error";
       log(`Error: ${message} (Status: ${status})`);
       res.status(status).json({ error: message });
     });
 
     log(`Environment: ${app.get("env")}`);
     if (app.get("env") === "development") {
       const viteSetup = await setupVite(app, server, __dirname);
       app.get("*", async (req: Request, res: Response) => {
         try {
           log(`Serving request for: ${req.url}`);
           const html = await viteSetup.vite.transformIndexHtml(
             req.url,
             "<!DOCTYPE html><html><head><title>MusicVestPro</title></head><body><div id='root'></div><script type='module' src='/src/main.tsx'></script></body></html>"
           );
           res.send(html);
         } catch (error: any) {
           log(`Vite transform error: ${error.message}`);
           res.status(500).json({ error: "Failed to load page" });
         }
       });
     } else {
       const distPath = join(__dirname, "../client/dist");
       serveStatic(app, distPath);
       app.get("*", (req: Request, res: Response) => {
         log(`Serving static request for: ${req.url}`);
         res.sendFile(join(distPath, "index.html"), (err) => {
           if (err) {
             log(`Static file error: ${err.message}`);
             res.status(404).json({ error: "Not Found" });
           }
         });
       });
     }
 
     const port = process.env.PORT || 5001;
     const host = "0.0.0.0";
     server.listen({ port, host, reusePort: true }, () => {
       log(`Server running at http://${host}:${port}`);
       if (process.env.NODE_ENV === "production") {
         log(`Production mode: Serving static files from ${join(__dirname, "../client/dist")}`);
       }
     });
 
   } catch (error: any) {
     log(`Server startup failed: ${error.message}`);
     process.exit(1);
   }
 })();