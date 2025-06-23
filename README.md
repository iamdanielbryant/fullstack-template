# Fullstack Template with Vercel Serverless API

This project is a template for a React frontend (with TypeScript and Tailwind CSS) and a Vercel serverless backend (using the `/api` directory for endpoints).

## Project Structure

- `/frontend` - React TypeScript application with Tailwind CSS
- `/api` - Vercel serverless function endpoints (e.g., `/api/hello.js`, `/api/health.js`)

## Local Development

### Frontend

```bash
cd frontend
npm install
npm start
```

The frontend will run on http://localhost:3000

### API (Serverless Functions)

- Each file in `/api` is a serverless endpoint when deployed to Vercel.
- For local API development, use [Vercel CLI](https://vercel.com/docs/cli):

```bash
vercel dev
```

This will run both the frontend and API endpoints locally, just like in production.

## Deployment to Vercel

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Login to Vercel:
   ```bash
   vercel login
   ```
3. Deploy:
   ```bash
   vercel
   ```

## API Endpoints

- `/api/hello` - Returns a hello world message
- `/api/health` - Returns a health check

## Notes

- There is no longer a traditional Node.js/Express backend. All backend logic is in serverless functions in `/api`.
- The frontend makes requests to `/api/*` endpoints, which are handled by Vercel serverless functions.
- For custom API logic, add new files to `/api` (e.g., `/api/my-endpoint.js`). 