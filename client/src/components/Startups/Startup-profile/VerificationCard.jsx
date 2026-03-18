export default function VerificationTrustCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <ShieldIcon />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">
            Verification & Trust
          </h3>
        </div>

        <div className="text-sm text-slate-500">
          Trust Score{" "}
          <span className="text-blue-600 font-semibold ml-1">92%</span>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-5">
        <div className="h-full w-[92%] bg-orange-500 rounded-full" />
      </div>

      {/* VERIFICATION ITEMS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VerifyItem icon={<IdIcon />} label="Identity Verified" />
        <VerifyItem icon={<MailIcon />} label="Email Verified" />
        <VerifyItem icon={<BadgeIcon />} label="Platform Trust Badge" />
        <VerifyItem icon={<DocIcon />} label="License Agreement" />
      </div>

      {/* FOOTER */}
      <div className="mt-5 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-blue-600">
          <CheckCircleIcon />
          Fully Verified Investor
        </div>

        <div className="text-slate-400 text-xs">
          4/4 complete
        </div>
      </div>
    </div>
  );
}

/* SUB COMPONENT */

function VerifyItem({ icon, label }) {
  return (
    <div className="flex items-center justify-between bg-blue-50 rounded-xl px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
          {icon}
        </div>
        <span className="text-sm text-slate-700">{label}</span>
      </div>

      <CheckIcon />
    </div>
  );
}

/* ICONS */

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"
        stroke="#2563eb"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#3b82f6" strokeWidth="2" />
      <path
        d="M8 12l3 3 5-6"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#2563eb" strokeWidth="2" />
      <path
        d="M8 12l3 3 5-6"
        stroke="#2563eb"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IdIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="#2563eb" strokeWidth="2" />
      <circle cx="9" cy="12" r="2" stroke="#2563eb" strokeWidth="2" />
      <path d="M14 10h4M14 14h4" stroke="#2563eb" strokeWidth="2" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="#2563eb" strokeWidth="2" />
      <path d="M3 7l9 6 9-6" stroke="#2563eb" strokeWidth="2" />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="5" stroke="#2563eb" strokeWidth="2" />
      <path d="M8 13v8l4-2 4 2v-8" stroke="#2563eb" strokeWidth="2" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
        stroke="#2563eb"
        strokeWidth="2"
      />
      <path d="M14 3v6h6" stroke="#2563eb" strokeWidth="2" />
    </svg>
  );
}
