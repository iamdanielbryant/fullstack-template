// Simplified API handler for Vercel serverless functions
module.exports = (req, res) => {
  try {
    // Basic response for debugging
    return res.status(200).json({
      message: 'Hello from serverless function',
      path: req.url,
      method: req.method,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in serverless function:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message || 'Unknown error occurred'
    });
  }
}; 