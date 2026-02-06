import React, { useState } from 'react';
import { CheckCircle, Mail, ArrowRight, ArrowLeft, Lock, Shield, KeyRound } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: Email input, 2: Success message
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setStep(2);
  };

  const handleBackToLogin = () => {
    console.log('Navigate to login');
    // Handle navigation to login page
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
      <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-purple-100/70 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8">
            <Shield className="w-5 h-5 text-purple-700" />
            <span className="text-purple-900 font-semibold text-sm">Verified & Trusted Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {step === 1 ? (
              <>
                <span className="text-slate-800">Reset Your </span>
                <span className="text-purple-400">Password</span>
              </>
            ) : (
              <>
                <span className="text-slate-800">Check Your </span>
                <span className="text-purple-400">Email</span>
              </>
            )}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {step === 1 
              ? "Enter your email address and we'll send you instructions to reset your password"
              : "We've sent password reset instructions to your email address"
            }
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-purple-100">
          {step === 1 ? (
            /* Step 1: Email Input Form */
            <>
              {/* Icon */}
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                  <KeyRound className="w-10 h-10 text-purple-600" />
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 ${
                        error ? 'border-red-400' : 'border-gray-200'
                      } focus:border-purple-500 focus:outline-none transition-colors text-lg`}
                      placeholder="john.doe@example.com"
                      required
                    />
                  </div>
                  {error && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠</span> {error}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3 mb-6 ${
                    isSubmitting || !email
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-slate-700 to-blue-900 text-white hover:from-slate-800 hover:to-blue-950 shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Back to Login */}
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 font-medium transition-colors py-3"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Login</span>
                </button>
              </form>
            </>
          ) : (
            /* Step 2: Success Message */
            <div className="text-center animate-fadeIn">
              {/* Success Icon */}
              <div className="flex justify-center mb-8">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-14 h-14 text-green-600" />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Email Sent Successfully!
              </h2>

              <p className="text-gray-600 mb-3 text-lg">
                We've sent password reset instructions to
              </p>
              <p className="text-purple-600 font-bold text-xl mb-8">
                {email}
              </p>

              <div className="bg-blue-50/50 backdrop-blur-sm border-2 border-blue-200 rounded-xl p-6 mb-8">
                <div className="flex items-start space-x-3">
                  <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800 mb-2">Next Steps</h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2">1.</span>
                        <span>Check your email inbox and spam folder</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">2.</span>
                        <span>Click the password reset link in the email</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">3.</span>
                        <span>Create a new secure password</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">4.</span>
                        <span>Log in with your new credentials</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-8">
                Didn't receive the email?{' '}
                <button 
                  onClick={() => setStep(1)}
                  className="text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Try again
                </button>
              </p>

              {/* Back to Login */}
              <button
                onClick={handleBackToLogin}
                className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-slate-700 to-blue-900 text-white hover:from-slate-800 hover:to-blue-950 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Login</span>
              </button>
            </div>
          )}
        </div>

        {/* Security Note */}
        {step === 1 && (
          <div className="mt-10 bg-purple-50/50 backdrop-blur-sm border-2 border-purple-200 rounded-2xl p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Security Notice</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  For your security, the password reset link will expire in 1 hour. 
                  If you didn't request a password reset, please ignore this or contact our support team.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100">
            <div className="flex justify-center mb-3">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Government ID Verified</h3>
            <p className="text-sm text-gray-600">Secure identity verification process</p>
          </div>
          
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100">
            <div className="flex justify-center mb-3">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Smart Matching</h3>
            <p className="text-sm text-gray-600">AI-powered investor compatibility</p>
          </div>
          
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100">
            <div className="flex justify-center mb-3">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Secure Messaging</h3>
            <p className="text-sm text-gray-600">Private & encrypted communication</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}