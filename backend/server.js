const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5151;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/hello', (req, res) => {
  res.json({ 
    message: 'Hello World from Express Backend!',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'Server is running properly'
  });
});

// Default route
app.get('/', (req, res) => {
  res.json({ 
    message: 'PFP Generator 2 Backend API',
    endpoints: [
      'GET /api/hello - Get hello world message',
      'GET /api/health - Check server health'
    ]
  });
});

// Only start the server if we're not in a serverless environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API endpoints available at:`);
    console.log(`  - http://localhost:${PORT}/api/hello`);
    console.log(`  - http://localhost:${PORT}/api/health`);
  });
}

// Export the Express app for serverless environments
module.exports = app; 