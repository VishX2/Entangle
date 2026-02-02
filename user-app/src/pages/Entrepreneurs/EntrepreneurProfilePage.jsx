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