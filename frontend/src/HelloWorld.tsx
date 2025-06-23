import React, { useState, useEffect } from 'react';

interface ApiResponse {
  message: string;
  timestamp: string;
}

const HelloWorld: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use environment variable for API URL with fallback
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5151';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/hello`);
        if (!response.ok) {
          throw new Error('Failed to fetch data from backend');
        }
        const result: ApiResponse = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

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
            <p className="text-sm mt-2">Make sure the backend server is running</p>
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