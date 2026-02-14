import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditStartupProfile() {
 const navigate = useNavigate();

 const [bio, setBio] = useState(
 "Serial entrepreneur turned angel investor with 15+ years in tech. Passionate about backing visionary founders building transformative companies in fintech, AI, and climate tech."
 );

 const [settings, setSettings] = useState({
 profileVisibility: true,
 hideAmounts: false,
 allowMessages: true,
 acceptPitches: true,
 });

 const toggle = (key) =>
 setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

 return (
 <div className="min-h-screen bg-[#f3f4f6] px-8 py-8">
 <div className="max-w-[1400px] mx-auto space-y-8">

 {/* HEADER */}

 <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

 <div
 className="h-64 bg-cover bg-center"
 style={{
 backgroundImage:
 "url(https://images.unsplash.com/photo-1508780709619-79562169bc64)",
 }}
 />

 <div className="px-10 pb-10 -mt-16 relative">

 <div className="flex justify-between items-start flex-wrap gap-6">

 {/* Avatar */}
 <div className="relative">
 <img
 src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
 className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
 alt=""
 />

 <button className="absolute bottom-2 right-2 bg-orange-500 w-9 h-9 rounded-full flex items-center justify-center shadow hover:bg-orange-600 transition">
 ✎
 </button>
 </div>

 {/* Action Buttons */}
 <div className="flex gap-4 mt-8">
 <button className="px-6 py-2 rounded-full bg-slate-200 text-sm font-medium hover:bg-slate-300 transition">
 AI Suggestions
 </button>

 <button className="px-6 py-2 rounded-full bg-slate-200 text-sm font-medium hover:bg-slate-300 transition">
 Public Profile
 </button>

 <button className="px-6 py-2 rounded-full bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition">
 Save Changes
 </button>
 </div>
 </div>

 {/* Name + Badges */}
 <div className="mt-6">
 <div className="flex items-center gap-4 flex-wrap">
 <h1 className="text-2xl font-semibold text-slate-900">
 Marcus Reynolds
 </h1>

 <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
 Angel Investor
 </span>

 <span className="text-xs bg-slate-200 text-slate-600 px-3 py-1 rounded-full">
 Verified
 </span>
 </div>

 {/* Info Pills */}
 <div className="mt-4 flex gap-4 flex-wrap">
 <Pill>San Francisco, CA</Pill>
 <Pill>marcus@entangle.vc</Pill>
 <Pill>Joined 2019</Pill>
 </div>
 </div>

 {/* Bio */}
 <div className="mt-6">
 <textarea
 value={bio}
 onChange={(e) => setBio(e.target.value)}
 maxLength={300}
 rows="4"
 className="w-full border border-slate-300 rounded-2xl p-5 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
 />
 <p className="text-xs text-slate-400 text-right mt-2">
 {bio.length}/300 characters
 </p>
 </div>
 </div>
 </div>

 {/* GRID */}

 <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

 {/* LEFT COLUMN */}
 <div className="xl:col-span-2 space-y-8">

 <VerificationSection />
 <InvestmentPreferencesSection />
 <BackgroundSection />
 <InvestmentHistorySection />
 <RatingsSection />

 </div>

 {/* RIGHT COLUMN */}
 <div className="space-y-8">
 <ConnectInteractCard />
 <AIToolsCard />
 <NotificationsCard />
 <PrivacySettingsCard settings={settings} toggle={toggle} />

 </div>
 </div>
 </div>
 </div>
 );
}

// REUSABLE COMPONENTS

function Card({ children }) {
 return (
 <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
 {children}
 </div>
 );
}

function Pill({ children }) {
 return (
 <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-sm">
 {children}
 </span>
 );
}

// VERIFICATION – PREMIUM VERSION

function VerificationSection() {
 const items = [
 {
 label: "Identity Verified",
 color: "bg-green-100 text-green-600",
 },
 {
 label: "Email Verified",
 color: "bg-blue-100 text-blue-600",
 },
 {
 label: "LinkedIn Verified",
 color: "bg-indigo-100 text-indigo-600",
 },
 {
 label: "Platform Trust Badge",
 color: "bg-purple-100 text-purple-600",
 },
 {
 label: "License Agreement",
 color: "bg-orange-100 text-orange-600",
 },
 ];

 return (
 <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-sm p-8 space-y-6 border border-slate-100">

 {/* Header */}
 <div className="flex justify-between items-center">
 <div>
 <h3 className="text-lg font-semibold text-slate-900">
 Verification & Trust
 </h3>
 <p className="text-sm text-slate-500">
 Verified investor credibility status
 </p>
 </div>

 <div className="text-right">
 <p className="text-sm text-slate-500">Trust Score</p>
 <p className="text-2xl font-bold text-orange-500">100%</p>
 </div>
 </div>

 {/* Progress Bar */}
 <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden">
 <div className="absolute h-full w-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full animate-pulse" />
 </div>

 {/* Verified Badge */}
 <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-lg">
 ✔
 </div>
 <div>
 <p className="text-sm font-medium text-green-700">
 Fully Verified Investor
 </p>
 <p className="text-xs text-green-600">
 All required verifications completed
 </p>
 </div>
 </div>

 <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
 Trusted
 </span>
 </div>

 {/* Items */}
 <div className="space-y-4">
 {items.map((item) => (
 <div
 key={item.label}
 className="flex justify-between items-center bg-white hover:shadow-md transition rounded-xl p-4 border border-slate-100"
 >
 <div className="flex items-center gap-4">
 <div
 className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${item.color}`}
 >
 {item.icon}
 </div>
 <span className="text-sm font-medium text-slate-700">
 {item.label}
 </span>
 </div>

 <div className="flex items-center gap-2">
 <span className="text-green-500 font-semibold text-sm">
 Verified
 </span>
 <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">
 ✓
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 );
}

// INVESTMENT PREFERENCES

function InvestmentPreferencesSection() {
 return (
 <Card>
 <h3 className="text-lg font-semibold">Investment Preferences</h3>

 <TagGroup
 label="Preferred Industries"
 tags={["FinTech", "AI/ML", "Climate Tech", "SaaS"]}
 />

 <TagGroup
 label="Investment Stages"
 tags={["Seed", "Series A"]}
 />

 <div>
 <p className="text-sm font-medium mb-2">Investment Range</p>
 <input type="range" className="w-full accent-orange-500" />
 </div>
 </Card>
 );
}

function TagGroup({ label, tags }) {
 return (
 <div>
 <p className="text-sm font-medium mb-3">{label}</p>
 <div className="flex flex-wrap gap-3">
 {tags.map((tag) => (
 <span
 key={tag}
 className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm"
 >
 {tag} ✕
 </span>
 ))}
 <button className="bg-slate-200 px-4 py-2 rounded-full text-sm">
 + Add
 </button>
 </div>
 </div>
 );
}

// BACKGROUND & EXPERIENCE – MATCHING YOUR UI

function BackgroundSection() {
 const [summary, setSummary] = useState(
 "Former CTO at TechVenture Inc. with a successful exit in 2018. Built and scaled engineering teams across multiple startups. Deep expertise in enterprise SaaS, payment infrastructure, and AI applications."
 );

 const [expertise, setExpertise] = useState([
 "Product Strategy",
 "Technical Due Diligence",
 "GTM Strategy",
 "Fundraising",
 ]);

 const [newExpertise, setNewExpertise] = useState("");

 const [investments, setInvestments] = useState([
 { name: "TechFlow AI", status: "Active" },
 { name: "PaymentHub", status: "Exited" },
 { name: "GreenEnergy Solutions", status: "Active" },
 { name: "DataSync Pro", status: "Active" },
 ]);

 const addExpertise = () => {
 if (newExpertise.trim() === "") return;
 setExpertise([...expertise, newExpertise]);
 setNewExpertise("");
 };

 const removeExpertise = (item) => {
 setExpertise(expertise.filter((e) => e !== item));
 };

 const removeInvestment = (name) => {
 setInvestments(investments.filter((i) => i.name !== name));
 };

 return (
 <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6 border border-slate-100">

 {/* HEADER */}
 <div className="flex items-center gap-3">
 
 <h3 className="text-lg font-semibold text-slate-900">
 Background & Experience
 </h3>
 </div>

 {/* EXPERIENCE SUMMARY */}
 <div>
 <p className="text-sm font-medium text-slate-700 mb-2">
 Experience Summary
 </p>

 <textarea
 value={summary}
 onChange={(e) => setSummary(e.target.value)}
 maxLength={500}
 rows={4}
 className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
 />

 <p className="text-xs text-slate-400 text-right mt-1">
 {summary.length}/500
 </p>
 </div>

 {/* YEARS + INVESTMENTS */}

 <div className="grid md:grid-cols-2 gap-6">
 <div>
 <p className="text-sm font-medium mb-2">Years of Experience</p>
 <input
 type="number"
 defaultValue={15}
 className="w-full bg-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none"
 />
 </div>

 <div>
 <p className="text-sm font-medium mb-2">Investments Made</p>
 <input
 type="number"
 defaultValue={42}
 className="w-full bg-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none"
 />
 </div>
 </div>

 {/* AREAS OF EXPERTISE */}
 <div>
 <p className="text-sm font-medium mb-3">Areas of Expertise</p>

 <div className="flex flex-wrap gap-3 mb-4">
 {expertise.map((item) => (
 <span
 key={item}
 className="bg-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm flex items-center gap-2"
 >
 {item}
 <button
 onClick={() => removeExpertise(item)}
 className="text-slate-500 hover:text-red-500"
 >
 ×
 </button>
 </span>
 ))}
 </div>

 <div className="flex gap-3">
 <input
 value={newExpertise}
 onChange={(e) => setNewExpertise(e.target.value)}
 placeholder="Add expertise..."
 className="flex-1 bg-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none"
 />

 <button
 onClick={addExpertise}
 className="w-12 bg-slate-200 rounded-xl text-lg hover:bg-orange-500 hover:text-white transition"
 >
 +
 </button>
 </div>
 </div>

 {/* PREVIOUS INVESTMENTS */}
 <div>
 <p className="text-sm font-medium mb-3">Previous Investments</p>

 <div className="space-y-3">
 {investments.map((item) => (
 <div
 key={item.name}
 className="bg-slate-100 rounded-xl px-4 py-3 flex justify-between items-center"
 >
 <span className="text-sm text-slate-700">
 {item.name}
 </span>

 <div className="flex items-center gap-4">
 <select
 defaultValue={item.status}
 className="bg-transparent text-sm focus:outline-none"
 >
 <option>Active</option>
 <option>Exited</option>
 </select>

 <button
 onClick={() => removeInvestment(item.name)}
 className="text-slate-400 hover:text-red-500"
 >
 ×
 </button>
 </div>
 </div>
 ))}

 {/* Add investment row */}

 <div className="flex gap-3 mt-3">
 <input
 placeholder="Add investment..."
 className="flex-1 bg-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none"
 />

 <button className="w-12 bg-slate-200 rounded-xl text-lg hover:bg-orange-500 hover:text-white transition">
 +
 </button>
 </div>
 </div>
 </div>

 </div>
 );
}

// INVESTMENT HISTORY

function InvestmentHistorySection() {
 return (
 <Card>
 <h3 className="text-lg font-semibold">Investment History</h3>

 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
 <StatCard value="$4.2M" label="Total Invested" />
 <StatCard value="12" label="Active Deals" />
 <StatCard value="8" label="Exits" />
 <StatCard value="3.2x" label="Avg ROI" />
 </div>
 </Card>
 );
}

function StatCard({ value, label }) {
 return (
 <div className="bg-slate-100 rounded-2xl p-6 text-center">
 <p className="text-lg font-bold">{value}</p>
 <p className="text-xs text-slate-500">{label}</p>
 </div>
 );
}

// RATINGS & FEEDBACK – MATCHING YOUR DESIGN

function RatingsSection() {
 const [visible, setVisible] = useState(true);

 const reviews = [
 {
 name: "Sarah Chen",
 company: "TechFlow AI",
 rating: 5,
 time: "2 months ago",
 text: "Marcus provided invaluable guidance during our Series A. His network and strategic advice were game-changers.",
 },
 {
 name: "James Wilson",
 company: "GreenEnergy Solutions",
 rating: 5,
 time: "4 months ago",
 text: "Incredibly responsive investor who truly understands the climate tech space. Highly recommend.",
 },
 {
 name: "Elena Rodriguez",
 company: "HealthSync",
 rating: 4,
 time: "6 months ago",
 text: "Very supportive during early growth stages. Helped us refine our go-to-market strategy.",
 },
 ];

 return (
 <div className="bg-white rounded-2xl shadow-sm p-8 border border-slate-100">

 {/* HEADER */}
 <div className="flex justify-between items-center mb-6">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
 
 </div>
 <h3 className="text-lg font-semibold text-slate-900">
 Ratings & Feedback
 </h3>
 </div>

 {/* Toggle */}
 <div className="flex items-center gap-3">
 <span className="text-sm text-slate-500">
 Visible to public
 </span>
 <div
 onClick={() => setVisible(!visible)}
 className={`w-12 h-6 rounded-full cursor-pointer p-1 transition ${
 visible ? "bg-orange-500" : "bg-slate-300"
 }`}
 >
 <div
 className={`w-4 h-4 bg-white rounded-full transition ${
 visible ? "translate-x-6" : ""
 }`}
 />
 </div>
 </div>
 </div>

 {/* RATING SUMMARY */}
 <div className="bg-slate-100 rounded-2xl p-6 mb-6">
 <div className="flex items-center gap-4">
 <h2 className="text-4xl font-bold text-slate-900">
 4.7
 </h2>

 <div>
 <div className="flex gap-1 mb-1">
 {[...Array(5)].map((_, i) => (
 <span key={i} className="text-orange-500 text-lg">
 ★
 </span>
 ))}
 </div>
 <p className="text-sm text-slate-500">
 Based on 3 reviews
 </p>
 </div>
 </div>
 </div>

 {/* REVIEWS */}
 <div className="space-y-6">

 {reviews.map((review, index) => (
 <div key={index}>
 <div className="flex justify-between items-start mb-2">

 <div>
 <p className="font-semibold text-slate-900">
 {review.name}
 </p>
 <p className="text-sm text-slate-500">
 {review.company}
 </p>
 </div>

 <div className="text-right">
 <div className="flex gap-1 justify-end mb-1">
 {[...Array(review.rating)].map((_, i) => (
 <span key={i} className="text-orange-500 text-sm">
 ★
 </span>
 ))}
 </div>
 <p className="text-xs text-slate-400">
 {review.time}
 </p>
 </div>

 </div>

 <p className="text-sm text-slate-700 leading-relaxed">
 {review.text}
 </p>

 {/* Divider except last */}
 {index !== reviews.length - 1 && (
 <div className="border-t border-slate-200 mt-6" />
 )}
 </div>
 ))}

 </div>

 </div>
 );
}

// RIGHT SIDEBAR

// CONNECT & INTERACT

function ConnectInteractCard () {
 return (
 <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 space-y-4">

 <h3 className="text-base font-semibold text-slate-900">
 Connect & Interact
 </h3>

 {/* Connect Button */}
 <button className="w-full bg-orange-500 hover:bg-orange-600 transition text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2">
 
 Connect
 </button>

 {/* Pitch Startup */}
 <button className="w-full bg-slate-100 hover:bg-slate-200 transition text-slate-700 font-medium py-3 rounded-xl flex items-center justify-center gap-2">
 
 Pitch Startup
 </button>

 {/* Message */}
 <button className="w-full bg-slate-100 hover:bg-slate-200 transition text-slate-700 font-medium py-3 rounded-xl flex items-center justify-center gap-2">
 
 Message
 </button>

 </div>
 );
}

// AI TOOLS & INSIGHTS

function AIToolsCard () {
 const completion = 78;

 return (
 <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 space-y-6">

 {/* Header */}
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
 
 </div>
 <h3 className="text-base font-semibold text-slate-900">
 AI Tools & Insights
 </h3>
 </div>

 {/* Profile Completion */}
 <div>
 <div className="flex justify-between text-sm mb-2">
 <span className="text-slate-600">Profile Completeness</span>
 <span className="text-orange-500 font-semibold">
 {completion}%
 </span>
 </div>

 <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
 <div
 className="h-full bg-orange-500 rounded-full transition-all duration-500"
 style={{ width: `${completion}%` }}
 />
 </div>
 </div>

 {/* Suggestions */}
 <div>
 <p className="text-xs font-semibold text-slate-400 mb-3 tracking-wide">
 SUGGESTIONS
 </p>

 <div className="space-y-3">
 {[
 "Add a professional headshot",
 "Complete investment thesis",
 "Link portfolio companies",
 ].map((item) => (
 <div
 key={item}
 className="bg-slate-100 hover:bg-slate-200 transition rounded-xl px-4 py-3 flex items-center gap-3 text-sm text-slate-700"
 >
 <span className="text-green-500">✔</span>
 {item}
 </div>
 ))}
 </div>
 </div>

 {/* Buttons */}
 <button className="w-full bg-slate-400 hover:bg-slate-200 transition py-3 rounded-xl font-medium text-slate-800 flex items-center justify-center gap-2">
 Run AI Profile Check
 </button>

 <button className="w-full bg-slate-900 hover:bg-slate-800 transition py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2">
  Improve My Profile with AI
 </button>

 </div>
 );
}

// NOTIFICATIONS – MATCHING YOUR DESIGN

import {
 Bell,
 MessageSquare,
 Mail,
 Star
} from "lucide-react";

// NOTIFICATIONS – WITH REAL ICONS

function NotificationsCard() {
 const items = [
 {
 label: "Pitch Requests",
 count: 5,
 icon: <MessageSquare size={18} />,
 badgeColor: "bg-orange-500",
 },
 {
 label: "Messages",
 count: 3,
 icon: <Mail size={18} />,
 badgeColor: "bg-slate-800",
 },
 {
 label: "Reviews",
 count: 2,
 icon: <Star size={18} />,
 badgeColor: "bg-orange-500",
 },
 ];

 return (
 <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 space-y-5">

 {/* Header */}
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
 <Bell size={18} />
 </div>
 <h3 className="text-base font-semibold text-slate-900">
 Notifications
 </h3>
 </div>

 {/* Items */}
 <div className="space-y-4">
 {items.map((item) => (
 <div
 key={item.label}
 className="bg-slate-100 hover:bg-slate-200 transition rounded-xl px-4 py-4 flex items-center justify-between"
 >
 <div className="flex items-center gap-3 text-slate-700 font-medium text-sm">
 <span className="text-slate-500">
 {item.icon}
 </span>
 {item.label}
 </div>

 <div
 className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold ${item.badgeColor}`}
 >
 {item.count}
 </div>
 </div>
 ))}
 </div>
 </div>
 );
}

// PRIVACY & SETTINGS – MATCHING YOUR DESIGN

import {
 Settings,
 Eye,
 DollarSign,
 MessageCircle,
 Monitor
} from "lucide-react";

// PRIVACY & SETTINGS – WITH REAL ICONS

function PrivacySettingsCard({ settings, toggle }) {
 const options = [
 {
 key: "profileVisibility",
 title: "Profile Visibility",
 description: "Make your profile visible to all users",
 icon: <Eye size={18} />,
 },
 {
 key: "hideAmounts",
 title: "Hide Investment Amounts",
 description: "Keep your investment details private",
 icon: <DollarSign size={18} />,
 },
 {
 key: "allowMessages",
 title: "Allow Messages",
 description: "Receive direct messages from founders",
 icon: <MessageCircle size={18} />,
 },
 {
 key: "acceptPitches",
 title: "Accept Pitch Requests",
 description: "Allow startups to send you pitch decks",
 icon: <Monitor size={18} />,
 },
 ];

 return (
 <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 space-y-6">

 {/* Header */}
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
 <Settings size={18} />
 </div>
 <h3 className="text-base font-semibold text-slate-900">
 Privacy & Settings
 </h3>
 </div>

 {/* Options */}
 <div className="space-y-6">
 {options.map((option) => (
 <div
 key={option.key}
 className="flex justify-between items-center"
 >
 {/* Left */}
 <div className="flex gap-4">
 <div className="text-slate-500">
 {option.icon}
 </div>

 <div>
 <p className="text-sm font-semibold text-slate-900">
 {option.title}
 </p>
 <p className="text-xs text-slate-500">
 {option.description}
 </p>
 </div>
 </div>

 {/* Toggle */}
 <div
 onClick={() => toggle(option.key)}
 className={`w-12 h-6 rounded-full p-1 cursor-pointer transition ${
 settings[option.key]
 ? "bg-orange-500"
 : "bg-slate-300"
 }`}
 >
 <div
 className={`w-4 h-4 bg-white rounded-full transition ${
 settings[option.key] ? "translate-x-6" : ""
 }`}
 />
 </div>
 </div>
 ))}
 </div>
 </div>
 );
}


