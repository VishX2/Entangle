import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

import {
  Building2,
  Clock,
  AlertTriangle,
  Users,
  LayoutGrid,
  ShieldCheck,
  MessageSquare,
  LogOut,
} from "lucide-react";

/* -------------------- COLORS -------------------- */

const CHART_COLORS = {
  gold: "#eab308",
  silver: "#94a3b8",
  bronze: "#f97316",
  dark: "#334155",
};

/* ================= DASHBOARD ================= */

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-[#f7f3ec]">
      <Sidebar />
      <main className="flex-1 p-8 space-y-8 overflow-y-auto h-screen">
        <Header />
        <Stats />
        <Charts />
        <RecentActivity />
      </main>
    </div>
  );
}

/* ================= SIDEBAR ================= */

function Sidebar() {
  return (
    <aside className="w-64 bg-[#0f172a] text-slate-200 flex flex-col sticky top-0 h-screen">
      <div className="p-6">
        <div className="text-xl font-bold">Entangle</div>
        <div className="mt-4 border-t border-slate-700" />
      </div>

      <nav className="flex-1 space-y-2 px-4">
        <Item label="Dashboard" icon={LayoutGrid} active />
        <Item label="Startup Verification" icon={ShieldCheck} />
        <Item label="Content Moderation" icon={MessageSquare} />
        <Item label="Reports & Complaints" icon={AlertTriangle} />
      </nav>

      <div className="px-6">
        <div className="mb-4 border-t border-slate-700" />
      </div>

      <div className="p-4 text-sm opacity-70 cursor-pointer hover:text-white flex items-center gap-3">
        <LogOut className="h-4 w-4" />
        Logout
      </div>
    </aside>
  );
}

function Item({ label, icon: Icon, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
        active
          ? "bg-orange-500 text-white"
          : "text-slate-400 hover:bg-slate-800 hover:text-white"
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

/* ================= HEADER ================= */

function Header() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <p className="text-slate-500">
        Welcome back, Administrator. Here's your platform overview.
      </p>
    </div>
  );
}

/* ================= STATS ================= */

function Stats() {
  const cards = [
    {
      title: "Total Startups",
      value: "1,284",
      sub: "+12% from last month",
      icon: Building2,
    },
    {
      title: "Pending Verifications",
      value: "47",
      sub: "23 new this week",
      icon: Clock,
    },
    {
      title: "Reported Content",
      value: "12",
      sub: "3 urgent",
      danger: true,
      icon: AlertTriangle,
    },
    {
      title: "Active Investors",
      value: "892",
      sub: "+8% from last month",
      icon: Users,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.title}
            className="bg-white rounded-xl p-6 shadow-sm flex justify-between"
          >
            <div>
              <div className="text-slate-500">{c.title}</div>
              <div className="text-3xl font-bold mt-2">{c.value}</div>
              <div
                className={`text-sm mt-1 ${
                  c.danger ? "text-red-500" : "text-green-600"
                }`}
              >
                {c.sub}
              </div>
            </div>

            <div className="h-12 w-12 rounded-lg bg-slate-200 flex items-center justify-center">
              <Icon className="h-6 w-6 text-orange-500" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ================= CHARTS ================= */

function Charts() {
  const lineData = [
    { month: "Aug", gold: 45, silver: 78, bronze: 120 },
    { month: "Sep", gold: 52, silver: 85, bronze: 135 },
    { month: "Oct", gold: 60, silver: 92, bronze: 148 },
    { month: "Nov", gold: 58, silver: 98, bronze: 155 },
    { month: "Dec", gold: 70, silver: 110, bronze: 168 },
    { month: "Jan", gold: 85, silver: 125, bronze: 182 },
  ];

  const barData = [
    { name: "Verifications", value: 340, fill: CHART_COLORS.bronze },
    { name: "Reports", value: 160, fill: CHART_COLORS.dark },
    { name: "Moderation", value: 90, fill: "#1f2937" },
    { name: "Investors", value: 220, fill: CHART_COLORS.silver },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* LINE CHART */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-semibold mb-4">
          Startup Verification Trends
        </h3>
        <p className="text-sm text-slate-500 mb-4">
          Last 6 months verification breakdown
        </p>

        <div className="flex gap-6 mb-3 text-sm">
          <Legend label="Gold" color={CHART_COLORS.gold} />
          <Legend label="Silver" color={CHART_COLORS.silver} />
          <Legend label="Bronze" color={CHART_COLORS.bronze} />
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid stroke="#d1d5db" strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280" }} />
              <YAxis tick={{ fill: "#6b7280" }} />
              <Tooltip />

              <Line
                dataKey="gold"
                stroke={CHART_COLORS.gold}
                strokeWidth={3}
                dot={false}
                isAnimationActive
                animationDuration={900}
              />
              <Line
                dataKey="silver"
                stroke={CHART_COLORS.silver}
                strokeWidth={3}
                dot={false}
                isAnimationActive
                animationDuration={1100}
              />
              <Line
                dataKey="bronze"
                stroke={CHART_COLORS.bronze}
                strokeWidth={3}
                dot={false}
                isAnimationActive
                animationDuration={1300}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BAR CHART */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-semibold mb-4">
          Platform Activity Breakdown
        </h3>
        <p className="text-sm text-slate-500 mb-4">
          Activity distribution this month
        </p>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid
                stroke="#d1d5db"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
              <YAxis tick={{ fill: "#6b7280" }} />
              <Tooltip />

              <Bar
                dataKey="value"
                radius={[8, 8, 0, 0]}
                isAnimationActive
                animationDuration={900}
              >
                {barData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}

function Legend({ label, color }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-4 h-2 rounded-sm" style={{ backgroundColor: color }} />
      <span className="text-gray-600">{label}</span>
    </div>
  );
}

/* ================= RECENT ACTIVITY ================= */

function RecentActivity() {
  const items = [
    {
      title: "Startup verified",
      subtitle: "TechVentures Inc.",
      tag: "Gold",
      time: "2 min ago",
      tagStyle: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Content flagged",
      subtitle: "Description by StartupX",
      time: "15 min ago",
    },
    {
      title: "Report resolved",
      subtitle: "Complaint #1234",
      time: "1 hour ago",
    },
    {
      title: "Startup verified",
      subtitle: "GreenEnergy Co.",
      tag: "Silver",
      time: "2 hours ago",
      tagStyle: "bg-slate-100 text-slate-700",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <p className="text-sm text-slate-500">
          Latest platform actions and events
        </p>
      </div>

      <div className="divide-y">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center px-6 py-5"
          >
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-slate-500">{item.subtitle}</p>
            </div>

            <div className="flex items-center gap-4">
              {item.tag && (
                <span
                  className={`px-3 py-1 text-xs rounded-full ${item.tagStyle}`}
                >
                  {item.tag}
                </span>
              )}
              <span className="text-sm text-slate-500">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
