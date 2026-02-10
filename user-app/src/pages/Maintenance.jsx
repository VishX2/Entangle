import React from 'react';
import { Wrench, Clock } from 'lucide-react';

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-12 max-w-lg w-full text-center border border-gray-200">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Wrench className="w-10 h-10 text-blue-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Under Maintenance</h1>
        <h2 className="text-lg font-medium text-gray-600 mb-4">We'll be back soon!</h2>
        
        <p className="text-gray-500 mb-8">
          We're currently performing scheduled maintenance to improve your experience. 
          Please check back in a little while.
        </p>

        {/* Estimated time */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8 inline-flex items-center gap-3">
          <Clock className="w-5 h-5 text-gray-500" />
          <span className="text-gray-600 font-medium">Estimated downtime: 30 minutes</span>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-gray-500">
            Need urgent assistance? Contact us at:
          </p>
          <a 
            href="mailto:support@entangle.com" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            support@entangle.com
          </a>
        </div>

        {/* Social links or status page */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-400">
            Follow us for updates on our progress
          </p>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
