// This file serves as an entry point for Vercel serverless functions
const express = require('express');
const app = require('../backend/server.js');

// Handle all API routes
module.exports = (req, res) => {
  try {
    // Log the incoming request for debugging
    console.log('API request received:', req.url, req.method);
    
    // Forward the request to the Express app
    return app(req, res);
  } catch (error) {
    // Log any errors
    console.error('Error in API handler:', error);
    
    // Send a more informative error response
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message || 'Unknown error occurred',
      path: req.url
    });
  }
}; 