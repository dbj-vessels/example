# Use a base Node.js image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install dotenv
RUN npm install axios
RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Copy the rest of the application code
COPY . .

# Expose the specified frontend port
EXPOSE ${FRONTEND_PORT}

# Start the frontend application
CMD ["node", "frontend.js"]

