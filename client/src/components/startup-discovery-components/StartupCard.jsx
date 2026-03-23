import { useNavigate, useLocation } from "react-router-dom";
import ConnectButton from "../ConnectButton";
import MessageButton from "../MessageButton";
import { getAvatarUrl } from "../../utils/avatarUrl";

export default function StartupCard({ startup, matchScore }) {
  const navigate = useNavigate();
  const location = useLocation();
  const base = location.pathname.startsWith("/investor") ? "/investor" : location.pathname.startsWith("/startup") ? "/startup" : "/entrepreneur";

  return (
    <div className="bg-[#f1eee7] rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#e0e4e6] flex items-center justify-center overflow-hidden">
              {startup.logo ? (
                <img
                  src={getAvatarUrl(startup.logo)}
                  alt={startup.name}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <span className="text-slate-500 font-semibold text-sm">
                  {(startup.name || "").slice(0, 2).toUpperCase()}
                </span>
              )}
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
          <div className="bg-[#ffe4dc] text-[#ff6b4a] text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <StarIcon />
            {matchScore != null ? `${matchScore}% match` : startup.rating}
          </div>
        </div>
        <p className="mt-4 text-slate-600 text-sm leading-relaxed">
          {startup.description}
        </p>
        <div className="flex gap-2 mt-4 flex-wrap">
          <Tag label={startup.industry} />
          <Tag label={startup.stage} />
        </div>
      </div>
      <div className="mt-5 flex gap-3 flex-wrap">
        <button
          onClick={() => navigate(`${base}/company/${startup.id}`)}
          className="flex-1 min-w-[120px] bg-[#ff6b4a] hover:bg-[#ff5a36] text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
        >
          View Profile
          <ArrowIcon />
        </button>
        <ConnectButton companyId={startup.id} className="py-3" />
        <MessageButton company={{ ...startup, created_by: startup.created_by }} className="py-3" />
      </div>
    </div>
  );
}
function Tag({ label }) {
  return (
    <span className="bg-[#e7e4dc] text-slate-600 text-xs px-3 py-1 rounded-full">
      {label}
    </span>
  );
}
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
