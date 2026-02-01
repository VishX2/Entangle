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

}