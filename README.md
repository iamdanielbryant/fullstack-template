# Fullstack Template with Vercel Deployment

This is a fullstack template project with React frontend and Express backend, configured for deployment on Vercel.

## Project Structure

- `/frontend` - React TypeScript application with Tailwind CSS
- `/backend` - Express.js API server
- `/api` - Serverless function entry point for Vercel

## Local Development

### Running Both Frontend and Backend

```bash
# Install all dependencies (frontend, backend, and root)
npm run install:all

# Run both frontend and backend concurrently
npm run dev
```

The frontend will run on http://localhost:3000 and the backend on http://localhost:5151.

### Running Separately

#### Frontend

```bash
cd frontend
npm install
npm start
```

#### Backend

```bash
cd backend
npm install
npm run dev
```

## Deployment to Vercel

This project is configured to deploy both the frontend and backend to Vercel in a single deployment.

### Setup

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy to Vercel:
   ```bash
   vercel
   ```

### Environment Variables

When deploying to Vercel, the following environment variables are automatically set:

- `REACT_APP_API_URL=` (empty string) - This ensures the frontend connects to the backend API at the same domain

### Production Deployment

For production deployment:

```bash
vercel --prod
```

## Configuration Files

- `vercel.json` - Contains the Vercel deployment configuration for both frontend and backend
- `api/index.js` - Serverless function entry point that imports the Express app
- `frontend/package.json` - Includes the build scripts for Vercel deployment
- `backend/server.js` - Express server configured to work with Vercel serverless functions

## Notes

- The API routes are prefixed with `/api` in both development and production
- The frontend build is served from the `/` route
- In development, you can run both the frontend and backend servers with a single command: `npm run dev`
- The backend server is configured to run as a regular Express server in development and as a serverless function in production 