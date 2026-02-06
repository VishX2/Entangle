export default function EntangleLogin() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-purple-50 rounded-lg shadow-lg p-12 w-full max-w-2xl">
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4">
            <svg width="80" height="80" viewBox="0 0 80 80" className="text-gray-800">
              <polygon points="40,10 65,25 65,55 40,70 15,55 15,25" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <polygon points="40,20 55,30 55,50 40,60 25,50 25,30" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="40" y1="10" x2="40" y2="70" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="15" y1="25" x2="65" y2="55" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="65" y1="25" x2="15" y2="55" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="25" y1="30" x2="55" y2="50" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="55" y1="30" x2="25" y2="50" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="40" cy="10" r="2" fill="currentColor"/>
              <circle cx="65" cy="25" r="2" fill="currentColor"/>
              <circle cx="65" cy="55" r="2" fill="currentColor"/>
              <circle cx="40" cy="70" r="2" fill="currentColor"/>
              <circle cx="15" cy="55" r="2" fill="currentColor"/>
              <circle cx="15" cy="25" r="2" fill="currentColor"/>
              <circle cx="40" cy="40" r="2" fill="currentColor"/>
            </svg>
          </div>
          <h2 className="text-gray-600 text-lg mb-2">Entangle</h2>
          <h1 className="text-gray-700 text-2xl font-semibold">Sign in to your account</h1>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-black font-semibold mb-2 text-lg">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-black font-semibold mb-2 text-lg">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 border-2 border-gray-400 rounded"
              />
              <span className="text-black font-medium">Remember me</span>
            </label>
            <a href="#" className="text-purple-500 font-medium hover:text-purple-600">
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button className="w-full bg-slate-700 hover:bg-slate-800 text-white font-semibold py-3 rounded-lg transition-colors">
            Sign in
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 border-t border-gray-400"></div>
            <span className="text-gray-600 font-semibold">OR</span>
            <div className="flex-1 border-t border-gray-400"></div>
          </div>

          {/* Create New Account */}
          <button className="w-full text-black font-semibold text-lg hover:text-gray-700">
            Create New Account
          </button>

          {/* Admin Login */}
          <div className="text-center pt-2">
            <a href="#" className="text-purple-500 font-medium hover:text-purple-600">
              Admin Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}