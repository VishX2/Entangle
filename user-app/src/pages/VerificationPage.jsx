import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Smartphone, ArrowRight, RefreshCw, Shield, CheckCircle } from 'lucide-react';
import AuthSidebar from '../components/AuthSidebar';

export default function VerificationPage() {
  const navigate = useNavigate();
  const [verificationType, setVerificationType] = useState('email');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

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
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    setIsResending(true);
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
      console.log('Verifying code:', code);
      navigate('/login');
    }
  };

  const isCodeComplete = verificationCode.every(digit => digit !== '');

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <AuthSidebar />

      {/* Main Content */}
      <div className="flex-1 bg-[#F5F3E7] relative overflow-auto">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-[#8AABCD]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#465775]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6 border border-[#8AABCD]/30">
            <Shield className="w-5 h-5 text-[#465775]" />
            <span className="text-[#465775] font-semibold text-sm">Secure Verification</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-[#2F3848]">Verify Your </span>
            <span className="text-[#E5654E]">Account</span>
          </h1>
          
          <p className="text-[#465775]/80">
            We've sent a verification code to secure your account
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#8AABCD]/20">
          {/* Verification Type Tabs */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => {
                setVerificationType('email');
                setVerificationCode(['', '', '', '', '', '']);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
                verificationType === 'email'
                  ? 'bg-gradient-to-r from-[#465775] to-[#2F3848] text-white shadow-lg'
                  : 'bg-[#F5F3E7] text-[#465775] hover:bg-[#8AABCD]/20'
              }`}
            >
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </button>
            <button
              onClick={() => {
                setVerificationType('phone');
                setVerificationCode(['', '', '', '', '', '']);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
                verificationType === 'phone'
                  ? 'bg-gradient-to-r from-[#465775] to-[#2F3848] text-white shadow-lg'
                  : 'bg-[#F5F3E7] text-[#465775] hover:bg-[#8AABCD]/20'
              }`}
            >
              <Smartphone className="w-5 h-5" />
              <span>Phone</span>
            </button>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#465775]/10 flex items-center justify-center">
              {verificationType === 'email' ? (
                <Mail className="w-8 h-8 text-[#465775]" />
              ) : (
                <Smartphone className="w-8 h-8 text-[#465775]" />
              )}
            </div>
          </div>

          {/* Message */}
          <div className="text-center mb-8">
            <h2 className="text-lg font-bold text-[#2F3848] mb-2">Enter Verification Code</h2>
            <p className="text-sm text-[#465775]/70">
              Code sent to <span className="font-semibold text-[#2F3848]">{verificationType === 'email' ? email : phone}</span>
            </p>
          </div>

          {/* Code Input */}
          <div className="flex justify-center gap-3 mb-6">
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
                className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 border-[#8AABCD]/30 focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30"
                autoFocus={index === 0}
              />
            ))}
          </div>

          {/* Resend Code */}
          <div className="text-center mb-6">
            {canResend ? (
              <button
                onClick={handleResend}
                disabled={isResending}
                className="inline-flex items-center gap-2 text-[#E5654E] hover:text-[#d55440] font-semibold transition disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isResending ? 'animate-spin' : ''}`} />
                <span>{isResending ? 'Resending...' : 'Resend Code'}</span>
              </button>
            ) : (
              <p className="text-sm text-[#465775]/70">
                Resend in <span className="font-semibold text-[#2F3848]">{countdown}s</span>
              </p>
            )}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={!isCodeComplete}
            className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              isCodeComplete
                ? 'bg-gradient-to-r from-[#465775] to-[#2F3848] text-white hover:from-[#3a4a66] hover:to-[#252d3a] shadow-lg'
                : 'bg-[#8AABCD]/30 text-[#465775]/50 cursor-not-allowed'
            }`}
          >
            <span>Verify & Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Security Note */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm border border-[#8AABCD]/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#465775] mt-0.5" />
            <div>
              <h3 className="font-semibold text-[#2F3848] text-sm">Security First</h3>
              <p className="text-xs text-[#465775]/70">
                This verification ensures account security. Code expires in 10 minutes.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/login" className="text-[#465775] hover:text-[#E5654E] font-medium transition-colors">
            ← Back to Login
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}
