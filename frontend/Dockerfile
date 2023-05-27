# (c) dbj.org CC BY SA 4.0
# Use a base Node.js image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
# RUN npm install dotenv
RUN npm install axios
RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Copy the rest of the application code
COPY . .

# this Dockerfile is called from docker-compose.yaml
# over there we have
# env_file:
#   - .env
# that is loading the .env file that is in the same folder as docker-compose.yaml
# whatever is in that file we can use here as bellow
# Expose the specified frontend port
EXPOSE ${FRONTEND_PORT}

# Start the frontend application
CMD ["node", "frontend.js"]

