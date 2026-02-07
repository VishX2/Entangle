import { Link } from 'react-router-dom';

export default function AuthHeader() {
  return (
    <nav className="bg-gradient-to-r from-[#465775] to-[#2F3848]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-white">Entangle</span>
          </Link>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-white/80 hover:text-white transition-colors font-medium text-sm hidden md:block">How it works</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors font-medium text-sm hidden md:block">Features</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors font-medium text-sm hidden md:block">For Investors</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors font-medium text-sm hidden md:block">For Startups</a>
            <Link to="/login" className="text-white/80 hover:text-white transition-colors font-medium text-sm">Login</Link>
            <Link to="/select-type" className="bg-[#E5654E] hover:bg-[#d55440] text-white px-5 py-2 rounded-lg font-medium transition-colors text-sm">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
