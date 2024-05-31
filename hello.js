const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the port number
const PORT = 3000;

// Helper function to handle file operations
const handleFileOperation = (req, res) => {
    const urlParts = req.url.split('/');
    const operation = urlParts[1];
    const fileName = urlParts[2];

    // Ensure the fileName is provided
    if (!fileName) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('File name is required');
        return;
    }

    const filePath = path.join(__dirname, fileName);

    switch (operation) {
        case 'create':
            fs.writeFile(filePath, 'Hello, World!', (err) => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Error creating file');
                    return;
                }
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('File created successfully');
            });
            break;

        case 'read':
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(404, {'Content-Type': 'text/plain'});
                    res.end('File not found');
                    return;
                }
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end(data);
            });
            break;

        case 'delete':
            fs.unlink(filePath, (err) => {
                if (err) {
                    res.writeHead(404, {'Content-Type': 'text/plain'});
                    res.end('File not found');
                    return;
                }
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('File deleted successfully');
            });
            break;

        default:
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Invalid operation');
    }
};

// Create the HTTP server
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        handleFileOperation(req, res);
    } else {
        res.writeHead(405, {'Content-Type': 'text/plain'});
        res.end('Method not allowed');
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
