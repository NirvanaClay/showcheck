const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Send the index.html file for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
