import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: "public",
  base: "/",
  build: {
    outDir: "client/dist",
    emptyOutDir: true,
     rollupOptions: {

    },
  },
  server: { host: "0.0.0.0", port: 5001 },
});