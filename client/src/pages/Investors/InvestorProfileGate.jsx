import { useState } from "react";
import InvestorProfile from "./InvestorProfile";

function InvestorAgreement({ onAccept, onCancel }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F1E3] px-6">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-lg p-8 space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-[#2B3443]">
            Startup Data Access Agreement
          </h1>
          <p className="text-sm text-[#3F5D7D] mt-2">
            Please review and accept this agreement before accessing this startup’s profile.
          </p>
        </div>

        {/* Agreement Text */}
        <div className="bg-gray-100 rounded-xl p-4 h-56 overflow-y-auto text-sm text-[#2B3443] space-y-4">
          <p>
            <strong>1. Confidentiality</strong><br />
            All startup information, including business models, product ideas,
            financials, and strategies, is confidential.
          </p>

          <p>
            <strong>2. Data Protection</strong><br />
            You agree not to copy, download, store, or distribute any data
            outside the Entangle platform.
          </p>

          <p>
            <strong>3. Responsible Use</strong><br />
            Information must only be used for investment evaluation.
            Any misuse or idea theft is strictly prohibited.
          </p>

          <p>
            <strong>4. Platform Disclaimer</strong><br />
            Entangle acts only as a connection platform and is not responsible
            for any agreements or disputes between parties.
          </p>

          <p>
            <strong>5. Legal Responsibility</strong><br />
            Any violation may result in account suspension or legal action.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onAccept}
            className="flex-1 bg-[#EF6C4E] text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Accept & View Startup
          </button>

          <button
            onClick={onCancel}
            className="flex-1 border border-gray-300 py-3 rounded-xl font-medium text-[#2B3443] hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InvestorProfileGate() {
  const [accepted, setAccepted] = useState(
    localStorage.getItem("investorAgreement") === "true"
  );

  const handleAccept = () => {
    localStorage.setItem("investorAgreement", "true");
    setAccepted(true);
  };

  if (!accepted) {
    return (
      <InvestorAgreement
        onAccept={handleAccept}
        onCancel={() => window.history.back()}
      />
    );
  }

  return <InvestorProfile />;
}
