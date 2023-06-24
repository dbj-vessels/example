// (c) dbj@dbj.org CC BY SA 4.0

// to use local .env file
// in the Dockerfile: RUN npm install dotenv
// const { config } = require('dotenv');
// config(); // load the .env file
// STOP AND THINK
// local (per container) .env files confuse devops 
// who are supposed to deploy 
// for local config use whatever else you can 
// basically let the docker compose script be the
// only one where environment is setup and coming from

const http = require('http');
const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());


const api_endpoint = '/api/endpoint';

// Endpoint for handling POST requests
app.post(api_endpoint, (req, res) => {
    try {
        const requestData = req.body;

        // Log the received JSON data
        console.log('Received JSON:', requestData);

        // Perform additional processing or handle the data as needed

        // Send a success response
        res.status(200).json({ message: 'Request successful' });
    } catch (error) {
        // Handle errors
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


const port = process.env.NODERIS_PORT; // Set the port for the noderis container

console.log('========================================================================================');

if (!process.env.NODERIS_PORT) {
    console.error('Error: NODERIS_PORT environment variable is not defined in the .env file?');
    process.exit(1); // Exit the process with a non-zero status code
}

// Use here the port for the noderis container
app.listen(port, () => {
    console.log(`NODERIS server is running on port ${port}, HTTP POST api endpoint is: ${api_endpoint}`);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// REDIS BASIC 
const redis = require("redis");

// Environment variables for cache
const redisHostName = process.env.REDIS_HOST_NAME;
const redisPort = process.env.REDIS_PORT;
const redisPassword = process.env.REDIS_ACCESS_KEY;

if (!redisHostName) throw Error("REDIS_HOST_NAME is empty")
if (!redisPort) throw Error("REDIS_PORT is empty")
if (!redisPassword) throw Error("REDIS_ACCESS_KEY is empty")

async function testRedis() {

    // Connection configuration
    const cacheConnection = redis.createClient({
        // rediss for TLS
        url: `rediss://${redisHostName}:${redisPort}`,
        password: redisPassword
    });

    // Connect to Redis
    await cacheConnection.connect();

    // PING command
    console.log("\nCache command: PING");
    console.log("Cache response : " + await cacheConnection.ping());

    // GET
    console.log("\nCache command: GET Message");
    console.log("Cache response : " + await cacheConnection.get("Message"));

    // SET
    console.log("\nCache command: SET Message");
    console.log("Cache response : " + await cacheConnection.set("Message",
        "Hello! The cache is working from Node.js!"));

    // GET again
    console.log("\nCache command: GET Message");
    console.log("Cache response : " + await cacheConnection.get("Message"));

    // Client list, useful to see if connection list is growing...
    console.log("\nCache command: CLIENT LIST");
    console.log("Cache response : " + await cacheConnection.sendCommand(["CLIENT", "LIST"]));

    // Disconnect
    cacheConnection.disconnect()

    return "testRedis() Done"
}

testRedis().then((result) => console.log(result)).catch(ex => console.log(ex));