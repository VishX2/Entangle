import {
  User,
  Mail,
  MapPin,
  Building2,
  Briefcase,
  Plus,
  X,
  Save,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

export default function EditEntrepreneurProfile() {
  const [industries, setIndustries] = useState([
    "AI/ML",
    "FinTech",
    "HealthTech",
    "SaaS",
  ]);
  const [newIndustry, setNewIndustry] = useState("");

  const addIndustry = () => {
    if (newIndustry.trim()) {
      setIndustries([...industries, newIndustry.trim()]);
      setNewIndustry("");
    }
  };

  const removeIndustry = (index) => {
    setIndustries(industries.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br
                    from-[#F7F3E6] via-[#F7F3E6] to-[#EDE7D9]
                    p-10 space-y-20">

      {/*  HEADER  */}
      <div className="relative bg-white rounded-[36px] p-10
                      border border-[#3F5C7D]/40
                      shadow-sm transition
                      hover:shadow-2xl hover:-translate-y-1">

        {/* Top gradient bar */}
        <div className="absolute inset-x-0 top-0 h-1.5
                        bg-gradient-to-r from-[#0F172A]
                        via-[#3F5C7D]
                        to-[#F97316]
                        rounded-t-[36px]" />

        <div className="flex justify-between items-center">
          <div className="flex gap-5 items-center">
            <button className="p-3 rounded-xl
                               bg-gradient-to-br
                               from-[#E5E7EB] to-[#DDE3EA]
                               hover:from-[#F7F3E6] hover:to-[#E5E7EB]
                               transition shadow-sm">
              <ArrowLeft size={18} className="text-[#0F172A]" />
            </button>

            <div>
              <h1 className="text-4xl font-bold text-[#0F172A]">
                Edit Profile
              </h1>
              <p className="text-[#64748B] mt-1">
                Make your profile irresistible to investors
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2
                             bg-gradient-to-r
                             from-[#F97316] via-[#F59E0B] to-[#F97316]
                             text-white px-7 py-3 rounded-xl
                             shadow-md transition
                             hover:shadow-xl hover:-translate-y-0.5">
            <Save size={16} />
            Save Changes
          </button>
        </div>