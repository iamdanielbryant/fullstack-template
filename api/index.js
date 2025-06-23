// This file serves as an entry point for Vercel serverless functions
const express = require('express');
const app = require('../backend/server.js');

// Handle all API routes
module.exports = (req, res) => {
  // Log the incoming request for debugging
  console.log('API request received:', req.url);
  
  // Forward the request to the Express app
  return app(req, res);
}; 