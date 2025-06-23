const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5151;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins in serverless environment
  credentials: true
}));
app.use(express.json());

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Express error:', err);
  res.status(500).json({
    error: 'Server Error',
    message: err.message || 'Unknown error occurred'
  });
});

// Routes - handle both with and without /api prefix for flexibility
const helloHandler = (req, res) => {
  try {
    res.json({ 
      message: 'Hello World from Express Backend!',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    console.error('Error in hello handler:', error);
    res.status(500).json({ error: error.message || 'Error generating response' });
  }
};

// Routes with both /api prefix and without for serverless flexibility
app.get('/api/hello', helloHandler);
app.get('/hello', helloHandler);

const healthHandler = (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'Server is running properly',
    environment: process.env.NODE_ENV || 'development'
  });
};

app.get('/api/health', healthHandler);
app.get('/health', healthHandler);

// Default route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend API',
    environment: process.env.NODE_ENV || 'development',
    endpoints: [
      'GET /api/hello - Get hello world message',
      'GET /api/health - Check server health'
    ]
  });
});

// Catch-all route for debugging
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route not found: ${req.originalUrl}`,
    method: req.method,
    path: req.path
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