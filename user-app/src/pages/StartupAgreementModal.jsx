import { useState } from "react";
import { FileText, Lock, Shield, Eye } from "lucide-react";

export default function StartupAccessAgreement() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-[#D6D3C2] flex items-center justify-center p-4">
      {/* Main Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <FileText className="text-[#2E3A4B]" size={20} />
          </div>
          <span className="text-sm tracking-widest text-[#87A6B9] font-semibold">
            ENTANGLE PLATFORM
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold text-[#2E3A4B] mb-3">
          Startup Data Access Agreement
        </h1>

        {/* Subtitle */}
        <p className="text-[#6B7280] mb-6 leading-relaxed">
          Please review and accept this agreement before accessing startup
          information. Your commitment to these terms ensures a trusted
          ecosystem for all parties.
        </p>

        <hr className="mb-6" />

        {/* Agreement Scroll Box */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 h-64 overflow-y-auto space-y-5">
          
          {/* Section 1 */}
          <div className="flex gap-3">
            <Lock className="text-[#87A6B9]" size={20} />
            <div>
              <h3 className="font-semibold text-[#2E3A4B]">
                1. Confidentiality
              </h3>
              <p className="text-sm text-gray-600">
                By accessing this startup’s profile, you agree that all
                information, including business models, financial data,
                product details, and strategies, is confidential and may not
                be copied, shared, or misused.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex gap-3">
            <Shield className="text-[#87A6B9]" size={20} />
            <div>
              <h3 className="font-semibold text-[#2E3A4B]">
                2. Data Protection
              </h3>
              <p className="text-sm text-gray-600">
                You agree not to download, distribute, or store startup data
                outside the Entangle platform without explicit permission
                from the startup.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="flex gap-3">
            <Eye className="text-[#87A6B9]" size={20} />
            <div>
              <h3 className="font-semibold text-[#2E3A4B]">
                3. Responsible Use
              </h3>
              <p className="text-sm text-gray-600">
                All information must be used solely for investment evaluation
                purposes. Any misuse, idea theft, or unauthorized disclosure
                is strictly prohibited.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div>
            <h3 className="font-semibold text-[#2E3A4B] mb-1">
              4. Platform Disclaimer
            </h3>
            <p className="text-sm text-gray-600">
              Entangle provides a connection platform between startups and
              investors. Entangle is not responsible for the accuracy,
              legality, or outcomes of any information shared between parties.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h3 className="font-semibold text-[#2E3A4B] mb-1">
              5. Legal Responsibility
            </h3>
            <p className="text-sm text-gray-600">
              By proceeding, you acknowledge that you are personally
              responsible for how you use the information. Any violation may
              result in account suspension or legal action.
            </p>
          </div>
        </div>

        {/* Checkbox */}
        <label className="flex items-center gap-3 mt-6 cursor-pointer">
          <input
            type="checkbox"
            className="w-5 h-5 accent-[#E76A4A]"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
          />
          <span className="text-[#2E3A4B]">
            I have read and agree to the Startup Data Access Agreement.
          </span>
        </label>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            disabled={!agreed}
            className={`flex-1 py-3 rounded-xl font-semibold transition 
              ${
                agreed
                  ? "bg-[#E76A4A] text-white hover:bg-[#d95c3f]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            Accept & View Startup
          </button>

          <button className="flex-1 py-3 rounded-xl border border-[#2E3A4B] text-[#2E3A4B] font-semibold hover:bg-gray-100 transition">
            Cancel
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Protected by Entangle's Investor Trust Framework · v2.1
        </p>
      </div>
    </div>
  );
}
