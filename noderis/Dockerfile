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
COPY start.sh ./
RUN chmod +x ./start.sh

# for redis-cli try using the fully qualified path of the command - /usr/bin/redis-cli.
RUN apk --update add redis 

# add modules to node js
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
# CMD ["node", "noderis.js"]
CMD ["./start.sh"]

