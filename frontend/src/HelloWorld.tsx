import React, { useState, useEffect } from 'react';

interface ApiResponse {
  message: string;
  timestamp: string;
  environment?: string;
}

interface ApiError {
  error?: string;
  message?: string;
  path?: string;
}

const HelloWorld: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<ApiError | null>(null);

  // In production (Vercel), we want to use relative URLs
  // In development, we use the localhost URL
  const isProduction = process.env.NODE_ENV === 'production';
  const API_URL = isProduction ? '' : (process.env.REACT_APP_API_URL || 'http://localhost:5151');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // In production, we use a relative URL
        const apiPath = `/api/hello`;
        const url = isProduction ? apiPath : `${API_URL}${apiPath}`;
        
        console.log('Fetching from URL:', url);
        const response = await fetch(url);
        
        const contentType = response.headers.get('content-type');
        const isJson = contentType && contentType.includes('application/json');
        
        if (!response.ok) {
          if (isJson) {
            const errorData: ApiError = await response.json();
            setErrorDetails(errorData);
            throw new Error(`Server error: ${errorData.message || response.status}`);
          } else {
            const text = await response.text();
            throw new Error(`Failed to fetch data from backend: ${response.status} - ${text.substring(0, 100)}`);
          }
        }
        
        const result: ApiResponse = await response.json();
        setData(result);
        setErrorDetails(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL, isProduction]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
        {loading && (
          <div className="text-gray-600">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            Loading...
          </div>
        )}
        
        {error && (
          <div className="text-red-600">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p>{error}</p>
            <p className="text-sm mt-2">API URL: {isProduction ? '/api/hello' : `${API_URL}/api/hello`}</p>
            
            {errorDetails && (
              <div className="mt-4 p-4 bg-red-50 rounded text-left">
                <h2 className="font-bold">Error Details:</h2>
                {errorDetails.error && <p>Type: {errorDetails.error}</p>}
                {errorDetails.message && <p>Message: {errorDetails.message}</p>}
                {errorDetails.path && <p>Path: {errorDetails.path}</p>}
              </div>
            )}
            
            <div className="mt-4">
              <button 
                onClick={() => window.location.reload()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Retry
              </button>
            </div>
          </div>
        )}
        
        {data && !loading && !error && (
          <>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {data.message}
            </h1>
            <p className="text-gray-600 text-lg mb-4">
              Welcome to your React app with Express backend!
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Data fetched at: {new Date(data.timestamp).toLocaleString()}
            </p>
            {data.environment && (
              <p className="text-sm text-gray-500 mb-4">
                Environment: {data.environment}
              </p>
            )}
            <div className="mt-6">
              <span className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                React + TypeScript + Express + API
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HelloWorld; 