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

      {/* INVESTOR CARDS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {investors.map((inv) => (
          <InvestorCard key={inv.id} investor={inv} />
        ))}
      </section>
    </div>
  );
}

/* COMPONENTS */

function InvestorCard({ investor }) {
  return (
    <div
      className="bg-white rounded-3xl p-6 transition-all duration-300
                 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Top Row */}
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-[#2B3443] flex items-center gap-2">
            {investor.name}
            {investor.verified && (
              <CheckCircle size={16} className="text-[#EF6C4E]" />
            )}
          </h2>
          <div className="flex items-center gap-2 text-sm text-[#3F5D7D]">
            <MapPin size={14} />
            {investor.location}
          </div>
        </div>

        {/* Match Score */}
        <div className="text-right">
          <p className="text-xs text-[#3F5D7D]">Match Score</p>
          <div className="flex items-center gap-1 text-[#EF6C4E] font-semibold">
            <Star size={16} />
            {investor.match}%
          </div>
        </div>
      </div>

      {/* Focus Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {investor.focus.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-xs font-medium
                       bg-[#C4DAE8] text-[#2B3443]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-6 text-sm text-[#3F5D7D] mb-6">
        <div className="flex items-center gap-2">
          <Briefcase size={16} />
          {investor.stage}
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp size={16} />
          High Activity
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-between items-center">
        <button
          className="text-sm font-medium text-[#EF6C4E]
                     hover:underline transition"
        >
          View Profile
        </button>

        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl
                     bg-[#2B3443] text-white text-sm font-medium
                     hover:opacity-90 transition"
        >
          Connect
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
