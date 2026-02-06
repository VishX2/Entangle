import React, { useState } from 'react';
import { CheckCircle, ArrowRight, TrendingUp, Briefcase, Users, Shield, Zap, Target } from 'lucide-react';

export default function UserTypeSelection() {
  const [selectedType, setSelectedType] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleContinue = () => {
    if (selectedType) {
      console.log('Selected user type:', selectedType);
      // Navigate to appropriate registration page
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <nav className="bg-gradient-to-r from-slate-700 via-slate-600 to-blue-900/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-white">
                Entangle
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <a href="#" className="text-white/90 hover:text-white transition-colors font-medium text-sm">How it works</a>
              <a href="#" className="text-white/90 hover:text-white transition-colors font-medium text-sm">Features</a>
              <a href="#" className="text-white/90 hover:text-white transition-colors font-medium text-sm">For Investors</a>
              <a href="#" className="text-white/90 hover:text-white transition-colors font-medium text-sm">For Startups</a>
              <a href="#" className="text-white/90 hover:text-white transition-colors font-medium text-sm">Login</a>
              <button className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2.5 rounded-lg font-medium transition-colors text-sm">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100/70 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8">
            <CheckCircle className="w-5 h-5 text-purple-700" />
            <span className="text-purple-900 font-semibold text-sm">Verified & Trusted Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-slate-800">Connect, </span>
            <span className="text-purple-400">Verify, </span>
            <span className="text-purple-400">Invest</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Smart matching platform connecting verified investors with promising startups through AI-powered compatibility scoring
          </p>
        </div>

        {/* User Type Selection Cards */}
        <div className="max-w-5xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Choose Your Account Type</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Investor Card */}
            <div
              onClick={() => setSelectedType('investor')}
              onMouseEnter={() => setHoveredCard('investor')}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative bg-white rounded-3xl p-10 cursor-pointer transition-all duration-300 border-4 ${
                selectedType === 'investor'
                  ? 'border-purple-500 shadow-2xl scale-105'
                  : 'border-gray-200 hover:border-purple-300 hover:shadow-xl'
              }`}
            >
              {selectedType === 'investor' && (
                <div className="absolute top-6 right-6">
                  <div className="bg-purple-500 rounded-full p-1">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              )}

              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                selectedType === 'investor' || hoveredCard === 'investor'
                  ? 'bg-gradient-to-br from-purple-500 to-blue-600'
                  : 'bg-gradient-to-br from-purple-100 to-blue-100'
              }`}>
                <TrendingUp className={`w-8 h-8 transition-colors duration-300 ${
                  selectedType === 'investor' || hoveredCard === 'investor' ? 'text-white' : 'text-purple-600'
                }`} />
              </div>

              <h3 className="text-3xl font-bold text-gray-800 mb-4">Investor</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Discover and invest in verified startups that match your investment criteria and expertise
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <span className="text-gray-700">Access to verified startups and entrepreneurs</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <span className="text-gray-700">AI-powered investment recommendations</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <span className="text-gray-700">Portfolio management and analytics</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <span className="text-gray-700">Secure communication and due diligence tools</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-medium">Perfect for:</span>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-700 font-semibold">Angel Investors & VCs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Entrepreneur Card */}
            <div
              onClick={() => setSelectedType('entrepreneur')}
              onMouseEnter={() => setHoveredCard('entrepreneur')}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative bg-white rounded-3xl p-10 cursor-pointer transition-all duration-300 border-4 ${
                selectedType === 'entrepreneur'
                  ? 'border-blue-500 shadow-2xl scale-105'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-xl'
              }`}
            >
              {selectedType === 'entrepreneur' && (
                <div className="absolute top-6 right-6">
                  <div className="bg-blue-500 rounded-full p-1">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              )}

              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                selectedType === 'entrepreneur' || hoveredCard === 'entrepreneur'
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                  : 'bg-gradient-to-br from-blue-100 to-purple-100'
              }`}>
                <Briefcase className={`w-8 h-8 transition-colors duration-300 ${
                  selectedType === 'entrepreneur' || hoveredCard === 'entrepreneur' ? 'text-white' : 'text-blue-600'
                }`} />
              </div>

              <h3 className="text-3xl font-bold text-gray-800 mb-4">Entrepreneur</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Get verified and connect with investors who align with your vision and funding needs
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <span className="text-gray-700">Get matched with relevant investors</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <span className="text-gray-700">Showcase your startup and pitch deck</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <span className="text-gray-700">Track investor interest and engagement</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <span className="text-gray-700">Access funding resources and guidance</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-medium">Perfect for:</span>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700 font-semibold">Startups & Founders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!selectedType}
            className={`inline-flex items-center space-x-3 px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
              selectedType
                ? 'bg-gradient-to-r from-slate-700 to-blue-900 text-white hover:from-slate-800 hover:to-blue-950 shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          {!selectedType && (
            <p className="mt-4 text-sm text-gray-500">Please select an account type to continue</p>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
            </div>
            <h3 className="font-bold text-gray-800 mb-2 text-lg">Government ID Verified</h3>
            <p className="text-sm text-gray-600">All users undergo secure identity verification</p>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Zap className="w-7 h-7 text-green-600" />
              </div>
            </div>
            <h3 className="font-bold text-gray-800 mb-2 text-lg">Smart Matching</h3>
            <p className="text-sm text-gray-600">AI-powered compatibility scoring system</p>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Shield className="w-7 h-7 text-green-600" />
              </div>
            </div>
            <h3 className="font-bold text-gray-800 mb-2 text-lg">Secure Messaging</h3>
            <p className="text-sm text-gray-600">Private & encrypted communication platform</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .grid > div {
          animation: slideUp 0.6s ease-out;
        }

        .grid > div:nth-child(2) {
          animation-delay: 0.1s;
        }
      `}</style>
    </div>
  );
}