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