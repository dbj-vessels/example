# NODERIS
# (c) dbj.org CC BY SA 4.0
# Use a base Node.js image
FROM node:20-alpine

# local .env files are not recommended because they
# hide configuration from devops
# but if you still want that
# dotenv is required by node js for local .env files


# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
# COPY start.sh ./
# RUN chmod +x ./start.sh

# for redis-cli try using the fully qualified path of the command - /usr/bin/redis-cli.
# RUN apk --update add redis 

# add modules to node js
# RUN npm install dotenv
# RUN npm install express
# RUN npm install redis
# RUN npm install bull
RUN npm install winston
RUN npm install

# WARNING Memory overcommit must be enabled! 
# Without it, a background save or replication may fail under low memory condition. 
# To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot 
# or 
# run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
# RUN sysctl vm.overcommit_memory=1
#  => ERROR [10/11] RUN sysctl vm.overcommit_memory=1                                                                                                   0.3s 
# ------
#  > [10/11] RUN sysctl vm.overcommit_memory=1:
# #14 0.284 sysctl: error setting key 'vm.overcommit_memory': Read-only file system
# ------
# executor failed running [/bin/sh -c sysctl vm.overcommit_memory=1]: exit code: 1

# If you are building your code for production
# RUN npm ci --omit=dev

# Copy the rest of the application code
COPY . .

# Expose the specified frontend port
# NOTE: this envvar has been passed from the docker-compose.yaml
# EXPOSE ${NODERIS_PORT}


# Start the frontend application
CMD ["node", "cluster.js"]
# CMD ["./start.sh"]

