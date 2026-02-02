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

      