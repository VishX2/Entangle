import {
  Mail,
  MapPin,
  Building2,
  Pencil,
  Briefcase,
  TrendingUp,
  Star,
} from "lucide-react";

export default function EntrepreneurProfile() {
  const profile = {
    name: "Robert Anderson",
    role: "Angel Investor",
    company: "NorthBridge Capital Partners",
    email: "robert.anderson@northbridgecapital.com",
    location: "San Francisco, California, USA",
    industries: ["AI/ML", "FinTech", "HealthTech", "SaaS"],
    investmentRange: "$25K – $250K",
    stages: ["Pre-Seed", "Seed"],
    about:
      "I'm an experienced investor with over 12 years in venture capital. I specialize in technology-driven startups, particularly in fintech, healthtech, and AI. I actively mentor founders and support sustainable growth.",
    stats: [
      { label: "Startups Backed", value: "42+" },
      { label: "Years Experience", value: "12+" },
      { label: "Active Deals", value: "8" },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F7F3E6] p-10 space-y-16">

      {/* HERO  */}
      <div className="relative bg-white rounded-[36px] p-10
                      border border-[#3F5C7D]/40
                      transition
                      hover:border-[#F97316]
                      hover:shadow-xl hover:-translate-y-1">

        <div className="absolute inset-x-0 top-0 h-1
                        bg-gradient-to-r from-[#0F172A] via-[#3F5C7D] to-[#F97316]
                        rounded-t-[36px]" />

        <div className="flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full
                              bg-gradient-to-br from-[#9EC7DD] to-[#E5E7EB]
                              ring-4 ring-[#3F5C7D]/40
                              flex items-center justify-center
                              text-[#0F172A] font-bold text-3xl
                              transition
                              hover:ring-[#F97316]">
                RA
              </div>
              <div className="absolute -bottom-1 -right-1
                              bg-[#F97316] p-2 rounded-full shadow">
                <Star size={14} className="text-white" />
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-bold text-[#0F172A]">
                {profile.name}
              </h1>
              <p className="text-[#3F5C7D] mt-1">
                {profile.role} · {profile.company}
              </p>

              <div className="flex gap-2 mt-4">
                <Badge label={profile.investmentRange} />
                <Badge label={profile.stages.join(", ")} />
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2
                             bg-[#F97316] text-white
                             px-6 py-3 rounded-xl
                             shadow-md transition
                             hover:bg-[#0F172A]
                             hover:shadow-xl hover:-translate-y-0.5">
            <Pencil size={16} />
            Edit Profile
          </button>
        </div>
      </div>


      {/*  STATS  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {profile.stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-8 text-center
                       border border-[#3F5C7D]/40
                       transition
                       hover:border-[#F97316]
                       hover:shadow-lg hover:-translate-y-1"
          >
            <p className="text-4xl font-bold text-[#0F172A]">{s.value}</p>
            <p className="text-sm text-[#3F5C7D] mt-2">{s.label}</p>
          </div>
        ))}
      </div>

      {/*  TABS  */}
      <div className="bg-white rounded-2xl p-2 flex gap-2
                      border border-[#3F5C7D]/40 shadow-sm">
        {["Overview", "Portfolio", "Visibility", "Analytics"].map((tab, i) => (
          <button
            key={tab}
            className={`flex-1 py-3 rounded-xl font-semibold transition
              ${
                i === 0
                  ? "bg-[#F97316] text-white shadow"
                  : "text-[#3F5C7D] hover:bg-[#0F172A] hover:text-white"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/*  PERSONAL INFO  */}
      <Section title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <InfoItem icon={Mail} label="Email" value={profile.email} />
          <InfoItem icon={MapPin} label="Location" value={profile.location} />
          <InfoItem icon={Building2} label="Company" value={profile.company} />
          <InfoItem icon={Briefcase} label="Investment Range" value={profile.investmentRange} />
        </div>
      </Section>

      {/*  INVESTMENT PROFILE  */}
      <Section title="Investment Profile">
        <p className="text-[#3F5C7D] leading-relaxed max-w-4xl">
          {profile.about}
        </p>

        <div className="flex flex-wrap gap-3 pt-5">
          {profile.industries.map((item) => (
            <span
              key={item}
              className="px-5 py-2 rounded-full text-sm font-semibold
                         bg-[#E5E7EB] text-[#0F172A]
                         border border-[#3F5C7D]/40
                         transition
                         hover:bg-[#F97316]
                         hover:text-white"
            >
              {item}
            </span>
          ))}
        </div>
      </Section>


      {/*  INVESTMENT THESIS  */}
      <Section title="Investment Thesis">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <ThesisCard
            title="Preferred Stages"
            value={profile.stages.join(", ")}
            icon={TrendingUp}
          />
          <ThesisCard
            title="Value Add"
            value="Mentorship, Strategy, Network Access"
            icon={Briefcase}
          />
        </div>
      </Section>
    </div>
  );
}

/*  COMPONENTS  */

function Section({ title, children }) {
  return (
    <div className="relative bg-white rounded-3xl p-10 space-y-6
                    border border-[#3F5C7D]/40
                    transition
                    hover:border-[#F97316]
                    hover:shadow-lg hover:-translate-y-1">
      <div className="absolute left-0 top-10 w-1 h-12 bg-[#F97316] rounded-r" />
      <h2 className="text-xl font-bold text-[#0F172A] pl-4">{title}</h2>
      {children}
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-6 items-start transition hover:-translate-y-0.5">
      <div className="w-14 h-14 rounded-xl
                      bg-gradient-to-br from-[#9EC7DD] to-[#E5E7EB]
                      border border-[#3F5C7D]/40
                      flex items-center justify-center
                      transition
                      hover:bg-[#0F172A]">
        <Icon size={22} className="text-[#0F172A] hover:text-white transition" />
      </div>
      <div>
        <p className="text-xs text-[#3F5C7D]">{label}</p>
        <p className="font-semibold text-[#0F172A]">{value}</p>
      </div>
    </div>
  );
}

function ThesisCard({ title, value, icon: Icon }) {
  return (
    <div className="relative bg-white rounded-2xl p-8
                    border border-[#3F5C7D]/40
                    transition
                    hover:border-[#F97316]
                    hover:shadow-lg hover:-translate-y-1">
      <div className="absolute left-0 top-8 w-1 h-12 bg-[#F97316] rounded-r" />

      <div className="flex items-center gap-5 mb-4">
        <div className="w-12 h-12 rounded-xl
                        bg-gradient-to-br from-[#9EC7DD] to-[#E5E7EB]
                        border border-[#3F5C7D]/40
                        flex items-center justify-center
                        transition hover:bg-[#0F172A]">
          <Icon size={20} className="text-[#0F172A] hover:text-white transition" />
        </div>
        <p className="font-bold text-[#0F172A] text-lg">{title}</p>
      </div>

      <p className="text-[#3F5C7D]">{value}</p>
    </div>
  );
}

function Badge({ label }) {
  return (
    <span className="px-4 py-1.5 rounded-full text-xs font-semibold
                     bg-[#E5E7EB] text-[#0F172A]
                     border border-[#3F5C7D]/40
                     transition hover:bg-[#F97316] hover:text-white">
      {label}
    </span>
  );
}
