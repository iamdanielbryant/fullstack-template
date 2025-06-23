import React from 'react';

const HelloWorld: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Hello World!
        </h1>
        <p className="text-gray-600 text-lg">
          Welcome to your React app with TypeScript and Tailwind CSS
        </p>
        <div className="mt-6">
          <span className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
            React + TypeScript + Tailwind CSS
          </span>
        </div>
      </div>
    </div>
  );
};

export default HelloWorld; 