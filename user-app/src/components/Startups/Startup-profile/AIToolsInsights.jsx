export default function AIToolsInsights() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 space-y-5">

      {/* HEADER */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
          <SparkIcon />
        </div>
        <h3 className="text-sm font-semibold text-slate-900">
          AI Tools & Insights
        </h3>
      </div>

      {/* PROFILE COMPLETENESS */}
      <div className="border border-slate-100 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <TargetIcon />
            Profile Completeness
          </div>
          <span className="text-orange-500 font-semibold">85%</span>
        </div>

        {/* PROGRESS BAR */}
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
          <div className="h-full w-[85%] bg-orange-500 rounded-full" />
        </div>

        {/* SUGGESTIONS */}
        <div className="space-y-2 text-sm">
          <Suggestion icon={<DotIcon color="bg-orange-500" />} text="Add more expertise tags" />
          <Suggestion icon={<DotIcon color="bg-blue-500" />} text="Update investment range" />
          <Suggestion icon={<DotIcon color="bg-slate-300" />} text="Add recent exits" />
        </div>
      </div>

      {/* AI MATCH INSIGHTS */}
      <div className="border border-slate-100 rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-slate-700 mb-1">
          <BrainIcon />
          AI Match Insights
        </div>

        <Insight text="Strong match with AI startups" />
        <Insight text="Consider expanding to Series B" />
        <Insight text="Your FinTech expertise is in high demand" />
      </div>

      {/* PRIVACY ALERT */}
      <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-orange-600 mb-1">
          <ShieldIcon />
          Privacy Alert
        </div>
        <p className="text-sm text-slate-600">
          Consider hiding specific investment amounts in public view
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <button className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 transition text-white text-sm font-medium py-3 rounded-xl">
        <SparkIcon />
        Run AI Profile Check
        <ArrowIcon />
      </button>

      <button className="w-full flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 transition text-slate-700 text-sm font-medium py-3 rounded-xl">
        <BrainIcon />
        Improve My Profile with AI
      </button>

    </div>
  );
}

function Suggestion({ icon, text }) {
  return (
    <div className="flex items-center gap-2 text-slate-600">
      {icon}
      {text}
    </div>
  );
}

function Insight({ text }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <CheckCircleIcon />
      {text}
    </div>
  );
}

function DotIcon({ color }) {
  return <span className={`w-2 h-2 rounded-full ${color}`} />;
}

/* ICONS */

function SparkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" stroke="white" strokeWidth="2" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="#64748b" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" stroke="#64748b" strokeWidth="2" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 2a3 3 0 0 0-3 3v2a3 3 0 0 0 0 6v2a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM15 2a3 3 0 0 1 3 3v2a3 3 0 0 1 0 6v2a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"
        stroke="#3b82f6"
        strokeWidth="2"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"
        stroke="#fb923c"
        strokeWidth="2"
      />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#3b82f6" strokeWidth="2" />
      <path d="M8 12l3 3 5-6" stroke="#3b82f6" strokeWidth="2" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
