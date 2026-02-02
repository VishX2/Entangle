import {
  Search,
  Filter,
  Briefcase,
  MapPin,
  TrendingUp,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";

const collaborationsData = [
  {
    id: 1,
    title: "AI-Powered FinTech Platform",
    company: "NovaPay",
    location: "San Francisco, USA",
    description:
      "Looking for strategic partners to scale our AI-driven payment and fraud detection platform.",
    industries: ["AI", "FinTech", "SaaS"],
    stage: "Seed",
  },
  {
    id: 2,
    title: "HealthTech Remote Monitoring Startup",
    company: "CarePulse",
    location: "Berlin, Germany",
    description:
      "Seeking collaboration with healthcare providers and AI partners for patient monitoring.",
    industries: ["HealthTech", "AI"],
    stage: "Pre-Seed",
  },
  {
    id: 3,
    title: "B2B SaaS Automation Tool",
    company: "FlowOps",
    location: "London, UK",
    description:
      "Open to partnerships with SaaS platforms and enterprise solution providers.",
    industries: ["SaaS", "Enterprise"],
    stage: "Series A",
  },
];

export default function StartupCollaborations() {
  const [search, setSearch] = useState("");

  const filtered = collaborationsData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F7F3E6] p-10 space-y-12"></div>

    {/*  HEADER  */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[#0F172A]">
          Startup Collaboration Opportunities
        </h1>
        <p className="text-[#64748B] max-w-2xl">
          Discover startups seeking partnerships, strategic alliances, and
          growth opportunities.
        </p>
      </div>

      {/*  SEARCH & FILTER  */}
      <div
        className="flex flex-col md:flex-row gap-4
                   bg-gradient-to-br from-white to-[#FAF9F6]
                   border border-[#3F5C7D]/30
                   rounded-2xl p-5 shadow-sm"
      >
        <div className="flex items-center gap-3 flex-1">
          <Search size={18} className="text-[#64748B]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by startup or industry..."
            className="w-full bg-transparent
                       focus:outline-none
                       text-[#0F172A]"
          />
        </div>

        <button
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                     border border-[#3F5C7D]/30
                     text-[#0F172A]
                     bg-[#F7F3E6]
                     hover:bg-[#EDE9DD]
                     transition"
        >
          <Filter size={16} />
          Filters
        </button>
      </div>
