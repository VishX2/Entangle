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

      {/* PROFILE STRENGTH */}
      <div className="bg-white rounded-lg shadow p-6">
        <p className="font-semibold mb-3">Profile Strength</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-500 h-2 rounded-full"
            style={{ width: `${metrics.profileStrength}%` }}
          />
        </div>
        <p className="text-right text-sm mt-2">
          {metrics.profileStrength}%
        </p>
      </div>
      
      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-lg shadow p-6">
        <p className="font-semibold mb-4">Quick Actions</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickAction label="Edit Profile" />
          <QuickAction label="Upload Pitch Deck" />
          <QuickAction label="View Messages" />
        </div>
      </div>
      
      {/* RECENT ACTIVITY */}
      <div className="bg-white rounded-lg shadow p-6">
        <p className="font-semibold mb-4">Recent Activity</p>

        <ul className="space-y-3">
          {activity.map((item) => (
            <li
              key={item.id}
              className="flex justify-between text-sm text-gray-600"
            >
              <span>{item.text}</span>
              <span className="text-gray-400">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

