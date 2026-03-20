import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthSidebar } from '../components/organisms/layout';
import { loginUser } from '../store/authApi';
import { clearError } from '../store/authSlice';
import { selectAuthLoading, selectAuthError } from '../store/authSlice';

export default function EntangleLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    const result = await dispatch(loginUser({ email: formData.email, password: formData.password }));
    if (loginUser.fulfilled.match(result)) {
      const from = (location.state?.from?.pathname) || '/';
      navigate(from === '/' ? '/investor/dashboard' : from, { replace: true });
    }
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

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-700 text-sm">{error}</div>
        )}

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
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#465775] to-[#2F3848] hover:from-[#3a4a66] hover:to-[#252d3a] disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            {isLoading ? 'Signing in…' : 'Sign In'}
          </button>

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