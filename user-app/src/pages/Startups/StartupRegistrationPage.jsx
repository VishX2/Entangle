import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Building2, Users, Globe, DollarSign, FileText } from 'lucide-react';
import AuthHeader from '../../components/AuthHeader';

export default function StartupRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    founderName: '',
    phone: '',
    website: '',
    industry: '',
    stage: '',
    fundingNeeded: '',
    description: '',
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

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#8AABCD]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#465775]/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <main className="relative max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6 border border-[#8AABCD]/30">
            <CheckCircle className="w-5 h-5 text-[#465775]" />
            <span className="text-[#465775] font-semibold text-sm">Verified & Trusted Platform</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#2F3848]">Join Our </span>
            <span className="text-[#E5654E]">Startup </span>
            <span className="text-[#465775]">Network</span>
          </h1>
          
          <p className="text-lg text-[#465775]/80 max-w-2xl mx-auto">
            Register your startup to connect with verified investors through our AI-powered matching platform
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-[#8AABCD]/20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-[#465775] to-[#2F3848] rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#2F3848]">Startup Registration</h2>
              <p className="text-[#465775]/70 text-sm">Fill in your startup details to get started</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-semibold text-[#2F3848] mb-2">
                  Company Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-[#8AABCD]" />
                  </div>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30"
                    placeholder="Your startup name"
                    required
                  />
                </div>
              </div>

              {/* Business Email */}
              <div>
                <label className="block text-sm font-semibold text-[#2F3848] mb-2">
                  Business Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30"
                  placeholder="contact@startup.com"
                  required
                />
              </div>

              {/* Founder Name */}
              <div>
                <label className="block text-sm font-semibold text-[#2F3848] mb-2">
                  Founder Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-[#8AABCD]" />
                  </div>
                  <input
                    type="text"
                    name="founderName"
                    value={formData.founderName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-[#2F3848] mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30"
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-semibold text-[#2F3848] mb-2">
                  Website
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Globe className="h-5 w-5 text-[#8AABCD]" />
                  </div>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30"
                    placeholder="https://yourstartup.com"
                  />
                </div>
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-semibold text-[#2F3848] mb-2">
                  Industry *
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30 appearance-none"
                  required
                >
                  <option value="">Select industry</option>
                  <option value="fintech">FinTech</option>
                  <option value="healthtech">HealthTech</option>
                  <option value="edtech">EdTech</option>
                  <option value="saas">SaaS</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="ai">AI/ML</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Stage */}
              <div>
                <label className="block text-sm font-semibold text-[#2F3848] mb-2">
                  Stage *
                </label>
                <select
                  name="stage"
                  value={formData.stage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30 appearance-none"
                  required
                >
                  <option value="">Select stage</option>
                  <option value="idea">Idea</option>
                  <option value="mvp">MVP</option>
                  <option value="early">Early Stage</option>
                  <option value="growth">Growth</option>
                  <option value="expansion">Expansion</option>
                </select>
              </div>

              {/* Funding Needed */}
              <div>
                <label className="block text-sm font-semibold text-[#2F3848] mb-2">
                  Funding Needed *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-[#8AABCD]" />
                  </div>
                  <select
                    name="fundingNeeded"
                    value={formData.fundingNeeded}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30 appearance-none"
                    required
                  >
                    <option value="">Select amount</option>
                    <option value="50k">$0 - $50K</option>
                    <option value="100k">$50K - $100K</option>
                    <option value="500k">$100K - $500K</option>
                    <option value="1m">$500K - $1M</option>
                    <option value="5m">$1M - $5M</option>
                    <option value="more">$5M+</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Company Description */}
            <div>
              <label className="block text-sm font-semibold text-[#2F3848] mb-2">
                Company Description *
              </label>
              <div className="relative">
                <div className="absolute top-3 left-4 pointer-events-none">
                  <FileText className="h-5 w-5 text-[#8AABCD]" />
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full pl-12 pr-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition resize-none bg-[#F5F3E7]/30"
                  placeholder="Describe your startup, what problem you're solving, and your unique value proposition..."
                  required
                ></textarea>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1 w-5 h-5 text-[#465775] border-[#8AABCD] rounded focus:ring-[#465775]"
                required
              />
              <label htmlFor="terms" className="text-sm text-[#465775]">
                I agree to the <Link to="#" className="text-[#E5654E] font-semibold hover:underline">Terms & Conditions</Link> and <Link to="#" className="text-[#E5654E] font-semibold hover:underline">Privacy Policy</Link>. I understand that my information will be verified and shared with potential investors.
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#465775] to-[#2F3848] text-white px-8 py-4 rounded-xl font-semibold hover:from-[#3a4a66] hover:to-[#252d3a] transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
              >
                Submit Registration
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button
                type="button"
                className="px-8 py-4 border-2 border-[#8AABCD]/50 text-[#465775] rounded-xl font-semibold hover:bg-[#F5F3E7] transition"
              >
                Save Draft
              </button>
            </div>
          </form>
        </div>

        {/* Trust Indicators */}
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

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link to="/select-type" className="text-[#465775] hover:text-[#E5654E] font-medium transition-colors">
            ← Back to account type selection
          </Link>
        </div>
      </main>
    </div>
  );
}
