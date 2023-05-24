const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/api') {
        let data = '';

        req.on('data', (chunk) => {
            data += chunk;
        });

        req.on('end', () => {
            try {
                const jsonData = JSON.parse(data);
                // Process the JSON data received from the front-end container
                console.log('Received JSON data:', jsonData);

                // Example response data
                const responseData = {
                    message: 'Received and processed the JSON data successfully'
                };

                // Send the response back to the front-end container
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify(responseData));
            } catch (error) {
                console.error('Error parsing JSON data:', error);
                res.statusCode = 400;
                res.end('Error parsing JSON data');
            }
        });
    } else {
        res.statusCode = 404;
        res.end('Not found');
    }
});

const port = process.env.BACKEND_PORT; // Set the port for the backend container

if (!process.env.BACKEND_PORT) {
    console.error('Error: BACKEND_PORT environment variable is not defined.');
    process.exit(1); // Exit the process with a non-zero status code
}

server.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});
