import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/organisms/Sidebar";
import { fetchDashboardStats } from "../store/adminApi";
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
import { Building2, AlertTriangle, Users, Link2 } from "lucide-react";
import { selectCurrentUser } from "../store/authSlice";
import { selectDashboard, selectAdminLoading } from "../store/adminSlice";

// Chart color constants
const CHART_COLORS = {
  gold: "#eab308",
  silver: "#94a3b8",
  bronze: "#f97316",
  dark: "#334155",
};

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const dashboard = useSelector(selectDashboard);
  const loading = useSelector(selectAdminLoading);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  // Extract data with fallback defaults
  const stats = dashboard?.stats || {};
  const lineData = dashboard?.lineData || [];
  const barData = dashboard?.barData || [];
  const recentActivity = dashboard?.recentActivity || [];

  return (
    <div className="flex min-h-screen bg-[#F5F0DD]">
      <Sidebar />
      <main className="flex-1 p-8 space-y-8 overflow-y-auto h-screen">
        <Header name={user?.first_name} />

        {/* Statistics cards */}
        <Stats
          startupsCount={stats.startupsCount ?? 0}
          investorsCount={stats.investorsCount ?? 0}
          companiesCount={stats.companiesCount ?? 0}
          reportsCount={stats.reportsCount ?? 0}
          pendingConnectionsCount={stats.pendingConnectionsCount ?? 0}
          loading={loading}
        />

        {/* Charts section */}
        <Charts lineData={lineData} barData={barData} loading={loading} />
        {/* Recent activity feed */}
        <RecentActivity items={recentActivity} loading={loading} />
      </main>
    </div>
  );
}

// Displays welcome message with admin name
function Header({ name }) {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <p className="text-slate-500">
        Welcome back, {name || "Administrator"}. Here&apos;s your platform overview.
      </p>
    </div>
  );
}

// Displays key platform metrics (cards)
function Stats({ startupsCount, investorsCount, companiesCount, reportsCount, pendingConnectionsCount, loading }) {
  const cards = [
    { title: "Total Startups", value: loading ? "…" : String(startupsCount), sub: "In database", icon: Building2 },
    { title: "Total Companies", value: loading ? "…" : String(companiesCount), sub: "All types", icon: Building2 },
    { title: "Active Investors", value: loading ? "…" : String(investorsCount), sub: "Investor entities", icon: Users },
    { title: "Reported Content", value: loading ? "…" : String(reportsCount), sub: "Pending review", danger: reportsCount > 0, icon: AlertTriangle },
    { title: "Connection Requests", value: loading ? "…" : String(pendingConnectionsCount ?? 0), sub: "Awaiting approval", danger: (pendingConnectionsCount ?? 0) > 0, icon: Link2 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
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

// Displays data visualizations (line + bar charts)
function Charts({ lineData, barData, loading }) {

  // Default fallback data (prevents empty chart crash)
  const defaultLineData = [
    { month: "Aug", gold: 0, silver: 0, bronze: 0 },
    { month: "Sep", gold: 0, silver: 0, bronze: 0 },
    { month: "Oct", gold: 0, silver: 0, bronze: 0 },
    { month: "Nov", gold: 0, silver: 0, bronze: 0 },
    { month: "Dec", gold: 0, silver: 0, bronze: 0 },
    { month: "Jan", gold: 0, silver: 0, bronze: 0 },
  ];
  
  const line = lineData.length ? lineData : defaultLineData;

  // Default bar data
  const bar = barData.length ? barData : [
    { name: "Verifications", value: 0, fill: CHART_COLORS.bronze },
    { name: "Reports", value: 0, fill: CHART_COLORS.dark },
    { name: "Moderation", value: 0, fill: "#1f2937" },
    { name: "Investors", value: 0, fill: CHART_COLORS.silver },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="font-semibold mb-4">Startup Verification Trends</h3>
        <p className="text-sm text-slate-500 mb-4">Last 6 months by tier (Gold, Silver, Bronze)</p>
        <div className="flex gap-6 mb-3 text-sm">
          <Legend label="Gold" color={CHART_COLORS.gold} />
          <Legend label="Silver" color={CHART_COLORS.silver} />
          <Legend label="Bronze" color={CHART_COLORS.bronze} />
        </div>
        <div className="h-64">
          {loading ? (
            <div className="h-full flex items-center justify-center text-slate-400">Loading…</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={line}>
                <CartesianGrid stroke="#d1d5db" strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fill: "#6b7280" }} />
                <YAxis tick={{ fill: "#6b7280" }} />
                <Tooltip />
                <Line dataKey="gold" stroke={CHART_COLORS.gold} strokeWidth={3} dot={false} />
                <Line dataKey="silver" stroke={CHART_COLORS.silver} strokeWidth={3} dot={false} />
                <Line dataKey="bronze" stroke={CHART_COLORS.bronze} strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="font-semibold mb-4">Platform Activity Breakdown</h3>
        <p className="text-sm text-slate-500 mb-4">Current counts from backend</p>
        <div className="h-64">
          {loading ? (
            <div className="h-full flex items-center justify-center text-slate-400">Loading…</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bar}>
                <CartesianGrid stroke="#d1d5db" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
                <YAxis tick={{ fill: "#6b7280" }} />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {bar.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
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

// Displays latest system actions (admin activity feed)
function RecentActivity({ items, loading }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <p className="text-sm text-slate-500">Latest platform actions and events</p>
      </div>
      <div className="divide-y divide-slate-200">
        {loading ? (
          <div className="px-6 py-8 text-center text-slate-400">Loading…</div>
        ) : items.length === 0 ? (
          <div className="px-6 py-8 text-center text-slate-500">No recent activity</div>
        ) : (
          items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center px-6 py-5">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-slate-500">{item.subtitle}</p>
              </div>
              <div className="flex items-center gap-4">
                {item.tag && (
                  <span className={`px-3 py-1 text-xs rounded-full ${item.tagStyle || "bg-slate-100 text-slate-700"}`}>
                    {item.tag}
                  </span>
                )}
                <span className="text-sm text-slate-500">{item.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
