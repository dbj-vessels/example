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


const redistest_endpoint = '/reditest';

// Endpoint for handling GET requests
app.get(redistest_endpoint, (req, res) => {
    try {
        const requestData = req.body;

        // Log the received JSON data
        console.log('redistest_endpoint Received JSON:', requestData);

        const test_redis_mod = require('./testredis');

        // 
        test_redis_mod.test().then((result) => res.status(200).json({ 'status': 200, 'message': result }));

    } catch (error) {
        // Handle errors
        console.error('Error:', error.message);
        res.status(500).json({ 'status': 500, 'error': 'redistest_endpoint Internal server error', 'message': error.message });
    }
});


// Environment 
const submit_and_rezultPort = process.env.SUBMITANDREASULT_PORT;
if (!submit_and_rezultPort) throw Error("SUBMITANDREASULT_PORT is empty")


// Use here the port for the noderis container
app.listen(submit_and_rezultPort, () => {
    console.log(`\n\SUBMITANDREASULT server is running on port ${submit_and_rezultPort}, redistest_endpoint HTTP GET api endpoint is: ${redistest_endpoint}`);
});


