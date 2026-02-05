export default function ConnectInteract() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100">

      {/* HEADER */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
          <ConnectIcon />
        </div>
        <h3 className="text-sm font-semibold text-slate-900">
          Connect & Interact
        </h3>
      </div>

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <PrimaryButton icon={<UserPlusIcon />} label="Connect" />
        <PrimaryButton icon={<RocketIcon />} label="Pitch Startup" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <SecondaryButton icon={<MessageIcon />} label="Message" />
        <DisabledButton icon={<CalendarIcon />} label="Meeting" />
      </div>
    </div>
  );
}

/* =====================================================
   BUTTONS
   ===================================================== */

function PrimaryButton({ icon, label }) {
  return (
    <button className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 transition text-white text-sm font-medium py-3">
      {icon}
      {label}
    </button>
  );
}

function SecondaryButton({ icon, label }) {
  return (
    <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition text-slate-700 text-sm font-medium py-3">
      {icon}
      {label}
    </button>
  );
}

function DisabledButton({ icon, label }) {
  return (
    <button
      disabled
      className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 text-slate-400 text-sm font-medium py-3 cursor-not-allowed"
    >
      {icon}
      {label}
    </button>
  );
}

/* =====================================================
   ICONS (MATCH STYLE)
   ===================================================== */

function ConnectIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 7a4 4 0 1 0 0.001 8.001A4 4 0 0 0 7 7zM17 7a4 4 0 1 0 0.001 8.001A4 4 0 0 0 17 7z"
        stroke="#fb923c"
        strokeWidth="2"
      />
      <path
        d="M7 15v2M17 15v2"
        stroke="#fb923c"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserPlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="4" stroke="white" strokeWidth="2" />
      <path
        d="M3 20c1.5-4 9.5-4 11 0"
        stroke="white"
        strokeWidth="2"
      />
      <path
        d="M17 8v6M14 11h6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 19l4-4M5 19l-1-5 5 1"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 9l-4 4a6 6 0 0 1-6 2 6 6 0 0 1 2-6l4-4a6 6 0 0 1 6-2 6 6 0 0 1-2 6z"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"
        stroke="#475569"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        stroke="#94a3b8"
        strokeWidth="2"
      />
      <path
        d="M8 2v4M16 2v4M3 10h18"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
