import { useNavigate } from "react-router-dom";

export default function StartupCard({ startup }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f1eee7] rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">

      {/* Top Section */}
      <div>
        <div className="flex items-start justify-between">
          
          {/* Logo + Name */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#e0e4e6] flex items-center justify-center overflow-hidden">
              <img
                src={startup.logo}
                alt={startup.name}
                className="w-8 h-8 object-contain"
              />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 text-lg">
                {startup.name}
              </h3>
              <p className="text-sm text-slate-500 flex items-center gap-1">
                <LocationIcon />
                {startup.location}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="bg-[#ffe4dc] text-[#ff6b4a] text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <StarIcon />
            {startup.rating}
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-slate-600 text-sm leading-relaxed">
          {startup.description}
        </p>

        {/* Tags */}
        <div className="flex gap-2 mt-4 flex-wrap">
          <Tag label={startup.industry} />
          <Tag label={startup.stage} />
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => navigate("/investor/startupProfileView")}
        className="mt-5 bg-[#ff6b4a] hover:bg-[#ff5a36] text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
      >
        View Profile
        <ArrowIcon />
      </button>
    </div>
  );
}

/* =====================================================
   TAG
   ===================================================== */

function Tag({ label }) {
  return (
    <span className="bg-[#e7e4dc] text-slate-600 text-xs px-3 py-1 rounded-full">
      {label}
    </span>
  );
}

/* =====================================================
   ICONS
   ===================================================== */

function LocationIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#94a3b8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z" />
      <circle cx="12" cy="11" r="2" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="#ff6b4a"
    >
      <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.402 8.173L12 18.896l-7.336 3.875 1.402-8.173L.132 9.211l8.2-1.193z" />
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
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}
