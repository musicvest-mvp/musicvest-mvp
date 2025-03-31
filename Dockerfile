# Use the official Node.js 20 image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Echo and ls -la before installing dependencies
RUN echo 'Installing dependencies' && ls -la
# Install dependencies
RUN npm install && ls -la

# Copy the rest of the application
COPY . .

# Echo and ls -la before compiling TypeScript code
RUN echo 'Compiling TypeScript code' && ls -la
# Build the TypeScript code to JavaScript
RUN npx tsc --project tsconfig.json && ls -la

# Echo and ls -la before building the frontend
RUN echo 'Building the frontend' && ls -la
# Build the frontend
RUN npm run build && ls -la

# Expose the port the app runs on (Cloud Run uses PORT environment variable)
EXPOSE 8080

# Start the backend using the compiled JavaScript
CMD ["node", "server/index.js"]