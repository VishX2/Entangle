export default function InvestmentHistory() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100">

      {/* HEADER */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
          <HistoryIcon />
        </div>
        <h3 className="text-sm font-semibold text-slate-900">
          Investment History
        </h3>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">
        <StatBox
          icon={<BagIcon />}
          value="47"
          label="Total Investments"
        />
        <StatBox
          icon={<TrendIcon />}
          value="23"
          label="Active Investments"
        />
        <StatBox
          icon={<ExitIcon />}
          value="18"
          label="Exited"
        />
        <StatBox
          icon={<DollarIcon />}
          value="$125K"
          label="Avg. Investment"
        />
      </div>

      {/* SUCCESS STORIES */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrophyIcon />
          <span className="text-sm font-medium text-slate-800">
            Success Stories
          </span>
        </div>

        <SuccessRow
          title="TechFlow AI"
          subtitle="Led seed round, company now valued at $50M"
          growth="+340%"
        />

        <SuccessRow
          title="GreenGrid Energy"
          subtitle="Series A Startup, successful exit in 2023"
          growth="+280%"
        />
      </div>
    </div>
  );
}

/* STAT BOX (MATCHED) */

function StatBox({ icon, value, label }) {
  return (
    <div className="bg-slate-50 rounded-xl px-4 py-5 text-center">
      <div className="w-9 h-9 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center">
        {icon}
      </div>
      <div className="text-lg font-semibold text-slate-900 leading-none">
        {value}
      </div>
      <div className="text-xs text-slate-400 mt-1">
        {label}
      </div>
    </div>
  );
}

/* SUCCESS ROW (MATCHED) */

function SuccessRow({ title, subtitle, growth }) {
  return (
    <div className="bg-orange-50 rounded-xl px-4 py-4 flex items-center justify-between mb-3 last:mb-0">
      <div>
        <p className="text-sm font-medium text-slate-800">
          {title}
        </p>
        <p className="text-xs text-slate-500 mt-1">
          {subtitle}
        </p>
      </div>

      <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
        {growth}
      </span>
    </div>
  );
}

/* ICONS */

function HistoryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 4v16h16"
        stroke="#fb923c"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 14l3-3 3 2 4-5"
        stroke="#fb923c"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="7"
        width="18"
        height="14"
        rx="2"
        stroke="#64748b"
        strokeWidth="2"
      />
      <path
        d="M8 7V5a4 4 0 0 1 8 0v2"
        stroke="#64748b"
        strokeWidth="2"
      />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 17l6-6 4 4 7-8"
        stroke="#38bdf8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 7h4v4"
        stroke="#38bdf8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ExitIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2"
        stroke="#fb7185"
        strokeWidth="2"
      />
      <path
        d="M10 17l5-5-5-5"
        stroke="#fb7185"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 1v22"
        stroke="#64748b"
        strokeWidth="2"
      />
      <path
        d="M17 5.5a4 4 0 0 0-4-3.5H9a4 4 0 0 0 0 8h6a4 4 0 0 1 0 8H9a4 4 0 0 1-4-4"
        stroke="#64748b"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 21h8M12 17v4"
        stroke="#fb923c"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5 4h14v4a7 7 0 0 1-14 0V4z"
        stroke="#fb923c"
        strokeWidth="2"
      />
      <path
        d="M5 6H3a3 3 0 0 0 3 3M19 6h2a3 3 0 0 1-3 3"
        stroke="#fb923c"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
