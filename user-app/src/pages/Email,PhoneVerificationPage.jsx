import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, Mail, Smartphone, ArrowRight, RefreshCw, Shield } from 'lucide-react';

export default function VerificationPage() {
  const [verificationType, setVerificationType] = useState('email'); // 'email' or 'phone'
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Contact info (would come from registration)
  const email = "john.doe@example.com";
  const phone = "+1 (555) ***-**34";

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleCodeChange = (index, value) => {
    // Only allow numbers
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setVerificationCode(newCode);

    // Focus last filled input
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleResend = async () => {
    setIsResending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsResending(false);
    setCountdown(60);
    setCanResend(false);
    setVerificationCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const handleVerify = () => {
    const code = verificationCode.join('');
    if (code.length === 6) {
      console.log('Verifying code:', code, 'Type:', verificationType);
      // Handle verification logic
    }
  };

  const switchVerificationType = () => {
    setVerificationType(verificationType === 'email' ? 'phone' : 'email');
    setVerificationCode(['', '', '', '', '', '']);
    setCountdown(60);
    setCanResend(false);
    inputRefs.current[0]?.focus();
  };

  const isCodeComplete = verificationCode.every(digit => digit !== '');

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
      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-purple-100/70 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8">
            <Shield className="w-5 h-5 text-purple-700" />
            <span className="text-purple-900 font-semibold text-sm">Verified & Trusted Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-slate-800">Verify Your </span>
            <span className="text-purple-400">Account</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We've sent a verification code to secure your account and ensure platform integrity
          </p>
        </div>

        {/* Verification Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-purple-100">
          {/* Verification Type Tabs */}
          <div className="flex gap-4 mb-10">
            <button
              onClick={() => switchVerificationType()}
              className={`flex-1 flex items-center justify-center space-x-3 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                verificationType === 'email'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Mail className="w-5 h-5" />
              <span>Email Verification</span>
            </button>
            <button
              onClick={() => switchVerificationType()}
              className={`flex-1 flex items-center justify-center space-x-3 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                verificationType === 'phone'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Smartphone className="w-5 h-5" />
              <span>Phone Verification</span>
            </button>
          </div>

          {/* Verification Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
              {verificationType === 'email' ? (
                <Mail className="w-10 h-10 text-purple-600" />
              ) : (
                <Smartphone className="w-10 h-10 text-blue-600" />
              )}
            </div>
          </div>

          {/* Message */}
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Enter Verification Code
            </h2>
            <p className="text-gray-600">
              We sent a 6-digit code to{' '}
              <span className="font-semibold text-gray-800">
                {verificationType === 'email' ? email : phone}
              </span>
            </p>
          </div>

          {/* Code Input */}
          <div className="flex justify-center gap-3 mb-8">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-14 h-16 text-center text-2xl font-bold rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:outline-none transition-colors"
                autoFocus={index === 0}
              />
            ))}
          </div>

          {/* Resend Code */}
          <div className="text-center mb-8">
            {canResend ? (
              <button
                onClick={handleResend}
                disabled={isResending}
                className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isResending ? 'animate-spin' : ''}`} />
                <span>{isResending ? 'Resending...' : 'Resend Code'}</span>
              </button>
            ) : (
              <p className="text-gray-600">
                Didn't receive the code?{' '}
                <span className="font-semibold text-gray-800">Resend in {countdown}s</span>
              </p>
            )}
          </div>

          {/* Switch Method */}
          <div className="text-center mb-8 pb-8 border-b border-gray-200">
            <button
              onClick={switchVerificationType}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Verify via {verificationType === 'email' ? 'phone' : 'email'} instead
            </button>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={!isCodeComplete}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
              isCodeComplete
                ? 'bg-gradient-to-r from-slate-700 to-blue-900 text-white hover:from-slate-800 hover:to-blue-950 shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>Verify & Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Security Note */}
        <div className="mt-10 bg-blue-50/50 backdrop-blur-sm border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Security First</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                This verification step ensures the security of your account and helps us maintain 
                a trusted community. Your code will expire in 10 minutes for security purposes.
              </p>
            </div>
          </div>
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

        input[type="text"] {
          animation: fadeIn 0.3s ease-out;
        }

        input[type="text"]:nth-child(2) {
          animation-delay: 0.05s;
        }

        input[type="text"]:nth-child(3) {
          animation-delay: 0.1s;
        }

        input[type="text"]:nth-child(4) {
          animation-delay: 0.15s;
        }

        input[type="text"]:nth-child(5) {
          animation-delay: 0.2s;
        }

        input[type="text"]:nth-child(6) {
          animation-delay: 0.25s;
        }
      `}</style>
    </div>
  );
}