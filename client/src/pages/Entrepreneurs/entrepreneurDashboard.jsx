import { useState } from "react";

export default function EntrepreneurDashboard() {
  const [dashboardData] = useState({
    profileStrength: 76,
    influenceScore: 88,
    monthlyRevenue: 58000,
    activeInvestors: 27,

    growthMetrics: [
      { id: 1, title: "Revenue Growth", value: "+26%" },
      { id: 2, title: "Investor Growth", value: "+14%" },
      { id: 3, title: "Burn Rate", value: "$15K/mo" },
    ],             

    investorInterest: [
      {
        id: 1,
        name: "BluePeak Ventures",
        action: "Viewed your startup",
      },
      {
        id: 2,
        name: "NextGen Capital",
        action: "Saved your pitch",
      },
    ],

    news: [
      {
        id: 1,
        title: "AI Startup Raises $25M Series A",
        source: { name: "TechCrunch" },
        urlToImage:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: 2,
        title: "FinTech Platform Expands Globally",
        source: { name: "Forbes" },
        urlToImage:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
  
      },
    ],

    quickActions: [
      { id: 1, label: "Upload Pitch Deck" },
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
    <div className="bg-[#D8D4C5] min-h-screen p-6 space-y-8">
      <EntrepreneurHero
        revenue={dashboardData.monthlyRevenue}
        investors={dashboardData.activeInvestors}
        influence={dashboardData.influenceScore}
      />

      <div className="grid grid-cols-12 gap-6">

        {/* MAIN CONTENT */}
        <div className="col-span-12 lg:col-span-9 space-y-8">
          <GrowthMetrics metrics={dashboardData.growthMetrics} />
          <InvestorInterest interests={dashboardData.investorInterest} />
          <EntrepreneurNews news={dashboardData.news} />
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

/* ---------------- COMPONENTS ---------------- */

function EntrepreneurHero({ revenue, investors, influence }) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-[#2E3A4B] to-[#465F7F] text-white p-8 shadow-lg">
      <p className="text-sm opacity-80">ENTREPRENEUR DASHBOARD</p>
      <h1 className="text-3xl font-semibold mt-1">
        Welcome back, Founder
      </h1>

      <div className="flex flex-wrap gap-6 mt-6">
        <StatCard title="Monthly Revenue" value={`$${revenue}`} />
        <StatCard title="Active Investors" value={investors} />
        <StatCard title="Influence Score" value={influence} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white/10 rounded-xl px-4 py-3 hover:bg-white/20 transition duration-200">
      <div className="text-xs opacity-80">{title}</div>
      <div className="text-lg font-semibold mt-1">{value}</div>
    </div>
  );
}

function GrowthMetrics({ metrics }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Growth Metrics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="bg-white rounded-2xl p-6 shadow
                       hover:shadow-xl hover:-translate-y-1
                       transition duration-200"
          >
            <p className="text-sm text-gray-500">{metric.title}</p>
            <p className="text-2xl font-semibold mt-2 text-[#E66A4B]">
              {metric.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function InvestorInterest({ interests }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Investor Interest</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {interests.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 shadow
                       hover:shadow-xl hover:-translate-y-1
                       transition duration-200"
          >
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500 mt-1">{item.action}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function EntrepreneurNews({ news }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">
        Startup & Tech News
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden shadow
                       hover:shadow-xl hover:-translate-y-1
                       transition duration-200"
          >
            {item.urlToImage && (
              <img
                src={item.urlToImage}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
            )}

            <div className="p-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-2">
                {item.source?.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProfileStrength({ value }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow hover:shadow-xl hover:-translate-y-1 transition duration-200">
      <h3 className="font-semibold mb-3">Profile Strength</h3>
      <p className="text-3xl font-semibold text-[#E66A4B]">
        {value}%
      </p>
    </div>
  );
}

function QuickActions({ actions }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow hover:shadow-xl hover:-translate-y-1 transition duration-200">
      <h3 className="font-semibold mb-3">Quick Actions</h3>

      {actions.map((action) => (
        <button
          key={action.id}
          className="w-full bg-gray-200 py-2 rounded-xl mb-3
                     hover:bg-[#E66A4B] hover:text-white
                     hover:shadow-md hover:-translate-y-1
                     active:scale-95
                     transition duration-200"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}

function RecentActivity({ activities }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow hover:shadow-xl hover:-translate-y-1 transition duration-200">
      <h3 className="font-semibold mb-3">Recent Activity</h3>

      {activities.map((item) => (
        <p key={item.id} className="text-sm mt-2">
          {item.text}
        </p>
      ))}
    </div>
  );
}

function RecommendedInvestors({ investors }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow hover:shadow-xl hover:-translate-y-1 transition duration-200">
      <h3 className="font-semibold mb-3">
        Recommended Investors
      </h3>

      {investors.map((inv) => (
        <p key={inv.id} className="text-sm py-1">
          {inv.name}
        </p>
      ))}

      <button
        className="mt-4 w-full bg-[#E66A4B] text-white py-2 rounded-xl
                   hover:bg-[#d85e40] hover:shadow-md hover:-translate-y-1
                   active:scale-95 transition duration-200"
      >
        Explore More Investors
      </button>
    </div>
  );
}
