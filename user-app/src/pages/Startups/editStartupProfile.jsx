import { useState, useRef } from "react";
import {
  Shield,
  Check,
  Users,
  Plus,
  Sparkles,
  Settings,
} from "lucide-react";

export default function EditStartupProfile() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          <StartupProfileHeader />
          <StartupVerification />
          <StartupTeam />
          <StartupAbout />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <StartupAiInsights />
          <StartupPrivacy />
        </div>

      </div>
    </div>
  );
}






/* HEADER (Cover + Logo) */

function StartupProfileHeader() {
  const defaultLogo =
    "https://via.placeholder.com/200x200.png?text=Startup+Logo";

  const defaultCover =
    "https://images.unsplash.com/photo-1551434678-e076c223a692";

  const [logo, setLogo] = useState(defaultLogo);
  const [cover, setCover] = useState(defaultCover);
  const [bio, setBio] = useState(
    "AI-powered SaaS platform helping startups connect with investors."
  );

  const logoRef = useRef(null);
  const coverRef = useRef(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) setCover(URL.createObjectURL(file));
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow">

      {/* COVER IMAGE */}
      <div
        className="h-52 bg-cover bg-center relative cursor-pointer group"
        style={{ backgroundImage: `url(${cover})` }}
        onClick={() => coverRef.current.click()}
      >
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            Change Cover
          </span>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={coverRef}
          onChange={handleCoverChange}
          className="hidden"
        />
      </div>

      <div className="relative px-8 pb-6">

        {/* LOGO */}
        <div
          className="-mt-16 relative w-32 h-32 rounded-3xl border-4 border-white shadow-xl overflow-hidden cursor-pointer group"
          onClick={() => logoRef.current.click()}
        >
          <img
            src={logo}
            alt="Startup Logo"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-medium">
            Edit Logo
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={logoRef}
          onChange={handleLogoChange}
          className="hidden"
        />

        {/* ACTION BUTTONS */}
        <div className="absolute right-8 top-6 flex gap-3">
          <button className="px-4 py-2 bg-slate-100 rounded-xl text-sm hover:bg-slate-200 transition">
            Preview
          </button>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-xl text-sm hover:bg-orange-600 transition">
            Save Changes
          </button>
        </div>

        {/* INFO */}
        <div className="mt-5">
          <h2 className="text-2xl font-semibold text-slate-900">
            Entangle AI
          </h2>

          <div className="flex flex-wrap gap-3 text-sm text-slate-500 mt-2">
            <span className="bg-slate-100 px-3 py-1 rounded-lg">
              San Francisco, CA
            </span>
            <span className="bg-slate-100 px-3 py-1 rounded-lg">
              SaaS · AI
            </span>
            <span className="text-slate-400">
              Founded 2024
            </span>
          </div>

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="3"
            className="mt-4 w-full bg-slate-100 rounded-xl p-4 text-sm resize-none"
          />

          <div className="text-right text-xs text-slate-400 mt-1">
            {bio.length}/300 characters
          </div>
        </div>

      </div>
    </div>
  );
}





/* VERIFICATION */

function StartupVerification() {
  const [items, setItems] = useState([
    { label: "Company Registration", verified: true },
    { label: "Founders Identity Verified", verified: true },
    { label: "Linkedln Profile Verified", verified: true },
    { label: "Domain Verified", verified: false },
    { label: "Pitch Deck Uploaded", verified: false },
    { label: "Financial Documents Submitted", verified: false },
  ]);

  const toggleVerification = (index) => {
    const updated = [...items];
    updated[index].verified = !updated[index].verified;
    setItems(updated);
  };

  const verifiedCount = items.filter(i => i.verified).length;
  const trustScore = Math.round((verifiedCount / items.length) * 100);

  return (
    <div className="bg-white rounded-3xl p-6 shadow">

      <div className="flex items-center gap-2 mb-4">
        <Shield className="text-orange-500" size={20} />
        <h3 className="font-semibold text-slate-900">
          Verification & Trust
        </h3>
      </div>

      <div className="flex justify-between text-sm mb-2">
        <span className="text-slate-500">Trust Score</span>
        <span className="text-orange-500 font-medium">
          {trustScore}%
        </span>
      </div>

      <div className="w-full h-2 bg-slate-200 rounded-full mb-6">
        <div
          className="h-2 bg-orange-500 rounded-full transition-all"
          style={{ width: `${trustScore}%` }}
        />
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => toggleVerification(index)}
            className="w-full flex justify-between items-center bg-slate-100 hover:bg-slate-50 rounded-xl px-4 py-3 transition"
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
                Not Verified
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}





/* TEAM */

function StartupTeam() {
  const [members, setMembers] = useState([
    { name: "John Carter", role: "CEO" },
    { name: "Lisa Wong", role: "CTO" },
  ]);

  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");

  const addMember = () => {
    if (newName && newRole) {
      setMembers([...members, { name: newName, role: newRole }]);
      setNewName("");
      setNewRole("");
    }
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow">

      <div className="flex items-center gap-2 mb-6">
        <Users className="text-orange-500" size={20} />
        <h3 className="font-semibold text-slate-900">
          Team Members
        </h3>
      </div>

      <div className="space-y-3 mb-4">
        {members.map((member, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-slate-100 rounded-xl px-4 py-3"
          >
            <div>
              <div className="text-sm font-medium text-slate-900">
                {member.name}
              </div>
              <div className="text-xs text-slate-500">
                {member.role}
              </div>
            </div>

            <button
              onClick={() => removeMember(index)}
              className="text-slate-400 hover:text-red-500"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="flex-1 bg-slate-100 rounded-xl px-4 py-3 text-sm"
        />

        <input
          type="text"
          placeholder="Role"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          className="flex-1 bg-slate-100 rounded-xl px-4 py-3 text-sm"
        />

        <button
          onClick={addMember}
          className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}





/* ABOUT */

function StartupAbout() {
  const [description, setDescription] = useState("");

  return (
    <div className="bg-white rounded-3xl p-6 shadow">
      <h3 className="font-semibold text-slate-900 mb-4">
        About Startup
      </h3>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="4"
        className="w-full bg-slate-100 rounded-xl p-4 text-sm resize-none"
        placeholder="Describe your product, traction, and vision..."
      />
    </div>
  );
}





/* AI INSIGHTS */

function StartupAiInsights() {
  const completeness = 72;

  return (
    <div className="bg-white rounded-3xl p-6 shadow">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-orange-500" size={18} />
        <h3 className="font-semibold text-slate-900">
          AI Insights
        </h3>
      </div>

      <div className="flex justify-between text-sm mb-2">
        <span>Profile Completeness</span>
        <span className="text-orange-500 font-medium">
          {completeness}%
        </span>
      </div>

      <div className="w-full h-2 bg-slate-200 rounded-full mb-6">
        <div
          className="h-2 bg-orange-500 rounded-full"
          style={{ width: `${completeness}%` }}
        />
      </div>

      <button className="w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition">
        Improve with AI
      </button>
    </div>
  );
}





/* PRIVACY */

function StartupPrivacy() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="bg-white rounded-3xl p-6 shadow">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">
            Profile Visibility
          </h3>
          <p className="text-xs text-slate-500">
            Make your startup visible to investors
          </p>
        </div>

        <button
          onClick={() => setVisible(!visible)}
          className={`w-11 h-6 rounded-full relative transition ${
            visible ? "bg-orange-500" : "bg-slate-300"
          }`}
        >
          <div
            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
              visible ? "right-0.5" : "left-0.5"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
