export default function TopRatedCard({ startups }) {
  return (
    <div className="bg-[#ece9e2] rounded-2xl p-6 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#f3e3dc] flex items-center justify-center">
            <MedalIcon />
          </div>
          <h3 className="font-semibold text-slate-800">Top Rated</h3>
        </div>

        <button className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1">
          View all
          <ArrowIcon />
        </button>
      </div>

      {/* List */}
      <div className="space-y-5">
        {startups.map((startup) => (
          <TopRatedItem key={startup.name} startup={startup} />
        ))}
      </div>
    </div>
  );
}

/* =====================================================
   ITEM
   ===================================================== */

function TopRatedItem({ startup }) {
  return (
    <div className="flex items-center justify-between">
      
      {/* Left: Logo + Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#dcdad4] flex items-center justify-center text-sm font-semibold text-slate-600">
          {startup.initials}
        </div>

        <div>
          <p className="font-semibold text-slate-800">
            {startup.name}
          </p>
          <p className="text-xs text-slate-500">
            {startup.industry} · {startup.stage}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="text-sm font-semibold text-[#ff6b4a] flex items-center gap-1">
        {startup.rating}
        <StarIcon />
      </div>
    </div>
  );
}

/* =====================================================
   ICONS
   ===================================================== */

function MedalIcon() {
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
      <circle cx="12" cy="8" r="4" />
      <path d="M8 14l-2 8 6-3 6 3-2-8" />
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

function StarIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="#ff6b4a"
    >
      <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.402 8.173L12 18.896l-7.336 3.875 1.402-8.173L.132 9.211l8.2-1.193z" />
    </svg>
  );
}
