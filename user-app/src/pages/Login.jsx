import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import AuthSidebar from '../components/AuthSidebar';

export default function EntangleLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <AuthSidebar />

      {/* Main Content */}
      <div className="flex-1 bg-[#F5F3E7] flex items-center justify-center p-4 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#8AABCD]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#465775]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md border border-[#8AABCD]/20">
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4 w-16 h-16 bg-gradient-to-br from-[#465775] to-[#2F3848] rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h2 className="text-[#465775] text-lg font-medium mb-1">Entangle</h2>
          <h1 className="text-[#2F3848] text-2xl font-bold">Welcome Back</h1>
          <p className="text-[#465775]/70 text-sm mt-1">Sign in to continue to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-[#2F3848] font-semibold mb-2 text-sm">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#8AABCD]" />
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#F5F3E7]/50 border-2 border-[#8AABCD]/30 text-[#2F3848] placeholder-[#465775]/50 focus:outline-none focus:border-[#465775] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[#2F3848] font-semibold mb-2 text-sm">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[#8AABCD]" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Enter your password"
                className="w-full pl-12 pr-12 py-3 rounded-xl bg-[#F5F3E7]/50 border-2 border-[#8AABCD]/30 text-[#2F3848] placeholder-[#465775]/50 focus:outline-none focus:border-[#465775] focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8AABCD] hover:text-[#465775] transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                className="w-4 h-4 border-2 border-[#8AABCD] rounded text-[#465775] focus:ring-[#465775]"
              />
              <span className="text-[#2F3848] text-sm font-medium">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-[#E5654E] text-sm font-semibold hover:text-[#d55440] transition-colors">
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-[#465775] to-[#2F3848] hover:from-[#3a4a66] hover:to-[#252d3a] text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 border-t-2 border-[#8AABCD]/30"></div>
            <span className="text-[#465775] font-medium text-sm">OR</span>
            <div className="flex-1 border-t-2 border-[#8AABCD]/30"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex gap-3">
            <button type="button" className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-[#8AABCD]/30 rounded-xl hover:bg-[#F5F3E7] transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-[#2F3848] font-medium text-sm">Google</span>
            </button>
            <button type="button" className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-[#8AABCD]/30 rounded-xl hover:bg-[#F5F3E7] transition-colors">
              <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="text-[#2F3848] font-medium text-sm">LinkedIn</span>
            </button>
          </div>

          {/* Create New Account */}
          <div className="text-center pt-4">
            <span className="text-[#465775]/70 text-sm">Don't have an account? </span>
            <Link to="/select-type" className="text-[#E5654E] font-semibold text-sm hover:text-[#d55440] transition-colors">
              Create Account
            </Link>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}