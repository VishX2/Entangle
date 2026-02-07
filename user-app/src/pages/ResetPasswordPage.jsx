import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle, XCircle, ShieldCheck } from 'lucide-react';
import AuthHeader from '../components/AuthHeader';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', met: /[a-z]/.test(password) },
    { label: 'One number', met: /\d/.test(password) },
    { label: 'One special character (!@#$%^&*)', met: /[!@#$%^&*]/.test(password) },
  ];

  const allRequirementsMet = passwordRequirements.every(req => req.met);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const getPasswordStrength = () => {
    const metCount = passwordRequirements.filter(req => req.met).length;
    if (metCount <= 1) return { label: 'Weak', color: 'bg-red-500', width: '20%' };
    if (metCount <= 2) return { label: 'Fair', color: 'bg-orange-500', width: '40%' };
    if (metCount <= 3) return { label: 'Good', color: 'bg-yellow-500', width: '60%' };
    if (metCount <= 4) return { label: 'Strong', color: 'bg-blue-500', width: '80%' };
    return { label: 'Very Strong', color: 'bg-green-500', width: '100%' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!allRequirementsMet) {
      setError('Please meet all password requirements');
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
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
            
            <h1 className="text-2xl font-bold text-[#2F3848] mb-4">Password Reset Successful!</h1>
            
            <p className="text-[#465775]/80 mb-8">
              Your password has been updated successfully. You can now login with your new password.
            </p>

            <button
              onClick={() => navigate('/login')}
              className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-[#465775] to-[#2F3848] text-white hover:from-[#3a4a66] hover:to-[#252d3a] shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Continue to Login</span>
              <ArrowRight className="w-5 h-5" />
            </button>
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
            <ShieldCheck className="w-5 h-5 text-[#465775]" />
            <span className="text-[#465775] font-semibold text-sm">Secure Reset</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-[#2F3848]">Create New </span>
            <span className="text-[#E5654E]">Password</span>
          </h1>
          
          <p className="text-[#465775]/80">
            Choose a strong password to protect your account
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#8AABCD]/20">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#465775] to-[#2F3848] flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password Field */}
            <div>
              <label className="block text-sm font-semibold text-[#2F3848] mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8AABCD]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter new password"
                  className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-[#8AABCD]/30 bg-[#F5F3E7]/30 focus:border-[#465775] focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8AABCD] hover:text-[#465775] transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password Strength Bar */}
              {password && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#465775]/70">Password strength</span>
                    <span className={`text-xs font-semibold ${
                      strength.label === 'Weak' ? 'text-red-500' :
                      strength.label === 'Fair' ? 'text-orange-500' :
                      strength.label === 'Good' ? 'text-yellow-600' :
                      strength.label === 'Strong' ? 'text-blue-500' : 'text-green-500'
                    }`}>{strength.label}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${strength.color} transition-all duration-300`}
                      style={{ width: strength.width }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-semibold text-[#2F3848] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8AABCD]" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Confirm new password"
                  className={`w-full pl-12 pr-12 py-4 rounded-xl border-2 ${
                    confirmPassword && !passwordsMatch 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-[#8AABCD]/30 bg-[#F5F3E7]/30'
                  } focus:border-[#465775] focus:outline-none transition`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8AABCD] hover:text-[#465775] transition"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="mt-2 text-sm text-red-500">Passwords do not match</p>
              )}
              {passwordsMatch && (
                <p className="mt-2 text-sm text-green-500 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Passwords match
                </p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-[#F5F3E7] rounded-xl p-4">
              <h3 className="text-sm font-semibold text-[#2F3848] mb-3">Password Requirements</h3>
              <div className="space-y-2">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {req.met ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-300" />
                    )}
                    <span className={`text-sm ${req.met ? 'text-green-600' : 'text-[#465775]/60'}`}>
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !allRequirementsMet || !passwordsMatch}
              className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                allRequirementsMet && passwordsMatch
                  ? 'bg-gradient-to-r from-[#465775] to-[#2F3848] text-white hover:from-[#3a4a66] hover:to-[#252d3a] shadow-lg'
                  : 'bg-[#8AABCD]/30 text-[#465775]/50 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Resetting...</span>
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

        <div className="text-center mt-8">
          <Link to="/login" className="text-[#465775] hover:text-[#E5654E] font-medium transition-colors">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
