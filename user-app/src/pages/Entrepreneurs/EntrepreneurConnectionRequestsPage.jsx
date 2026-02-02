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