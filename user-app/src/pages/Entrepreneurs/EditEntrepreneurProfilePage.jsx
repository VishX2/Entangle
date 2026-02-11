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


        {/* Progress */}
        <div className="mt-8 space-y-2">
          <div className="flex justify-between text-sm font-semibold text-[#3F5C7D]">
            <span>Profile Completion</span>
            <span className="text-[#F97316]">82%</span>
          </div>
          <div className="w-full bg-[#E5E7EB] rounded-full h-2 overflow-hidden">
            <div
              className="h-2 rounded-full
                         bg-gradient-to-r
                         from-[#0F172A] via-[#3F5C7D] to-[#F97316]
                         transition-all duration-700"
              style={{ width: "82%" }}
            />
          </div>
        </div>
      </div>

      {/*  BASIC INFO  */}
      <Section title="Basic Information" icon={User} accent="blue">
        <FormGrid>
          <Input label="Full Name" placeholder="Robert Anderson" />
          <Input label="Role / Title" placeholder="Angel Investor" />
          <Input label="Company" placeholder="NorthBridge Capital Partners" />
          <Input label="Location" placeholder="San Francisco, USA" />
        </FormGrid>
      </Section>

      {/*  CONTACT INFO  */}
      <Section title="Contact Information" icon={Mail} accent="orange">
        <FormGrid>
          <Input label="Email Address" placeholder="robert@email.com" />
          <Input label="Website" placeholder="www.yourstartup.com" />
        </FormGrid>
      </Section>

      {/*  ABOUT  */}
      <Section title="About You" icon={Briefcase} accent="dark">
        <textarea
          rows={6}
          placeholder="Describe your background, investment philosophy, and what founders can expect..."
          className="w-full rounded-2xl p-5
                     border border-[#3F5C7D]/40
                     bg-white text-[#0F172A]
                     focus:outline-none focus:ring-2 focus:ring-[#F97316]/40
                     transition"
        />
      </Section>

      {/*  INDUSTRIES  */}
      <Section title="Industries & Expertise" icon={Building2} accent="orange">
        <div className="flex flex-wrap gap-3 mb-5">
          {industries.map((industry, i) => (
            <span
              key={i}
              className="flex items-center gap-2 px-5 py-2 rounded-full
                         bg-gradient-to-br
                         from-[#E5E7EB] to-[#DDE3EA]
                         text-[#0F172A] font-semibold
                         border border-[#3F5C7D]/40
                         transition
                         hover:from-[#F97316] hover:to-[#F59E0B]
                         hover:text-white hover:-translate-y-0.5
                         hover:shadow-lg"
            >
              {industry}
              <button onClick={() => removeIndustry(i)}>
                <X size={14} />
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            value={newIndustry}
            onChange={(e) => setNewIndustry(e.target.value)}
            placeholder="Add new industry"
            className="flex-1 rounded-xl p-3
                       border border-[#3F5C7D]/40
                       focus:outline-none focus:ring-2 focus:ring-[#F97316]/40"
          />
          <button
            onClick={addIndustry}
            className="px-5 rounded-xl
                       bg-gradient-to-br from-[#0F172A] to-[#3F5C7D]
                       text-white transition shadow-md
                       hover:from-[#F97316] hover:to-[#F59E0B]">
            <Plus size={18} />
          </button>
        </div>
      </Section>


      {/*  ACTION BAR  */}
      <div className="sticky bottom-6 bg-white rounded-3xl p-6
                      border border-[#3F5C7D]/40
                      shadow-2xl
                      flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-[#3F5C7D]">
          <CheckCircle size={16} className="text-[#F97316]" />
          All changes saved automatically
        </div>

        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-xl
                             border border-[#3F5C7D]/40
                             text-[#0F172A]
                             hover:bg-[#F7F3E6]
                             transition">
            Cancel
          </button>

          <button className="flex items-center gap-2
                             px-7 py-3 rounded-xl
                             bg-gradient-to-r from-[#F97316] to-[#F59E0B]
                             text-white shadow-lg transition
                             hover:shadow-xl hover:-translate-y-0.5">
            <Save size={16} />
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

/*  REUSABLE  */

function Section({ title, icon: Icon, children, accent }) {
  const accentMap = {
    blue: "bg-[#3F5C7D]",
    orange: "bg-[#F97316]",
    dark: "bg-[#0F172A]",
  };

  return (
    <div className="relative bg-white rounded-3xl p-10 space-y-6
                    border border-[#3F5C7D]/40
                    shadow-sm transition
                    hover:shadow-2xl hover:-translate-y-1">
      <div className={`absolute left-0 top-10 w-1 h-12 ${accentMap[accent]} rounded-r`} />

      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl
                        bg-gradient-to-br from-[#9EC7DD] to-[#E5E7EB]
                        border border-[#3F5C7D]/40
                        flex items-center justify-center">
          <Icon size={18} className="text-[#0F172A]" />
        </div>
        <h2 className="text-2xl font-bold text-[#0F172A]">
          {title}
        </h2>
      </div>

      {children}
    </div>
  );
}

function FormGrid({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {children}
    </div>
  );
}

function Input({ label, placeholder }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-[#0F172A]">
        {label}
      </label>
      <input
        placeholder={placeholder}
        className="w-full rounded-xl p-3
                   border border-[#3F5C7D]/40
                   bg-white
                   focus:outline-none focus:ring-2 focus:ring-[#F97316]/40
                   transition"
      />
    </div>
  );
}
