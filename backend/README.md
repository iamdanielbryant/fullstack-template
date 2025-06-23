# PFP Generator 2 - Backend

A simple Express.js backend that provides API endpoints for the PFP Generator 2 application.

## Getting Started

### Installation

```bash
npm install
```

### Running the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on port 5000 by default.

## API Endpoints

- `GET /` - API information and available endpoints
- `GET /api/hello` - Returns a hello world message with timestamp
- `GET /api/health` - Health check endpoint

## Example Usage

```bash
# Get hello world message
curl http://localhost:5000/api/hello

# Check server health
curl http://localhost:5000/api/health
``` 