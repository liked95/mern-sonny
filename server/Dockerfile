FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json to the container
COPY package.json ./

# Install all dependencies without relying on a lockfile
RUN yarn install

# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 8000

# Use nodemon for development or ts-node directly
CMD ["yarn", "dev"]
