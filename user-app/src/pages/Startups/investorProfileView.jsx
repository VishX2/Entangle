import {
  CheckCircle,
  MapPin,
  Briefcase,
  TrendingUp,
  Mail,
  Star,
} from "lucide-react";

export default function InvestorProfileView() {
  const investor = {
    name: "Sequoia Capital",
    verified: true,
    location: "California, USA",
    focus: ["SaaS", "AI", "FinTech"],
    stage: "Seed · Series A",
    investments: 420,
    activity: "Very Active",
    bio:
      "Sequoia Capital partners with founders to build enduring companies. We focus on long-term value creation across technology-driven businesses.",
    thesis:
      "We invest in bold founders solving meaningful problems with scalable technology. Strong teams, early traction, and large markets are key signals.",
  };

  return (
    <div className="min-h-screen bg-[#F5F1E3] px-6 py-10 space-y-10">

      {/* HEADER */}
      <section className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-[#2B3443] flex items-center gap-2">
            {investor.name}
            {investor.verified && (
              <CheckCircle size={18} className="text-[#EF6C4E]" />
            )}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-[#3F5D7D]">
            <span className="flex items-center gap-2">
              <MapPin size={14} /> {investor.location}
            </span>
            <span className="flex items-center gap-2">
              <Briefcase size={14} /> {investor.stage}
            </span>
            <span className="flex items-center gap-2">
              <TrendingUp size={14} /> {investor.activity}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl
                       bg-white text-[#2B3443] text-sm font-medium
                       hover:shadow-md transition"
          >
            <Mail size={16} />
            Message
          </button>

          <button
            className="flex items-center gap-2 px-5 py-2 rounded-xl
                       bg-[#EF6C4E] text-white text-sm font-medium
                       hover:opacity-90 transition"
          >
            Request Connection
          </button>
        </div>
      </section>

      