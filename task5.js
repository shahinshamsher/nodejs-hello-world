const express = require('express');
const app = express();
const port = 3000;

// Middleware function to log request details
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Middleware to parse JSON bodies
app.use(express.json());

// Route for the root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Express.js server!');
});

// Route for the /about endpoint
app.get('/about', (req, res) => {
  res.send('This is the about page.');
});

// Route for the /data endpoint that accepts POST requests
app.post('/data', (req, res) => {
  const data = req.body;
  res.json({
    message: 'Data received successfully!',
    data: data
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
