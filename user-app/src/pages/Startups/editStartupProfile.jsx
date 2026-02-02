import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";

export default function EditStartupProfile() {
  const [form, setForm] = useState({
    name: "Your Startup",
    email: "founder@startup.com",
    location: "San Francisco, USA",
    description: "",
    stage: "Seed",
    seeking: "$250K",
    equity: "10%",
    thesis: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="min-h-screen px-10 py-8 space-y-10"
      style={{ backgroundColor: "#F5F1E3" }}
    >
      {/* HEADER */}
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-lg transition hover:bg-[#E6E0D0]"
            title="Back"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-2xl font-semibold text-[#2B3443]">
              Edit Startup Profile
            </h1>
            <p className="text-sm text-[#3F5D7D]">
              Update your public startup information
            </p>
          </div>
        </div>

        <button
          className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium
                     bg-[#EF6C4E] text-white transition hover:opacity-90"
        >
          <Save size={16} />
          Save Changes
        </button>
      </section>