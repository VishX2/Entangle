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
    <div className="min-h-screen bg-[#F7F3E6] p-10 space-y-12">

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

      {/*  RESULTS  */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="relative rounded-3xl p-7
                       bg-gradient-to-br from-white via-[#FAF9F6] to-[#F7F3E6]
                       border border-[#3F5C7D]/30
                       shadow-sm transition
                       hover:shadow-xl hover:-translate-y-1"
          >
            {/* Accent bar */}
            <div className="absolute left-0 top-6 w-1 h-12 bg-[#F97316] rounded-r" />

            {/* Header */}
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-[#0F172A]">
                {item.title}
              </h2>
              <p className="text-sm text-[#475569]">
                {item.company}
              </p>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-[#475569]">
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {item.location}
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp size={14} />
                {item.stage}
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-[#64748B] leading-relaxed">
              {item.description}
            </p>

            {/* Industries */}
            <div className="flex flex-wrap gap-2 mt-5">
              {item.industries.map((ind) => (
                <span
                  key={ind}
                  className="px-3 py-1.5 rounded-full text-xs font-medium
                             bg-[#E5E7EB] text-[#0F172A]"
                >
                  {ind}
                </span>
              ))}
            </div>

            {/* CTA */}
            <button
              className="mt-6 w-full flex items-center justify-center gap-2
                         rounded-xl py-3
                         bg-gradient-to-r from-[#F97316] to-[#F59E0B]
                         text-white font-medium
                         shadow-md transition
                         hover:shadow-xl hover:-translate-y-0.5"
            >
              <Users size={18} />
              View Collaboration
              <ArrowUpRight size={16} />
            </button>
          </div>
        ))}
      </div>

      {/*  EMPTY STATE  */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <Briefcase size={40} className="mx-auto text-[#64748B]" />
          <p className="mt-4 text-[#64748B]">
            No collaboration opportunities found.
          </p>
        </div>
      )}
    </div>
  );
}
