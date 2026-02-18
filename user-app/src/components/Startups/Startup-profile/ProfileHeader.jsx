import { useNavigate } from "react-router-dom";
import profileImg from "../../../assets/startup-profile/startup1.jpg";
import coverImg from "../../../assets/startup-profile/cover.jpg";

export default function ProfileHeader() {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl overflow-hidden bg-white">

      {/* COVER IMAGE */}
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${coverImg})` }}
      />

      {/* CONTENT */}
      <div className="relative px-8 pb-8">

        {/* PROFILE IMAGE */}
        <div className="-mt-24 relative inline-block">
          <img
            src={profileImg}
            alt="Investor profile"
            className="w-44 h-44 rounded-full object-cover border-4 border-white"
          />

          {/* VERIFIED BADGE */}
          <div className="absolute bottom-4 right-4 bg-[#1d9bf0] rounded-full p-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17l-5-5"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* MAIN INFO */}
        <div className="mt-6 flex flex-col lg:flex-row justify-between gap-8">

          {/* LEFT */}
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-semibold text-slate-900">
                Anne Rozel
              </h1>

              <span className="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-medium">
                Founder
              </span>
            </div>

            <div className="mt-2 text-sm text-slate-600 flex flex-wrap gap-4">
              <span>San Francisco, California</span>
              <span>anne@rozel.vc</span>
              <span>Joined 2018</span>
            </div>

            <p className="mt-4 max-w-2xl text-sm text-slate-700 leading-relaxed">
              Backing visionary founders shaping the future of work, artificial intelligence, 
              and sustainable technology. Angel investor driven by a passion for mentorship, 
              meaningful collaboration, and building long-term partnerships that create lasting impact.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mt-6">
              <SocialIcon type="linkedin" />
              <SocialIcon type="x" />
              <SocialIcon type="website" />
              <SocialIcon type="email" />
            </div>

            {/* STATS */}
            <div className="flex gap-12 mt-7 text-sm">
              <Stat value="2.5K" label="Connections" />
              <Stat value="12.8K" label="Followers" />
              <Stat value="847" label="Posts" />
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-start gap-3">
            <ActionButton
              primary
              onClick={() => navigate("/investor/edit-profile")}
            >
              Edit Profile
            </ActionButton>

            <ActionButton>Public Profile</ActionButton>
            <ActionButton accent>AI Suggestions</ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/* HELPER COMPONENTS */

function Stat({ value, label }) {
  return (
    <div>
      <div className="font-semibold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}

function ActionButton({ children, primary, accent, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-5 py-2.5 rounded-full text-sm font-medium
        transition-all duration-200 ease-out
        hover:-translate-y-0.5 hover:shadow-sm
        active:scale-95
        ${
          primary
            ? "bg-slate-900 text-white hover:bg-slate-800"
            : accent
            ? "bg-orange-500 text-white hover:bg-orange-600"
            : "border border-slate-300 hover:bg-slate-100"
        }
      `}
    >
      {children}
    </button>
  );
}

function SocialIcon({ type }) {
  const icons = {
    linkedin: (
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v2zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4a2 2 0 0 1 0-4z" />
    ),
    x: (
      <path d="M18.244 2H21l-6.51 7.44L22 22h-6.828l-4.57-6.38L4.56 22H2l6.94-7.93L2 2h6.828l4.13 5.77L18.244 2z" />
    ),
    website: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M2.5 12h19" />
        <path d="M12 2.5a15 15 0 0 1 0 19" />
        <path d="M12 2.5a15 15 0 0 0 0 19" />
      </>
    ),
    email: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6l9-6" />
      </>
    ),
  };

  return (
    <button
      className="
        w-11 h-11 rounded-full border border-slate-300
        flex items-center justify-center
        transition-all duration-200 ease-out
        hover:bg-slate-100 hover:-translate-y-0.5
        active:scale-95
      "
      aria-label={type}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0f172a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icons[type]}
      </svg>
    </button>
  );
}
