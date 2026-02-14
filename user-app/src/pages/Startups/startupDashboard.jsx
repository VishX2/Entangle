import { useState } from "react";

export default function StartupDashboard() {
  const [dashboardData] = useState({
    profileStrength: 72,
    tractionScore: 82,
    monthlyRevenue: 42000,
    activeUsers: 3240,

    growthMetrics: [
      { id: 1, title: "Revenue Growth", value: "+22%" },
      { id: 2, title: "User Growth", value: "+31%" },
      { id: 3, title: "Burn Rate", value: "$12K/mo" },
    ],

    investorInterest: [
      {
        id: 1,
        name: "TechVentures Capital",
        action: "Viewed your pitch",
      },
      {
        id: 2,
        name: "Innovation Fund",
        action: "Saved your startup",
      },
    ],

    news: [
      {
        id: 1,
        title: "AI Startup Raises $10M Series A",
        source: { name: "TechCrunch" },
        urlToImage:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      },
      {
        id: 2,
        title: "FinTech Platform Expands to Europe",
        source: { name: "Forbes" },
        urlToImage:
          "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
      },
    ],

    quickActions: [
      { id: 1, label: "Upload Pitch" },
      { id: 2, label: "Edit Profile" },
    ],

    recentActivity: [
      { id: 1, text: "Investor viewed profile" },
      { id: 2, text: "Pitch saved by VC" },
      { id: 3, text: "New message received" },
    ],

    recommendedInvestors: [
      { id: 1, name: "Sequoia Capital" },
      { id: 2, name: "Andreessen Horowitz" },
      { id: 3, name: "Accel Partners" },
    ],
  });

  return (
    <div className="min-h-screen bg-[#D8D4C5] p-6 space-y-8">
      <StartupHero
        revenue={dashboardData.monthlyRevenue}
        users={dashboardData.activeUsers}
        traction={dashboardData.tractionScore}
      />

      <div className="grid grid-cols-12 gap-6">
        {/* MAIN CONTENT */}
        <div className="col-span-12 lg:col-span-9 space-y-8">
          <GrowthMetrics metrics={dashboardData.growthMetrics} />
          <InvestorInterest interests={dashboardData.investorInterest} />
          <StartupNews news={dashboardData.news} />
        </div>

        {/* SIDEBAR */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <ProfileStrength value={dashboardData.profileStrength} />
          <QuickActions actions={dashboardData.quickActions} />
          <RecentActivity activities={dashboardData.recentActivity} />
          <RecommendedInvestors
            investors={dashboardData.recommendedInvestors}
          />
        </div>
      </div>
    </div>
  );
}

/* ================= HERO ================= */

function StartupHero({ revenue, users, traction }) {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-slate-800 to-slate-600 text-white p-8 shadow-xl">
      <p className="text-sm opacity-70">STARTUP DASHBOARD</p>
      <h1 className="text-3xl font-semibold mt-1">
        Welcome back, Founder
      </h1>

      <div className="flex flex-wrap gap-6 mt-6">
        <StatCard title="Monthly Revenue" value={`$${revenue}`} />
        <StatCard title="Active Users" value={users} />
        <StatCard title="Traction Score" value={traction} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 hover:bg-white/20 transition">
      <div className="text-xs opacity-80">{title}</div>
      <div className="text-lg font-semibold mt-1">{value}</div>
    </div>
  );
}

/* ================= GROWTH METRICS ================= */

function GrowthMetrics({ metrics }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Growth Metrics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="bg-white rounded-3xl p-6 shadow hover:shadow-xl hover:-translate-y-1 transition"
          >
            <p className="text-sm text-slate-500">{metric.title}</p>
            <p className="text-2xl font-semibold mt-2 text-orange-500">
              {metric.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= INVESTOR INTEREST ================= */

function InvestorInterest({ interests }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Investor Interest</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {interests.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-5 shadow hover:shadow-xl hover:-translate-y-1 transition"
          >
            <p className="font-medium text-slate-900">{item.name}</p>
            <p className="text-sm text-slate-500 mt-1">
              {item.action}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= NEWS ================= */

function StartupNews({ news }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">
        Startup & Tech News
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl hover:-translate-y-1 transition"
          >
            {item.urlToImage && (
              <img
                src={item.urlToImage}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
            )}

            <div className="p-4">
              <h3 className="font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                {item.source?.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= SIDEBAR ================= */

function ProfileStrength({ value }) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow hover:shadow-xl hover:-translate-y-1 transition">
      <h3 className="font-semibold mb-3">Profile Strength</h3>
      <p className="text-3xl font-semibold text-orange-500">
        {value}%
      </p>
    </div>
  );
}

function QuickActions({ actions }) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow hover:shadow-xl hover:-translate-y-1 transition">
      <h3 className="font-semibold mb-3">Quick Actions</h3>

      {actions.map((action) => (
        <button
          key={action.id}
          className="w-full bg-slate-200 py-2 rounded-xl mb-3
                     hover:bg-orange-500 hover:text-white
                     hover:shadow-md hover:-translate-y-1
                     active:scale-95 transition"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}

function RecentActivity({ activities }) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow hover:shadow-xl hover:-translate-y-1 transition">
      <h3 className="font-semibold mb-3">Recent Activity</h3>

      {activities.map((item) => (
        <p key={item.id} className="text-sm mt-2 text-slate-600">
          {item.text}
        </p>
      ))}
    </div>
  );
}

function RecommendedInvestors({ investors }) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow hover:shadow-xl hover:-translate-y-1 transition">
      <h3 className="font-semibold mb-3">
        Recommended Investors
      </h3>

      {investors.map((inv) => (
        <p key={inv.id} className="text-sm py-1 text-slate-700">
          {inv.name}
        </p>
      ))}

      <button
        className="mt-4 w-full bg-orange-500 text-white py-2 rounded-xl
                   hover:bg-orange-600 hover:shadow-md hover:-translate-y-1
                   active:scale-95 transition"
      >
        Explore More Investors
      </button>
    </div>
  );
}
