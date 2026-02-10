import React, { useState } from 'react';
import { Mail, Bell } from 'lucide-react';

const Settings = () => {
  const [googleConnected, setGoogleConnected] = useState(true);
  const [linkedinConnected, setLinkedinConnected] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <h1 className="text-gray-800 text-lg font-medium mb-6">Settings</h1>

      <div className="space-y-4 max-w-3xl">
        
        {/* Notifications Card */}
        <div className="bg-white rounded-lg border-2 border-blue-400 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Notifications</h2>
              <p className="text-sm text-gray-500">Email Alerts for Saved Lists/Searches</p>
            </div>
            <div className="ml-auto">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={() => setEmailAlerts(!emailAlerts)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Social Authentication Card */}
        <div className="bg-white rounded-lg border-2 border-blue-400 overflow-hidden">
          {/* Header */}
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Social Authentication</h2>
            <p className="text-sm text-gray-500">Connect at least one social network account to contribute to Crunchbase.</p>
          </div>

          {/* Google */}
          <div className="p-5 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-medium text-gray-700">Google</span>
            </div>
            <button
              onClick={() => setGoogleConnected(!googleConnected)}
              className={`px-5 py-2 rounded-md text-sm font-medium transition ${
                googleConnected
                  ? 'bg-[#2d3748] text-white hover:bg-[#1a202c]'
                  : 'bg-[#2d3748] text-white hover:bg-[#1a202c]'
              }`}
            >
              {googleConnected ? 'Disconnect' : 'Connect'}
            </button>
          </div>

          {/* LinkedIn */}
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="font-medium text-gray-700">Linkedin</span>
            </div>
            <button
              onClick={() => setLinkedinConnected(!linkedinConnected)}
              className={`px-5 py-2 rounded-md text-sm font-medium transition ${
                linkedinConnected
                  ? 'bg-[#2d3748] text-white hover:bg-[#1a202c]'
                  : 'bg-[#2d3748] text-white hover:bg-[#1a202c]'
              }`}
            >
              {linkedinConnected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        </div>

        {/* My Verified Companies Card */}
        <div className="bg-white rounded-lg border-2 border-blue-400 p-5">
          <h2 className="font-semibold text-gray-800 mb-4">My Verified Companies</h2>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 to-orange-500">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Don't see your company?</h3>
                <p className="text-sm text-gray-500">You don't have any verified companies yet. Add your first company now.</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-[#2d3748] text-white rounded-md text-sm font-medium hover:bg-[#1a202c] transition whitespace-nowrap">
              Verify Company
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;
