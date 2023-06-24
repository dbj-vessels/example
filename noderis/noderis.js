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


// const api_endpoint = '/api/endpoint';
const api_endpoint = '/';

// Endpoint for handling GET requests
app.get(api_endpoint, (req, res) => {
    try {
        const requestData = req.body;

        // Log the received JSON data
        console.log('Received JSON:', requestData);

        // Perform additional processing or handle the data as needed
        // var ok_msg = ""
        testRedis().then((result) => res.status(200).json({ 'status': 200, 'message': result }));
        // Send a success response
        // res.status(200).json({ message: ok_msg });
    } catch (error) {
        // Handle errors
        console.error('Error:', error.message);
        res.status(500).json({ 'error': 'Internal server error', 'message': error.message });
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// REDIS BASIC TEST
const redis = require("redis");

// Environment 
const noderisPort = process.env.NODERIS_PORT;
if (!noderisPort) throw Error("NODERIS_PORT is empty")


// Use here the port for the noderis container
app.listen(noderisPort, () => {
    console.log(`\n\nNODERIS server is running on port ${noderisPort}, HTTP POST api endpoint is: ${api_endpoint}`);
});



async function testRedis() {

    // complex Connection configuration to a remote redis
    // 
    // const cacheConnection = redis.createClient({
    //     // rediss for TLS
    //     url: `rediss://${redisHostName}:${noderisPort}`,
    //     password: redisPassword
    // });
    //
    // but we are using local linux server inside a container
    const cacheConnection = redis.createClient();
    // The above code connects to localhost on port 6379. 
    //
    // To connect to a different host or port, use a connection string in the format 
    // redis[s]://[[username][:password]@][host][:port][/db-number]:
    // example
    // createClient({
    //     url: 'redis://alice:foobared@awesome.redis.server:6380'
    // });

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