import React from 'react';
import { ServerCrash } from 'lucide-react';
import { Link } from 'react-router-dom';

const Error500 = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-12 max-w-lg w-full text-center border border-gray-200">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ServerCrash className="w-10 h-10 text-orange-500" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-800 mb-2">500</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Internal Server Error</h2>
        
        <p className="text-gray-500 mb-8">
          Something went wrong on our end. We're working to fix the issue. Please try again later or contact support if the problem persists.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-[#2d3748] text-white rounded-lg font-medium hover:bg-[#1a202c] transition"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error500;
