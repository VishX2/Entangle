import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, TrendingUp, User, Briefcase, DollarSign, Linkedin, Globe, FileText } from 'lucide-react';
import AuthHeader from '../../components/AuthHeader';

export default function InvestorRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    investorType: '',
    companyName: '',
    investmentRange: '',
    industries: '',
    preferredStage: '',
    investmentFocus: '',
    linkedIn: '',
    portfolio: '',
    experience: '',
    agreeToTerms: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/verify');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F3E7]">
      <AuthHeader />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#8AABCD]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#465775]/10 rounded-full blur-3xl"></div>
      </div>

      <main className="relative max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6 border border-[#8AABCD]/30">
            <CheckCircle className="w-5 h-5 text-[#465775]" />
            <span className="text-[#465775] font-semibold text-sm">Verified & Trusted Platform</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#2F3848]">Discover </span>
            <span className="text-[#E5654E]">Promising </span>
            <span className="text-[#465775]">Startups</span>
          </h1>
          
          <p className="text-lg text-[#465775]/80 max-w-2xl mx-auto">
            Join our network of verified investors and connect with high-potential startups
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-[#8AABCD]/20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-[#465775] to-[#2F3848] rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#2F3848]">Investor Registration</h2>
              <p className="text-[#465775]/70 text-sm">Complete your profile to access our startup portfolio</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-[#2F3848] mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#8AABCD]" />
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#2F3848] mb-2">Full Name *</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30"
                    placeholder="John Smith" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2F3848] mb-2">Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30"
                    placeholder="investor@example.com" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2F3848] mb-2">Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30"
                    placeholder="+1 (555) 000-0000" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2F3848] mb-2">Investor Type *</label>
                  <select name="investorType" value={formData.investorType} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30" required>
                    <option value="">Select type</option>
                    <option value="angel">Angel Investor</option>
                    <option value="vc">Venture Capital</option>
                    <option value="corporate">Corporate Investor</option>
                    <option value="family">Family Office</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#2F3848] mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#8AABCD]" />
                Professional Details
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#2F3848] mb-2">Company Name</label>
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30"
                    placeholder="Investment Firm LLC" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2F3848] mb-2">Investment Range *</label>
                  <select name="investmentRange" value={formData.investmentRange} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30" required>
                    <option value="">Select range</option>
                    <option value="25k">$25K - $100K</option>
                    <option value="100k">$100K - $500K</option>
                    <option value="500k">$500K - $1M</option>
                    <option value="1m">$1M+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2F3848] mb-2">Industry Preferences *</label>
                  <select name="industries" value={formData.industries} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30" required>
                    <option value="">Select industries</option>
                    <option value="tech">Technology</option>
                    <option value="fintech">FinTech</option>
                    <option value="healthtech">HealthTech</option>
                    <option value="ai">AI/ML</option>
                    <option value="multiple">Multiple</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2F3848] mb-2">Preferred Stage *</label>
                  <select name="preferredStage" value={formData.preferredStage} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30" required>
                    <option value="">Select stage</option>
                    <option value="seed">Seed</option>
                    <option value="early">Early Stage</option>
                    <option value="growth">Growth</option>
                    <option value="all">All Stages</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#2F3848] mb-2">LinkedIn Profile</label>
                  <div className="relative">
                    <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8AABCD]" />
                    <input type="url" name="linkedIn" value={formData.linkedIn} onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30"
                      placeholder="https://linkedin.com/in/yourprofile" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#2F3848] mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#8AABCD]" />
                Investment Focus
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#2F3848] mb-2">Investment Criteria *</label>
                  <textarea name="investmentFocus" value={formData.investmentFocus} onChange={handleChange} rows="3"
                    className="w-full px-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition resize-none bg-[#F5F3E7]/30"
                    placeholder="Describe your investment criteria and what you look for in startups..." required></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2F3848] mb-2">Investment Experience *</label>
                  <textarea name="experience" value={formData.experience} onChange={handleChange} rows="3"
                    className="w-full px-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition resize-none bg-[#F5F3E7]/30"
                    placeholder="Share your investment experience and background..." required></textarea>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-4 border-t border-[#8AABCD]/20">
              <input type="checkbox" id="terms" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange}
                className="mt-1 w-5 h-5 text-[#465775] border-[#8AABCD] rounded focus:ring-[#465775]" required />
              <label htmlFor="terms" className="text-sm text-[#465775]">
                I agree to the <Link to="#" className="text-[#E5654E] font-semibold hover:underline">Terms & Conditions</Link> and <Link to="#" className="text-[#E5654E] font-semibold hover:underline">Privacy Policy</Link>.
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button type="submit"
                className="flex-1 bg-gradient-to-r from-[#465775] to-[#2F3848] text-white px-8 py-4 rounded-xl font-semibold hover:from-[#3a4a66] hover:to-[#252d3a] transition-all shadow-lg flex items-center justify-center gap-2">
                Submit Registration
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button type="button" className="px-8 py-4 border-2 border-[#8AABCD]/50 text-[#465775] rounded-xl font-semibold hover:bg-[#F5F3E7] transition">
                Save Draft
              </button>
            </div>
          </form>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-10">
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-[#8AABCD]/20">
            <div className="w-10 h-10 bg-[#465775]/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-[#465775]" />
            </div>
            <span className="text-[#2F3848] font-medium text-sm">Government ID Verified</span>
          </div>
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-[#8AABCD]/20">
            <div className="w-10 h-10 bg-[#465775]/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-[#465775]" />
            </div>
            <span className="text-[#2F3848] font-medium text-sm">AI Smart Matching</span>
          </div>
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-[#8AABCD]/20">
            <div className="w-10 h-10 bg-[#465775]/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-[#465775]" />
            </div>
            <span className="text-[#2F3848] font-medium text-sm">Secure Messaging</span>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/select-type" className="text-[#465775] hover:text-[#E5654E] font-medium transition-colors">
            ← Back to account type selection
          </Link>
        </div>
      </main>
    </div>
  );
}
