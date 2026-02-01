import { useEffect, useState } from "react";

export default function StartupDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    // mock async fetch
    setTimeout(() => {
      setMetrics({
        profileViews: 1234,
        investorInterest: 48,
        unreadMessages: 15,
        profileStrength: 75,
      });

      setActivity([
        {
          id: 1,
          text: "Investor viewed your profile",
          time: "2 hours ago",
        },
        {
          id: 2,
          text: "New message from TechVentures Capital",
          time: "5 hours ago",
        },
        {
          id: 3,
          text: "You updated your pitch deck",
          time: "1 day ago",
        },
      ]);
    }, 300);
  }, []);

  if (!metrics) {
    return <p className="text-gray-500">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-8">
      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Profile Views" value={metrics.profileViews} />
        <DashboardCard title="Investor Interest" value={metrics.investorInterest} />
        <DashboardCard title="Unread Messages" value={metrics.unreadMessages} />
      </div>

      
    </div> 

  );
}