# Use a base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the frontend code to the container
COPY . .

# Build the frontend application
RUN npm run build

# Expose the port on which the frontend server will run
ENV FRONTEND_PORT 80
EXPOSE $FRONTEND_PORT

# Start the frontend server
CMD ["npm", "start"]
