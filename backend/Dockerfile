# (c) dbj.org CC BY SA 4.0
# Use a base Node.js image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
# dotenv is required by node js for local .env files
# separate and only for this container
# RUN npm install dotenv
RUN npm install express
RUN npm install

# If you are building your code for production
# RUN npm ci --omit=dev

# Copy the rest of the application code
COPY . .

# Expose the specified frontend port
EXPOSE ${BACKEND_PORT}

# Start the frontend application
CMD ["node", "backend.js"]

