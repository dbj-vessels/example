const http = require('http');
const { config } = require('dotenv');
const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

config(); // load the .env file

const port = process.env.BACKEND_PORT; // Set the port for the backend container

if (!process.env.BACKEND_PORT) {
    console.error('Error: BACKEND_PORT environment variable is not defined in the .env file?');
    process.exit(1); // Exit the process with a non-zero status code
}

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



app.listen(port, () => {
    console.log(`Backend server is running on port ${port}, HTTP POST api endpoint is: ${api_endpoint}`);
});
