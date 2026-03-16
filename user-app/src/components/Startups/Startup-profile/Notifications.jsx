export default function Notifications() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
            <BellIcon />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">
            Notifications
          </h3>
        </div>

        <span className="text-xs font-medium text-white bg-orange-500 px-2 py-0.5 rounded-full">
          4 new
        </span>
      </div>

      {/* NOTIFICATION LIST */}
      <div className="space-y-3">

        <NotificationItem
          icon={<RocketIcon />}
          iconBg="bg-orange-50"
          title="New Pitch Request"
          description="CleanTech Innovations wants to pitch their Series A"
          time="2 hours ago"
        />

        <NotificationItem
          icon={<MessageIcon />}
          iconBg="bg-blue-50"
          title="New Message"
          description="Sarah Chen sent you a follow-up message"
          time="5 hours ago"
        />

        <NotificationItem
          icon={<UserIcon />}
          iconBg="bg-slate-100"
          title="Connection Request"
          description="Michael Torres wants to connect"
          time="1 day ago"
        />

        <NotificationItem
          icon={<StarIcon />}
          iconBg="bg-yellow-50"
          title="New Review"
          description="You received a 5-star review from HealthSync"
          time="2 days ago"
        />

      </div>

      {/* FOOTER */}
      <button className="w-full mt-5 flex items-center justify-center gap-1 text-sm text-slate-600 hover:text-slate-800 transition">
        View All Notifications
        <ChevronRightIcon />
      </button>
    </div>
  );
}

/* SUB COMPONENT */

function NotificationItem({ icon, iconBg, title, description, time }) {
  return (
    <div className="flex gap-3 bg-slate-50 rounded-xl p-3">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center ${iconBg}`}
      >
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-sm font-medium text-slate-800">
          {title}
        </p>
        <p className="text-xs text-slate-500">
          {description}
        </p>
        <p className="text-xs text-slate-400 mt-1">
          {time}
        </p>
      </div>
    </div>
  );
}

/* ICONS (MATCH STYLE) */

function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7"
        stroke="#64748b"
        strokeWidth="2"
      />
      <path
        d="M13.73 21a2 2 0 0 1-3.46 0"
        stroke="#64748b"
        strokeWidth="2"
      />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 19l4-4M5 19l-1-5 5 1"
        stroke="#fb923c"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 9l-4 4a6 6 0 0 1-6 2 6 6 0 0 1 2-6l4-4a6 6 0 0 1 6-2 6 6 0 0 1-2 6z"
        stroke="#fb923c"
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
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="#64748b" strokeWidth="2" />
      <path
        d="M4 20c1.5-4 14.5-4 16 0"
        stroke="#64748b"
        strokeWidth="2"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24">
      <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18l6-6-6-6"
        stroke="#64748b"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
