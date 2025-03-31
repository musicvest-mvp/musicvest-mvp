# Use the official Node.js 20 image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN echo 'Installing dependencies'
RUN npm install --force

# Copy the rest of the application
COPY . .

# Build the TypeScript code to JavaScript
RUN echo 'Compiling TypeScript code'
RUN npx tsc --project tsconfig.json

# Build the frontend
RUN echo 'Building the frontend'
RUN npm run build

# Expose the port the app runs on (Cloud Run uses PORT environment variable)
EXPOSE 8080

# Start the backend using the compiled JavaScript
CMD ["node", "server/index.js"]