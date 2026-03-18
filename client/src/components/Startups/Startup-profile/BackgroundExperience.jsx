export default function BackgroundExperience() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100">

      {/* HEADER */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
          <BriefcaseIcon />
        </div>
        <h3 className="text-sm font-semibold text-slate-900">
          Background & Experience
        </h3>
      </div>

      {/* DESCRIPTION */}
      <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 leading-relaxed mb-5">
        With over 12 years of experience in building and scaling technology-driven companies. 
        Passionate about transforming bold ideas into impactful products that solve real-world challenges. 
        Former product leader at a high-growth startup with deep expertise in innovation, execution, and sustainable growth.
      </div>

      {/* STATS */}
      <div className="flex items-center gap-6 bg-orange-50 rounded-xl p-4 mb-6">
        <StatBlock value="15+" label="Years Experience" />
        <div className="w-px h-10 bg-orange-200" />
        <StatBlock value="50+" label="Investments Made" />
      </div>

      {/* AREAS OF EXPERTISE */}
      <div className="mb-5">
        <p className="text-xs text-slate-400 mb-2">Areas of Expertise</p>
        <div className="flex flex-wrap gap-2">
          <ExpertiseTag icon={<MentorIcon />} label="Mentorship" />
          <ExpertiseTag icon={<StrategyIcon />} label="Strategy" />
          <ExpertiseTag icon={<MarketingIcon />} label="Marketing" />
          <ExpertiseTag icon={<TechIcon />} label="Technology" />
          <ExpertiseTag icon={<OpsIcon />} label="Operations" />
        </div>
      </div>

      {/* PREVIOUS INVESTMENTS */}
      <div>
        <p className="text-xs text-slate-400 mb-3">Previous Investments</p>

        <InvestmentRow
          name="TechFlow AI"
          year="2023"
          status="Active"
        />
        <InvestmentRow
          name="GreenGrid Energy"
          year="2022"
          status="Exited"
        />
        <InvestmentRow
          name="HealthSync"
          year="2021"
          status="Active"
        />
        <InvestmentRow
          name="EduLearn Pro"
          year="2020"
          status="Exited"
        />
      </div>
    </div>
  );
}

/* SUB COMPONENTS */

function StatBlock({ value, label }) {
  return (
    <div>
      <div className="text-lg font-semibold text-orange-600">
        {value}
      </div>
      <div className="text-xs text-orange-500">
        {label}
      </div>
    </div>
  );
}

function ExpertiseTag({ icon, label }) {
  return (
    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-xs text-slate-600">
      {icon}
      {label}
    </span>
  );
}

function InvestmentRow({ name, year, status }) {
  const isActive = status === "Active";

  return (
    <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3 mb-2 last:mb-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
          <BuildingIcon />
        </div>
        <span className="text-sm text-slate-700">{name}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-400">{year}</span>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            isActive
              ? "bg-blue-100 text-blue-600"
              : "bg-slate-200 text-slate-600"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

/* ICONS */

function BriefcaseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 7h18v13H3z"
        stroke="#fb923c"
        strokeWidth="2"
      />
      <path
        d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
        stroke="#fb923c"
        strokeWidth="2"
      />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="#64748b" strokeWidth="2" />
      <path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01" stroke="#64748b" strokeWidth="2" />
    </svg>
  );
}

function MentorIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="#64748b" strokeWidth="2" />
      <path d="M4 20c1.5-4 14.5-4 16 0" stroke="#64748b" strokeWidth="2" />
    </svg>
  );
}

function StrategyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16M4 12h10M4 18h6" stroke="#64748b" strokeWidth="2" />
    </svg>
  );
}

function MarketingIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M3 11l18-5v12l-18-5v-2z" stroke="#64748b" strokeWidth="2" />
    </svg>
  );
}

function TechIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke="#64748b" strokeWidth="2" />
    </svg>
  );
}

function OpsIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#64748b" strokeWidth="2" />
      <path d="M12 7v5l3 3" stroke="#64748b" strokeWidth="2" />
    </svg>
  );
}
