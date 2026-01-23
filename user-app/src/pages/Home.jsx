import { ArrowRight, Check } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      
      {/* Top Navbar */}
      <header className="bg-[#A9A2C3]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 border-2 border-gray-800 rotate-45" />
            <span className="font-semibold text-gray-900">Entangle</span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-900">
            <a href="#" className="hover:opacity-80">How it works</a>
            <a href="#" className="hover:opacity-80">Features</a>
            <a href="#" className="hover:opacity-80">For Investors</a>
            <a href="#" className="hover:opacity-80">For Startups</a>
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-sm font-medium text-gray-900 hover:opacity-80">
              Login
            </button>
            <button className="bg-[#1F3B5B] text-white text-sm font-medium px-4 py-2 rounded-md hover:opacity-90">
              Sign up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#EDEAF7] text-[#5E548E] px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span>✔</span>
            Verified & Trusted Platform
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            Connect, <span className="text-[#8B7CA8]">Verify</span>, Invest
          </h1>

          {/* Subheading */}
          <p className="mt-4 text-gray-500 text-lg">
            Smart matching platform connecting verified investors with
            promising startups through AI-powered compatibility scoring
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button className="flex items-center gap-2 bg-[#1F3B5B] text-white px-6 py-3 rounded-md font-medium hover:opacity-90">
              Get Started
              <ArrowRight size={18} />
            </button>

            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50">
              Learn More
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Check size={16} className="text-green-500" />
              Government ID Verified
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-green-500" />
              Smart Matching
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-green-500" />
              Secure Messaging
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Home;
