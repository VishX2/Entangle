import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Lightbulb, User, Building2, Upload, Eye, EyeOff } from 'lucide-react';
import AuthSidebar from '../../components/AuthSidebar';

export default function EntrepreneurRegistration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', password: '', confirmPassword: '',
    companyName: '', industry: '', businessStage: '', fundingNeeded: '',
    idDocument: null, businessPlan: null, agreeToTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = (e, fieldName) => {
    setFormData(prev => ({ ...prev, [fieldName]: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/verify');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <AuthSidebar />

      {/* Main Content */}
      <div className="flex-1 bg-[#F5F3E7] relative overflow-auto">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-[#8AABCD]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#465775]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6 border border-[#8AABCD]/30">
            <CheckCircle className="w-5 h-5 text-[#465775]" />
            <span className="text-[#465775] font-semibold text-sm">Verified & Trusted Platform</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#2F3848]">Join as an </span>
            <span className="text-[#E5654E]">Entrepreneur</span>
          </h1>
          
          <p className="text-lg text-[#465775]/80 max-w-2xl mx-auto">
            Get verified and connect with trusted investors through our AI-powered matching platform
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-between max-w-xl mx-auto">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                    currentStep >= step 
                      ? 'bg-gradient-to-r from-[#465775] to-[#2F3848] text-white shadow-lg' 
                      : 'bg-[#8AABCD]/20 text-[#465775]'
                  }`}>
                    {step}
                  </div>
                  <span className={`mt-2 text-xs font-medium ${currentStep >= step ? 'text-[#465775]' : 'text-[#465775]/50'}`}>
                    {step === 1 ? 'Personal' : step === 2 ? 'Business' : 'Verify'}
                  </span>
                </div>
                {step < 3 && (
                  <div className={`h-1 flex-1 mx-2 rounded ${currentStep > step ? 'bg-[#465775]' : 'bg-[#8AABCD]/20'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-[#8AABCD]/20">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#465775]/10 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-[#465775]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#2F3848]">Personal Information</h2>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[#2F3848] mb-2">Full Name *</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30"
                    placeholder="John Doe" required />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#2F3848] mb-2">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30"
                      placeholder="john@example.com" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#2F3848] mb-2">Phone *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30"
                      placeholder="+1 (555) 000-0000" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#2F3848] mb-2">Password *</label>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleInputChange}
                        className="w-full px-4 py-3 pr-12 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30"
                        placeholder="••••••••" required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8AABCD] hover:text-[#465775]">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#2F3848] mb-2">Confirm Password *</label>
                    <div className="relative">
                      <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange}
                        className="w-full px-4 py-3 pr-12 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30"
                        placeholder="••••••••" required />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8AABCD] hover:text-[#465775]">
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Business Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#465775]/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-[#465775]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#2F3848]">Business Details</h2>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[#2F3848] mb-2">Company Name *</label>
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30"
                    placeholder="Your Startup Inc." required />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#2F3848] mb-2">Industry *</label>
                    <select name="industry" value={formData.industry} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30" required>
                      <option value="">Select Industry</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="fintech">FinTech</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="education">Education</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#2F3848] mb-2">Business Stage *</label>
                    <select name="businessStage" value={formData.businessStage} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30" required>
                      <option value="">Select Stage</option>
                      <option value="idea">Idea Stage</option>
                      <option value="mvp">MVP/Prototype</option>
                      <option value="early">Early Revenue</option>
                      <option value="growth">Growth Stage</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2F3848] mb-2">Funding Needed *</label>
                  <select name="fundingNeeded" value={formData.fundingNeeded} onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-[#8AABCD]/30 rounded-xl focus:border-[#465775] focus:outline-none transition bg-[#F5F3E7]/30" required>
                    <option value="">Select Range</option>
                    <option value="50k-100k">$50K - $100K</option>
                    <option value="100k-500k">$100K - $500K</option>
                    <option value="500k-1m">$500K - $1M</option>
                    <option value="1m+">$1M+</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Verification */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#465775]/10 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-[#465775]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#2F3848]">Verification Documents</h2>
                </div>

                <div className="bg-[#8AABCD]/10 border-2 border-[#8AABCD]/30 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-[#465775] mt-0.5" />
                    <p className="text-sm text-[#465775]">
                      We verify all entrepreneurs to maintain trust and security on our platform.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2F3848] mb-2">Government ID *</label>
                  <div className="border-2 border-dashed border-[#8AABCD]/50 rounded-xl p-6 text-center hover:border-[#465775] transition cursor-pointer bg-[#F5F3E7]/30">
                    <input type="file" id="idDocument" onChange={(e) => handleFileChange(e, 'idDocument')} className="hidden" accept=".pdf,.jpg,.png" />
                    <label htmlFor="idDocument" className="cursor-pointer">
                      <Upload className="w-10 h-10 text-[#8AABCD] mx-auto mb-2" />
                      <p className="text-[#2F3848] font-medium">{formData.idDocument?.name || 'Upload your ID'}</p>
                      <p className="text-sm text-[#465775]/60">PDF, JPG, PNG</p>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2F3848] mb-2">Pitch Deck (Optional)</label>
                  <div className="border-2 border-dashed border-[#8AABCD]/50 rounded-xl p-6 text-center hover:border-[#465775] transition cursor-pointer bg-[#F5F3E7]/30">
                    <input type="file" id="businessPlan" onChange={(e) => handleFileChange(e, 'businessPlan')} className="hidden" accept=".pdf,.ppt,.pptx" />
                    <label htmlFor="businessPlan" className="cursor-pointer">
                      <Upload className="w-10 h-10 text-[#8AABCD] mx-auto mb-2" />
                      <p className="text-[#2F3848] font-medium">{formData.businessPlan?.name || 'Upload pitch deck'}</p>
                      <p className="text-sm text-[#465775]/60">PDF, PPT</p>
                    </label>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-4">
                  <input type="checkbox" id="terms" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleInputChange}
                    className="mt-1 w-5 h-5 text-[#465775] border-[#8AABCD] rounded" required />
                  <label htmlFor="terms" className="text-sm text-[#465775]">
                    I agree to the <Link to="#" className="text-[#E5654E] font-semibold hover:underline">Terms of Service</Link> and <Link to="#" className="text-[#E5654E] font-semibold hover:underline">Privacy Policy</Link>.
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10 pt-6 border-t border-[#8AABCD]/20">
              {currentStep > 1 ? (
                <button type="button" onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-6 py-3 border-2 border-[#8AABCD]/50 text-[#465775] rounded-xl font-semibold hover:bg-[#F5F3E7] transition">
                  Previous
                </button>
              ) : <div></div>}

              {currentStep < 3 ? (
                <button type="button" onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6 py-3 bg-gradient-to-r from-[#465775] to-[#2F3848] text-white rounded-xl font-semibold hover:from-[#3a4a66] hover:to-[#252d3a] transition-all shadow-lg flex items-center gap-2">
                  Next Step
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-[#465775] to-[#2F3848] text-white rounded-xl font-semibold hover:from-[#3a4a66] hover:to-[#252d3a] transition-all shadow-lg">
                  Complete Registration
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-10">
          {['Government ID Verified', 'AI Smart Matching', 'Secure Messaging'].map((text, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-[#8AABCD]/20">
              <div className="w-10 h-10 bg-[#465775]/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-[#465775]" />
              </div>
              <span className="text-[#2F3848] font-medium text-sm">{text}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/select-type" className="text-[#465775] hover:text-[#E5654E] font-medium transition-colors">
            ← Back to account type selection
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}
