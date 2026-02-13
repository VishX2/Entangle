import { useState } from "react";
import { Shield, Check, Users, Sparkles } from "lucide-react";

export default function StartupProfile() {
  const [startup] = useState({
    name: "Entangle AI",
    location: "San Francisco, CA",
    industry: "SaaS · AI",
    founded: "2024",
    bio: "AI-powered SaaS platform helping startups connect with investors globally. We focus on intelligent matchmaking and data-driven fundraising insights.",

    cover:
      "https://images.unsplash.com/photo-1551434678-e076c223a692",
    logo:
      "https://via.placeholder.com/200x200.png?text=Startup+Logo",

    verification: [
      { label: "Company Registration", verified: true },
      { label: "Founders Identity Verified", verified: true },
      { label: "Domain Verified", verified: true },
      { label: "Pitch Deck Uploaded", verified: false },
    ],

    team: [
      { name: "John Carter", role: "CEO" },
      { name: "Lisa Wong", role: "CTO" },
      { name: "Michael Chen", role: "Head of Growth" },
    ],

    description:
      "We are building the future of startup fundraising. Our platform connects verified founders with high-quality investors using AI-powered compatibility scoring. Since launch, we've onboarded 2,000+ startups and facilitated over $12M in funding matches.",
  });

  const verifiedCount = startup.verification.filter(v => v.verified).length;
  const trustScore = Math.round(
    (verifiedCount / startup.verification.length) * 100
  );

  return (
    <div className="bg-[#D8D4C5] min-h-screen">

      {/* COVER + HEADER */}
      <div className="relative bg-white shadow">

        {/* COVER IMAGE */}
        <div
          className="h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${startup.cover})` }}
        />

        {/* LOGO */}
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="-mt-16 w-32 h-32 rounded-3xl border-4 border-white shadow-xl overflow-hidden">
            <img
              src={startup.logo}
              alt="Startup Logo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* BASIC INFO */}
          <div className="mt-4 pb-6">
            <h1 className="text-3xl font-semibold text-slate-900">
              {startup.name}
            </h1>

            <div className="flex flex-wrap gap-3 text-sm text-slate-500 mt-2">
              <span className="bg-slate-100 px-3 py-1 rounded-lg">
                {startup.location}
              </span>
              <span className="bg-slate-100 px-3 py-1 rounded-lg">
                {startup.industry}
              </span>
              <span className="text-slate-400">
                Founded {startup.founded}
              </span>
            </div>

            <p className="mt-4 text-slate-700 max-w-3xl text-sm leading-relaxed">
              {startup.bio}
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* ABOUT */}
          <div className="bg-white rounded-3xl p-6 shadow">
            <h3 className="font-semibold text-slate-900 mb-4">
              About Startup
            </h3>

            <p className="text-sm text-slate-700 leading-relaxed">
              {startup.description}
            </p>
          </div>

          {/* TEAM */}
          <div className="bg-white rounded-3xl p-6 shadow">
            <div className="flex items-center gap-2 mb-6">
              <Users className="text-orange-500" size={20} />
              <h3 className="font-semibold text-slate-900">
                Team Members
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {startup.team.map((member, index) => (
                <div
                  key={index}
                  className="bg-slate-100 rounded-xl p-4"
                >
                  <div className="font-medium text-slate-900 text-sm">
                    {member.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {member.role}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* VERIFICATION */}
          <div className="bg-white rounded-3xl p-6 shadow">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="text-orange-500" size={18} />
              <h3 className="font-semibold text-slate-900">
                Verification & Trust
              </h3>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-500">
                Trust Score
              </span>
              <span className="text-orange-500 font-medium">
                {trustScore}%
              </span>
            </div>

            <div className="w-full h-2 bg-slate-200 rounded-full mb-5">
              <div
                className="h-2 bg-orange-500 rounded-full"
                style={{ width: `${trustScore}%` }}
              />
            </div>

            <div className="space-y-3">
              {startup.verification.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-slate-100 rounded-xl px-4 py-3"
                >
                  <span className="text-sm text-slate-700">
                    {item.label}
                  </span>

                  {item.verified ? (
                    <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                      <Check size={14} />
                      Verified
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">
                      Pending
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI INSIGHTS CARD */}
          <div className="bg-white rounded-3xl p-6 shadow">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-orange-500" size={18} />
              <h3 className="font-semibold text-slate-900">
                AI Insights
              </h3>
            </div>

            <p className="text-sm text-slate-600 mb-4">
              This startup profile is highly optimized for investor visibility.
            </p>

            <button className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition">
              Connect with Startup
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
