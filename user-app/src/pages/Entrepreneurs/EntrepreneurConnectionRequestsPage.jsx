import {
  Check,
  X,
  UserPlus,
  MapPin,
  Briefcase,
  Clock,
} from "lucide-react";
import { useState } from "react";

const initialRequests = [
  {
    id: 1,
    name: "Sarah Williams",
    role: "VC Partner",
    company: "BluePeak Ventures",
    location: "New York, USA",
    message:
      "Interested in learning more about your startup and exploring a potential partnership.",
    time: "2 hours ago",
    avatar: "SW",
  },
  {
    id: 2,
    name: "Daniel Kim",
    role: "Angel Investor",
    company: "DK Capital",
    location: "Seoul, South Korea",
    message:
      "Would love to connect and discuss your growth strategy.",
    time: "1 day ago",
    avatar: "DK",
  },
];

export default function EntrepreneurConnections() {
  const [requests, setRequests] = useState(initialRequests);

  const acceptRequest = (id) => {
    setRequests(requests.filter((r) => r.id !== id));
  };

  const declineRequest = (id) => {
    setRequests(requests.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F7F3E6] p-10 space-y-14"></div>
    
     {/*  HEADER  */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[#0F172A]">
          Connection Requests
        </h1>
        <p className="text-[#64748B] max-w-2xl">
          Investors and founders who want to connect with you.
          Build meaningful relationships to grow your startup.
        </p>
      </div>

      {/*  STATS STRIP  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Pending Requests" value={requests.length} />
        <StatCard title="Connections This Month" value="12" />
        <StatCard title="Profile Views" value="247" />
      </div>
