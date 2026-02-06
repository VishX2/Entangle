import React, { useState } from 'react';
import { CheckCircle, Eye, EyeOff, Lock, Shield, ArrowRight, Check, X } from 'lucide-react';

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Password strength validation
  const passwordRequirements = [
    { id: 'length', label: 'At least 8 characters', test: (pwd) => pwd.length >= 8 },
    { id: 'uppercase', label: 'One uppercase letter', test: (pwd) => /[A-Z]/.test(pwd) },
    { id: 'lowercase', label: 'One lowercase letter', test: (pwd) => /[a-z]/.test(pwd) },
    { id: 'number', label: 'One number', test: (pwd) => /\d/.test(pwd) },
    { id: 'special', label: 'One special character', test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) }
  ];

  const getPasswordStrength = (password) => {
    const passed = passwordRequirements.filter(req => req.test(password)).length;
    if (passed <= 2) return { label: 'Weak', color: 'red', width: '33%' };
    if (passed <= 4) return { label: 'Medium', color: 'yellow', width: '66%' };
    return { label: 'Strong', color: 'green', width: '100%' };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors for the field being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Check if all requirements are met
    const allRequirementsMet = passwordRequirements.every(req => req.test(formData.password));
    if (!allRequirementsMet) {
      newErrors.password = 'Password does not meet all requirements';
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleLoginRedirect = () => {
    console.log('Redirect to login');
    // Handle navigation to login page
  };

  const strength = formData.password ? getPasswordStrength(formData.password) : null;

  if (isSuccess) {
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
                <span className="text-xl font-semibold text-white">Entangle</span>
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

        {/* Success Content */}
        <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-purple-100/70 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8">
              <Shield className="w-5 h-5 text-purple-700" />
              <span className="text-purple-900 font-semibold text-sm">Verified & Trusted Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-slate-800">Password </span>
              <span className="text-purple-400">Reset!</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Your password has been successfully reset
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-purple-100 text-center animate-fadeIn">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-14 h-14 text-green-600" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              All Set!
            </h2>

            <p className="text-gray-600 mb-8 text-lg">
              Your password has been changed successfully. You can now log in with your new password.
            </p>

            <button
              onClick={handleLoginRedirect}
              className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-slate-700 to-blue-900 text-white hover:from-slate-800 hover:to-blue-950 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <span>Go to Login</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

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
      </div>
    );
  }

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
            <span className="text-slate-800">Create New </span>
            <span className="text-purple-400">Password</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your new password must be different from previously used passwords
          </p>
        </div>

        {/* Reset Password Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-purple-100">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
              <Lock className="w-10 h-10 text-purple-600" />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-12 py-4 rounded-xl border-2 ${
                    errors.password ? 'border-red-400' : 'border-gray-200'
                  } focus:border-purple-500 focus:outline-none transition-colors text-lg`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <X className="w-4 h-4 mr-1" /> {errors.password}
                </p>
              )}

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Password Strength:</span>
                    <span className={`text-sm font-bold ${
                      strength.color === 'green' ? 'text-green-600' : 
                      strength.color === 'yellow' ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {strength.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        strength.color === 'green' ? 'bg-green-500' : 
                        strength.color === 'yellow' ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`}
                      style={{ width: strength.width }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-12 py-4 rounded-xl border-2 ${
                    errors.confirmPassword ? 'border-red-400' : 'border-gray-200'
                  } focus:border-purple-500 focus:outline-none transition-colors text-lg`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <X className="w-4 h-4 mr-1" /> {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-blue-50/50 backdrop-blur-sm border-2 border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                Password Requirements
              </h3>
              <div className="space-y-2">
                {passwordRequirements.map(req => {
                  const isPassed = formData.password ? req.test(formData.password) : false;
                  return (
                    <div key={req.id} className="flex items-center space-x-2">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                        isPassed ? 'bg-green-100' : 'bg-gray-200'
                      }`}>
                        {isPassed ? (
                          <Check className="w-3 h-3 text-green-600" />
                        ) : (
                          <X className="w-3 h-3 text-gray-400" />
                        )}
                      </div>
                      <span className={`text-sm ${isPassed ? 'text-green-700 font-medium' : 'text-gray-600'}`}>
                        {req.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
                isSubmitting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-slate-700 to-blue-900 text-white hover:from-slate-800 hover:to-blue-950 shadow-lg hover:shadow-xl transform hover:scale-105'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Resetting Password...</span>
                </>
              ) : (
                <>
                  <span>Reset Password</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

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