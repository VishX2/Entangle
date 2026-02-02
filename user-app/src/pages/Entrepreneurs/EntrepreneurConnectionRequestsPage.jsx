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
       {/*  REQUEST LIST  */}
      <div className="space-y-8">
        {requests.length === 0 ? (
          <EmptyState />
        ) : (
          requests.map((req) => (
            <div
              key={req.id}
              className="relative rounded-3xl p-8
                         bg-gradient-to-br from-white via-[#FAF9F6] to-[#F7F3E6]
                         border border-[#3F5C7D]/30
                         shadow-sm transition
                         hover:shadow-xl hover:-translate-y-1"
            >
              {/* Accent bar */}
              <div className="absolute left-0 top-8 w-1 h-12 bg-[#F97316] rounded-r" />

              <div className="flex flex-col md:flex-row justify-between gap-6">
                {/* LEFT */}
                <div className="flex gap-5">
                  <div className="w-16 h-16 rounded-full
                                  bg-gradient-to-br from-[#9EC7DD] to-[#E5E7EB]
                                  flex items-center justify-center
                                  font-bold text-xl text-[#0F172A]
                                  shadow">
                    {req.avatar}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-[#0F172A]">
                      {req.name}
                    </h3>
                    <p className="text-sm text-[#475569]">
                      {req.role} · {req.company}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-[#64748B] mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {req.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase size={14} />
                        Investor
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {req.time}
                      </span>
                    </div>

                    <p className="mt-3 text-[#64748B] leading-relaxed max-w-xl">
                      “{req.message}”
                    </p>
                  </div>
                </div>
