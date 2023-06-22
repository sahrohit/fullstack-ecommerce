# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the port on which the Node.js application will run
EXPOSE 3000

RUN pnpm run build

# Start the Node.js application

CMD [ "pnpm", "build:start" ]
