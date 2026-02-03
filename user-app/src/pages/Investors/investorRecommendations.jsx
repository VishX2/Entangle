import {
  Star,
  TrendingUp,
  MapPin,
  Briefcase,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function InvestorRecommendations() {
  const investors = [
    {
      id: 1,
      name: "Sequoia Capital",
      location: "California, USA",
      focus: ["SaaS", "AI", "FinTech"],
      stage: "Seed · Series A",
      match: 92,
      verified: true,
    },
    {
      id: 2,
      name: "Accel Partners",
      location: "Global",
      focus: ["B2B", "SaaS", "Cloud"],
      stage: "Seed · Growth",
      match: 87,
      verified: true,
    },
    {
      id: 3,
      name: "Angel Network",
      location: "Europe",
      focus: ["FinTech", "Marketplaces"],
      stage: "Pre-Seed · Seed",
      match: 81,
      verified: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F1E3] px-6 py-10 space-y-10">

      {/* HEADER */}
      <section className="space-y-2 max-w-4xl">
        <h1 className="text-3xl font-semibold text-[#2B3443]">
          Recommended Investors
        </h1>
        <p className="text-sm text-[#3F5D7D]">
          Based on your startup profile, traction, and industry alignment.
        </p>
      </section>

      {/* FILTER STRIP */}
      <section className="flex flex-wrap gap-3">
        {["All", "Top Match", "Verified Only", "Seed Stage", "FinTech"].map(
          (filter) => (
            <button
              key={filter}
              className="px-4 py-2 rounded-full text-sm font-medium
                         bg-white text-[#2B3443]
                         hover:bg-[#EF6C4E]/10 hover:text-[#EF6C4E]
                         transition"
            >
              {filter}
            </button>
          )
        )}
      </section>