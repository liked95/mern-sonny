FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json to install dependencies
COPY package.json  ./

# Install dependencies
RUN yarn install

# Copy all project files into the container
COPY . .

# Expose Vite's default development server port
EXPOSE 5173

# Start the Vite development server
CMD ["yarn", "dev", "--host"]
