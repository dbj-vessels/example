# NODERIS
# (c) dbj.org CC BY SA 4.0
# Use a base Node.js image
FROM node:20-alpine

# local .env files are not recommended because they
# hide configuration from devops
# but if yuo still want that
# dotenv is required by node js for local .env files


# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
# RUN npm install dotenv
RUN npm install express
RUN npm install redis
RUN npm install

# If you are building your code for production
# RUN npm ci --omit=dev

# Copy the rest of the application code
COPY . .

# Expose the specified frontend port
# NOTE: this envvar has been passed from the docker-compose.yaml
EXPOSE ${NODERIS_PORT}

# Start the frontend application
CMD ["node", "noderis.js"]

