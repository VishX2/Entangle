import React, { useState } from 'react';
import { Check } from 'lucide-react';

export default function InvestorRegistration() {
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
    experience: ''
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Registration submitted successfully! Our team will verify your credentials.');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400">
      {/* Header */}
      <header className="bg-purple-400 bg-opacity-80 backdrop-blur-sm">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white rounded transform rotate-45"></div>
              </div>
              <span className="text-white text-xl font-semibold">Entangle</span>
            </div>
            <div className="flex items-center gap-8">
              <a href="#" className="text-white hover:text-purple-100 transition">How it works</a>
              <a href="#" className="text-white hover:text-purple-100 transition">Features</a>
              <a href="#" className="text-white hover:text-purple-100 transition">For Investors</a>
              <a href="#" className="text-white hover:text-purple-100 transition">For Startups</a>
              <a href="#" className="text-white hover:text-purple-100 transition">Login</a>
              <button className="bg-slate-700 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition">
                Sign up
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white bg-opacity-60 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <Check className="w-5 h-5 text-purple-700" />
            <span className="text-slate-700 font-medium">Verified & Trusted Platform</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-slate-800">Discover</span>{' '}
            <span className="text-purple-600">Promising</span>{' '}
            <span className="text-purple-400">Startups</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Join our network of verified investors and connect with high-potential startups through AI-powered matching
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Investor Registration</h2>
          <p className="text-slate-600 mb-8">Complete your profile to access our curated startup portfolio</p>
          
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    placeholder="investor@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Investor Type *
                  </label>
                  <select
                    name="investorType"
                    value={formData.investorType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select type</option>
                    <option value="angel">Angel Investor</option>
                    <option value="vc">Venture Capital</option>
                    <option value="corporate">Corporate Investor</option>
                    <option value="family">Family Office</option>
                    <option value="individual">Individual Investor</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 pt-4">Professional Details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Company/Firm Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    placeholder="Investment Firm LLC"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Investment Range *
                  </label>
                  <select
                    name="investmentRange"
                    value={formData.investmentRange}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select range</option>
                    <option value="25k">$25K - $100K</option>
                    <option value="100k">$100K - $250K</option>
                    <option value="250k">$250K - $500K</option>
                    <option value="500k">$500K - $1M</option>
                    <option value="1m">$1M - $5M</option>
                    <option value="5m">$5M+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Industry Preferences *
                  </label>
                  <select
                    name="industries"
                    value={formData.industries}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select industries</option>
                    <option value="tech">Technology</option>
                    <option value="fintech">FinTech</option>
                    <option value="healthtech">HealthTech</option>
                    <option value="saas">SaaS</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="ai">AI/ML</option>
                    <option value="multiple">Multiple Industries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Preferred Startup Stage *
                  </label>
                  <select
                    name="preferredStage"
                    value={formData.preferredStage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select stage</option>
                    <option value="pre-seed">Pre-Seed</option>
                    <option value="seed">Seed</option>
                    <option value="early">Early Stage</option>
                    <option value="growth">Growth Stage</option>
                    <option value="all">All Stages</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="linkedIn"
                    value={formData.linkedIn}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Portfolio Website
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
            </div>

            {/* Investment Focus */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 pt-4">Investment Focus</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Investment Criteria & Focus Areas *
                </label>
                <textarea
                  name="investmentFocus"
                  value={formData.investmentFocus}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
                  placeholder="Describe your investment criteria, focus areas, and what you look for in startups..."
                ></textarea>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Investment Experience *
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
                placeholder="Share your investment experience, notable investments, or background in venture investing..."
              ></textarea>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 pt-4">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="terms" className="text-sm text-slate-600">
                I agree to the Terms & Conditions and Privacy Policy. I understand that my credentials will be verified through government ID and that I will gain access to the platform upon approval.
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-slate-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-slate-800 transition transform hover:scale-105 shadow-lg"
              >
                Submit Registration →
              </button>
              <button
                onClick={() => console.log('Draft saved')}
                className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 transition"
              >
                Save Draft
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="flex items-center gap-3 bg-white bg-opacity-60 backdrop-blur-sm p-4 rounded-xl">
            <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
            <span className="text-slate-700 font-medium">Government ID Verified</span>
          </div>
          <div className="flex items-center gap-3 bg-white bg-opacity-60 backdrop-blur-sm p-4 rounded-xl">
            <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
            <span className="text-slate-700 font-medium">Smart Matching</span>
          </div>
          <div className="flex items-center gap-3 bg-white bg-opacity-60 backdrop-blur-sm p-4 rounded-xl">
            <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
            <span className="text-slate-700 font-medium">Secure Messaging</span>
          </div>
        </div>
      </main>
    </div>
  );
}