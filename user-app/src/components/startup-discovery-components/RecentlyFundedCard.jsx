export default function RecentlyFundedCard({ startups }) {
  return (
    <div className="bg-[#ece9e2] rounded-2xl p-6 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#f3e3dc] flex items-center justify-center">
            <FundingIcon />
          </div>
          <h3 className="font-semibold text-slate-800">
            Recently Funded
          </h3>
        </div>

        <button className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1">
          View all
          <ArrowIcon />
        </button>
      </div>

      {/* List */}
      <div className="space-y-5">
        {startups.map((startup) => (
          <FundedItem key={startup.name} startup={startup} />
        ))}
      </div>
    </div>
  );
}

/* =====================================================
   ITEM
   ===================================================== */

function FundedItem({ startup }) {
  return (
    <div className="flex items-center justify-between">
      
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#dcdad4] flex items-center justify-center text-sm font-semibold text-slate-600">
          {startup.initials}
        </div>

        <div>
          <p className="font-semibold text-slate-800">
            {startup.name}
          </p>
          <p className="text-xs text-slate-500">
            {startup.stage}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="text-right">
        <p className="text-[#ff6b4a] font-semibold text-sm">
          {startup.amount}
        </p>
        <p className="text-xs text-slate-500">
          {startup.time}
        </p>
      </div>
    </div>
  );
}

/* =====================================================
   ICONS
   ===================================================== */

function FundingIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ff6b4a"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#64748b"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}
