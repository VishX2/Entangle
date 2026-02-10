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

      {/* STATS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Stat label="Total Investments" value={investor.investments} />
        <Stat label="Match Score" value="92%" icon={Star} />
        <Stat label="Avg. Response Time" value="2–3 days" />
      </section>

      {/* ABOUT */}
      <Card title="About Investor">
        <p className="text-sm text-[#3F5D7D] leading-relaxed">
          {investor.bio}
        </p>
      </Card>

      {/* INVESTMENT THESIS */}
      <Card title="Investment Thesis">
        <p className="text-sm text-[#3F5D7D] leading-relaxed italic">
          “{investor.thesis}”
        </p>
      </Card>

      {/* FOCUS AREAS */}
      <Card title="Focus Areas">
        <div className="flex flex-wrap gap-2">
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
      </Card>
    </div>
  );
}

/* COMPONENTS */

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-3xl p-6 transition-all
                    hover:-translate-y-1 hover:shadow-xl">
      <h2 className="font-semibold text-[#2B3443] mb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Stat({ label, value, icon: Icon }) {
  return (
    <div className="bg-white rounded-2xl p-6 text-center
                    transition hover:shadow-md">
      {Icon && (
        <div className="flex justify-center mb-2 text-[#EF6C4E]">
          <Icon size={18} />
        </div>
      )}
      <p className="text-sm text-[#3F5D7D]">{label}</p>
      <p className="text-2xl font-semibold text-[#2B3443] mt-1">
        {value}
      </p>
    </div>
  );
}
