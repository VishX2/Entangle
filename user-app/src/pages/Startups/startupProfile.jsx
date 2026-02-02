import { Edit3 } from "lucide-react";
import { useState } from "react";

export default function StartupProfile() {
  const tabs = ["Overview", "Portfolio", "Visibility", "Analytics"];
  const activeTab = "Overview";

  const [editingThesis, setEditingThesis] = useState(false);
  const [thesis, setThesis] = useState("");

  return (
    <div
      className="w-full min-h-screen px-10 py-8 space-y-10"
      style={{ backgroundColor: "#F5F1E3" }}
    >

      {/* HEADER */}
      <section className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <img
            src="https://i.pravatar.cc/80"
            alt="Founder"
            className="w-16 h-16 rounded-full border"
            style={{ borderColor: "#9EC6DC" }}
          />

          <div>
            <h1 className="text-2xl font-semibold text-[#2B3443]">
              Your Startup
            </h1>
            <p className="text-sm text-[#3F5D7D]">
              SaaS · FinTech · Early Stage
            </p>
          </div>
        </div>

        <button
          className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium
                     transition hover:-translate-y-0.5 hover:shadow-md
                     bg-[#2B3443] text-white"
        >
          <Edit3 size={16} />
          Edit Profile
        </button>
      </section>

      {/* TABS */}
      <section
        className="inline-flex rounded-full p-1"
        style={{ backgroundColor: "#9EC6DC" }}
      >
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-[#2B3443] text-white shadow-sm"
                    : "text-[#2B3443] hover:bg-[#F5F1E3]"
                }`}
            >
              {tab}
            </button>
          );
        })}
      </section>

      {/* PERSONAL INFO */}
      <Card title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Info label="Startup Name" value="Your Startup" />
          <Info label="Email" value="founder@startup.com" />
          <Info label="Company Type" value="Private" />
          <Info label="Location" value="San Francisco, USA" />
        </div>
      </Card>

      {/* STARTUP PROFILE */}
      <Card title="Startup Profile">
        <p className="text-sm leading-relaxed text-[#3F5D7D]">
          Briefly describe what your startup does, who it’s for, and the problem
          you’re solving. This helps investors understand your business quickly.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {["SaaS", "FinTech", "AI", "B2B"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium
                         bg-[#EF6C4E] text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </Card>

      {/* INVESTMENT DETAILS */}
      <Card title="Investment Details">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Badge label="Stage" value="Seed" />
          <Badge label="Seeking" value="$250K" />
          <Badge label="Equity Offered" value="10%" />
        </div>
      </Card>

      {/* INVESTMENT THESIS */}
      <Card title="Investment Thesis">

        {/* VIEW MODE */}
        {!editingThesis && (
          <div
            className="rounded-2xl border-2 border-dashed p-6 space-y-3
                       cursor-pointer transition hover:bg-[#F5F1E3]"
            style={{ borderColor: "#9EC6DC" }}
            onClick={() => setEditingThesis(true)}
          >
            <p className="text-sm font-medium text-[#2B3443]">
              Add your investment thesis
            </p>

            <p className="text-sm leading-relaxed text-[#3F5D7D]">
              Explain why your startup is a compelling investment opportunity.
              Highlight your vision, market opportunity, and growth strategy.
            </p>

            <span className="text-sm font-medium text-[#EF6C4E]">
              + Add investment thesis
            </span>
          </div>
        )}

        
