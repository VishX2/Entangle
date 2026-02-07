import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, TrendingUp, Briefcase, ArrowRight, Shield, Zap, Users } from 'lucide-react';
import AuthHeader from '../components/AuthHeader';

export default function UserTypeSelection() {
  const [selectedType, setSelectedType] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedType === 'investor') {
      navigate('/register/investor');
    } else if (selectedType === 'entrepreneur') {
      navigate('/register/entrepreneur');
    } else if (selectedType === 'startup') {
      navigate('/register/startup');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F3E7]">
      <AuthHeader />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#8AABCD]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#465775]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6 border border-[#8AABCD]/30">
            <CheckCircle className="w-5 h-5 text-[#465775]" />
            <span className="text-[#465775] font-semibold text-sm">Verified & Trusted Platform</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-[#2F3848]">Connect, </span>
            <span className="text-[#E5654E]">Verify, </span>
            <span className="text-[#465775]">Invest</span>
          </h1>
          
          <p className="text-lg text-[#465775]/80 max-w-2xl mx-auto">
            Smart matching platform connecting verified investors with promising startups through AI-powered compatibility scoring
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-center text-[#2F3848] mb-10">Choose Your Account Type</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Investor Card */}
            <div
              onClick={() => setSelectedType('investor')}
              className={`relative bg-white rounded-2xl p-8 cursor-pointer transition-all duration-300 border-2 ${
                selectedType === 'investor'
                  ? 'border-[#E5654E] shadow-xl scale-[1.02]'
                  : 'border-[#8AABCD]/30 hover:border-[#8AABCD] hover:shadow-lg'
              }`}
            >
              {selectedType === 'investor' && (
                <div className="absolute top-4 right-4">
                  <div className="bg-[#E5654E] rounded-full p-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}

              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all ${
                selectedType === 'investor'
                  ? 'bg-gradient-to-br from-[#E5654E] to-[#d55440]'
                  : 'bg-[#465775]/10'
              }`}>
                <TrendingUp className={`w-7 h-7 ${selectedType === 'investor' ? 'text-white' : 'text-[#465775]'}`} />
              </div>

              <h3 className="text-xl font-bold text-[#2F3848] mb-3">Investor</h3>
              <p className="text-[#465775]/70 mb-6 text-sm leading-relaxed">
                Discover and invest in verified startups that match your investment criteria
              </p>

              <div className="space-y-3">
                {['Access verified startups', 'AI recommendations', 'Portfolio analytics'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#465775]" />
                    <span className="text-sm text-[#2F3848]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#8AABCD]/20">
                <div className="flex items-center gap-2 text-xs text-[#465775]">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">Angel Investors & VCs</span>
                </div>
              </div>
            </div>

            {/* Entrepreneur Card */}
            <div
              onClick={() => setSelectedType('entrepreneur')}
              className={`relative bg-white rounded-2xl p-8 cursor-pointer transition-all duration-300 border-2 ${
                selectedType === 'entrepreneur'
                  ? 'border-[#E5654E] shadow-xl scale-[1.02]'
                  : 'border-[#8AABCD]/30 hover:border-[#8AABCD] hover:shadow-lg'
              }`}
            >
              {selectedType === 'entrepreneur' && (
                <div className="absolute top-4 right-4">
                  <div className="bg-[#E5654E] rounded-full p-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}

              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all ${
                selectedType === 'entrepreneur'
                  ? 'bg-gradient-to-br from-[#E5654E] to-[#d55440]'
                  : 'bg-[#465775]/10'
              }`}>
                <Briefcase className={`w-7 h-7 ${selectedType === 'entrepreneur' ? 'text-white' : 'text-[#465775]'}`} />
              </div>

              <h3 className="text-xl font-bold text-[#2F3848] mb-3">Entrepreneur</h3>
              <p className="text-[#465775]/70 mb-6 text-sm leading-relaxed">
                Get verified and connect with investors who align with your vision
              </p>

              <div className="space-y-3">
                {['Match with investors', 'Showcase your startup', 'Track investor interest'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#465775]" />
                    <span className="text-sm text-[#2F3848]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#8AABCD]/20">
                <div className="flex items-center gap-2 text-xs text-[#465775]">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">Founders & CEOs</span>
                </div>
              </div>
            </div>

            {/* Startup Card */}
            <div
              onClick={() => setSelectedType('startup')}
              className={`relative bg-white rounded-2xl p-8 cursor-pointer transition-all duration-300 border-2 ${
                selectedType === 'startup'
                  ? 'border-[#E5654E] shadow-xl scale-[1.02]'
                  : 'border-[#8AABCD]/30 hover:border-[#8AABCD] hover:shadow-lg'
              }`}
            >
              {selectedType === 'startup' && (
                <div className="absolute top-4 right-4">
                  <div className="bg-[#E5654E] rounded-full p-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}

              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all ${
                selectedType === 'startup'
                  ? 'bg-gradient-to-br from-[#E5654E] to-[#d55440]'
                  : 'bg-[#465775]/10'
              }`}>
                <Zap className={`w-7 h-7 ${selectedType === 'startup' ? 'text-white' : 'text-[#465775]'}`} />
              </div>

              <h3 className="text-xl font-bold text-[#2F3848] mb-3">Startup</h3>
              <p className="text-[#465775]/70 mb-6 text-sm leading-relaxed">
                Register your company and connect with the right investors for growth
              </p>

              <div className="space-y-3">
                {['Company verification', 'Investor matching', 'Funding resources'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#465775]" />
                    <span className="text-sm text-[#2F3848]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#8AABCD]/20">
                <div className="flex items-center gap-2 text-xs text-[#465775]">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">Early-stage Companies</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!selectedType}
            className={`inline-flex items-center gap-3 px-10 py-4 rounded-xl font-semibold text-lg transition-all ${
              selectedType
                ? 'bg-gradient-to-r from-[#465775] to-[#2F3848] text-white hover:from-[#3a4a66] hover:to-[#252d3a] shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                : 'bg-[#8AABCD]/30 text-[#465775]/50 cursor-not-allowed'
            }`}
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          {!selectedType && (
            <p className="mt-4 text-sm text-[#465775]/60">Please select an account type to continue</p>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full bg-[#465775]/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#465775]" />
              </div>
            </div>
            <h3 className="font-bold text-[#2F3848] mb-1">Government ID Verified</h3>
            <p className="text-sm text-[#465775]/70">Secure identity verification</p>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full bg-[#465775]/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#465775]" />
              </div>
            </div>
            <h3 className="font-bold text-[#2F3848] mb-1">AI Smart Matching</h3>
            <p className="text-sm text-[#465775]/70">Compatibility scoring system</p>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full bg-[#465775]/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#465775]" />
              </div>
            </div>
            <h3 className="font-bold text-[#2F3848] mb-1">Secure Messaging</h3>
            <p className="text-sm text-[#465775]/70">Private communication</p>
          </div>
        </div>

        {/* Already have account */}
        <div className="text-center mt-10">
          <span className="text-[#465775]/70">Already have an account? </span>
          <Link to="/login" className="text-[#E5654E] font-semibold hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
