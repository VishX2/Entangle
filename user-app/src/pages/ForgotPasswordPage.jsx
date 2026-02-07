import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, KeyRound, CheckCircle, ArrowLeft } from 'lucide-react';
import AuthHeader from '../components/AuthHeader';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F5F3E7]">
        <AuthHeader />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-[#8AABCD]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#465775]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#8AABCD]/20 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-[#2F3848] mb-4">Check Your Email</h1>
            
            <p className="text-[#465775]/80 mb-6">
              We've sent a password reset link to<br />
              <span className="font-semibold text-[#2F3848]">{email}</span>
            </p>

            <div className="bg-[#F5F3E7] rounded-xl p-4 mb-6">
              <p className="text-sm text-[#465775]/70">
                The link will expire in 15 minutes. If you don't see the email, check your spam folder.
              </p>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setEmail('');
              }}
              className="text-[#E5654E] hover:text-[#d55440] font-semibold transition"
            >
              Didn't receive email? Try again
            </button>

            <div className="mt-8">
              <Link 
                to="/login" 
                className="inline-flex items-center gap-2 text-[#465775] hover:text-[#E5654E] font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3E7]">
      <AuthHeader />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#8AABCD]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#465775]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6 border border-[#8AABCD]/30">
            <KeyRound className="w-5 h-5 text-[#465775]" />
            <span className="text-[#465775] font-semibold text-sm">Password Recovery</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-[#2F3848]">Forgot Your </span>
            <span className="text-[#E5654E]">Password?</span>
          </h1>
          
          <p className="text-[#465775]/80">
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#8AABCD]/20">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#465775] to-[#2F3848] flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-[#2F3848] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8AABCD]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your registered email"
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 ${
                    error ? 'border-red-300 bg-red-50' : 'border-[#8AABCD]/30 bg-[#F5F3E7]/30'
                  } focus:border-[#465775] focus:outline-none transition`}
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-[#465775] to-[#2F3848] text-white hover:from-[#3a4a66] hover:to-[#252d3a] shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Reset Link</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm border border-[#8AABCD]/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <KeyRound className="w-5 h-5 text-[#465775] mt-0.5" />
            <div>
              <h3 className="font-semibold text-[#2F3848] text-sm">Need help?</h3>
              <p className="text-xs text-[#465775]/70">
                Contact our support team if you're having trouble accessing your account.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/login" className="inline-flex items-center gap-2 text-[#465775] hover:text-[#E5654E] font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
