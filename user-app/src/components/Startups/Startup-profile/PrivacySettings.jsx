export default function PrivacySettings() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
            <ShieldIcon />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">
            Privacy & Settings
          </h3>
        </div>

        <button className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition">
          <SettingsIcon />
          Manage
        </button>
      </div>

      {/* SETTINGS LIST */}
      <div className="space-y-3">

        <SettingRow
          icon={<EyeIcon />}
          title="Profile Visibility"
          description="Make your profile visible to startups"
          enabled
        />

        <SettingRow
          icon={<DollarIcon />}
          title="Hide Investment Amounts"
          description="Hide specific investment figures"
        />

        <SettingRow
          icon={<MessageIcon />}
          title="Allow Messages"
          description="Receive direct messages from startups"
          enabled
        />

        <SettingRow
          icon={<RocketIcon />}
          title="Accept Pitch Requests"
          description="Allow startups to send pitch requests"
          enabled
        />

      </div>
    </div>
  );
}

/* SUB COMPONENTS */

function SettingRow({ icon, title, description, enabled = false }) {
  return (
    <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-800">{title}</p>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </div>

      <ToggleSwitch enabled={enabled} />
    </div>
  );
}

function ToggleSwitch({ enabled }) {
  return (
    <div
      className={`w-11 h-6 rounded-full p-1 transition ${
        enabled ? "bg-slate-800" : "bg-slate-300"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full transition ${
          enabled ? "translate-x-5" : ""
        }`}
      />
    </div>
  );
}

/* ICONS */

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"
        stroke="#64748b"
        strokeWidth="2"
      />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
        stroke="#94a3b8"
        strokeWidth="2"
      />
      <path
        d="M2 12h2m16 0h2M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M4.9 19.1l1.4-1.4m11.4-11.4l1.4-1.4"
        stroke="#94a3b8"
        strokeWidth="2"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z"
        stroke="#64748b"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="3" stroke="#64748b" strokeWidth="2" />
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

function MessageIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"
        stroke="#64748b"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 19l4-4M5 19l-1-5 5 1"
        stroke="#64748b"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 9l-4 4a6 6 0 0 1-6 2 6 6 0 0 1 2-6l4-4a6 6 0 0 1 6-2 6 6 0 0 1-2 6z"
        stroke="#64748b"
        strokeWidth="2"
      />
    </svg>
  );
}
