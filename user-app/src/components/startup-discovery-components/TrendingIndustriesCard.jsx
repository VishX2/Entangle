export default function TrendingIndustriesCard({ industries }) {
  return (
    <div className="bg-[#ece9e2] rounded-2xl p-6 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#f3e3dc] flex items-center justify-center">
          <TrendIcon />
        </div>
        <h3 className="font-semibold text-slate-800">
          Trending Industries
        </h3>
      </div>

      {/* List */}
      <div className="space-y-4">
        {industries.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between"
          >
            {/* Left side */}
            <div className="flex items-center gap-4">
              <span className="w-5 text-slate-500 font-semibold text-sm">
                {index + 1}
              </span>
              <span className="text-slate-700 font-medium">
                {item.name}
              </span>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <span className="text-[#ff6b4a] text-sm font-semibold">
                {item.growth}
              </span>
              <span className="bg-[#e0ddd6] text-slate-600 text-xs px-3 py-1 rounded-full font-medium">
                {item.count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =====================================================
   ICON
   ===================================================== */

function TrendIcon() {
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
      <path d="M3 17l6-6 4 4 7-7" />
      <path d="M14 4h7v7" />
    </svg>
  );
}
