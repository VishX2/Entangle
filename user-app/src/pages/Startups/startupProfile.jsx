import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PROFILE_DATA = {
  coverImage:
  "https://images.unsplash.com/photo-1508780709619-79562169bc64",
  avatar:
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
  name: "Elena Martinez",
  role: "FOUNDER",
  location: "San Francisco, California",
  email: "elena@martinez.vc",
  joined: "Joined 2019",
  bio:
    "Backing visionary founders building the future of work, AI, and sustainable technology.",
};

const SOCIAL_ICONS = [LinkedInIcon, XIcon, GlobeIcon, MailIcon];

const HEADER_STATS = [
  { value: "2.5K", label: "Connections" },
  { value: "12.8K", label: "Followers" },
  { value: "847", label: "Posts" },
];

const VERIFICATION_DATA = {
  trustScore: 92,
  footerText: "Fully Verified Investor",
  completionText: "4/4 complete",
  items: [
    { icon: IdIcon, label: "Identity Verified" },
    { icon: MailIcon, label: "Email Verified" },
    { icon: BadgeIcon, label: "Platform Trust Badge" },
    { icon: DocIcon, label: "License Agreement" },
  ],
};

const INVESTMENT_STATS = [
  { value: "47", label: "Total Investments" },
  { value: "23", label: "Active" },
  { value: "18", label: "Exited" },
  { value: "$125K", label: "Avg. Investment" },
];

const SUCCESS_STORIES = [
  {
    name: "TechFlow AI",
    description: "Led seed round, valued at $50M",
    growth: "+340%",
  },
  {
    name: "TechFlow AI",
    description: "Led seed round, valued at $50M",
    growth: "+340%",
  },
];

const EXPERIENCE_DATA = {
  description:
    "Seasoned investor with over 15 years of experience in technology and venture capital. Passionate about supporting innovative founders building solutions for real-world problems. Former CTO of a Fortune 500 company with deep expertise in scaling startups.",
  stats: [
    { value: "15+", label: "Years Experience" },
    { value: "50+", label: "Investments Made" },
  ],
  expertise: [
    "Mentorship",
    "Strategy",
    "Marketing",
    "Technology",
    "Operations",
  ],
  previousInvestments: [
    { name: "TechFlow AI", year: "2023", status: "Active" },
    { name: "GreenGrid Energy", year: "2022", status: "Exited" },
    { name: "HealthSync", year: "2021", status: "Active" },
    { name: "EduLearn Pro", year: "2020", status: "Exited" },
  ],
};

const REVIEW_SUMMARY = {
  rating: 4.9,
  totalReviews: "124 reviews",
  badge: "Top Rated",
  responseTitle: "Highly Responsive",
  responseTime: "Avg. response time: 2 hours",
};

const REVIEWS = [
  {
    initials: "SC",
    name: "Sarah Chen",
    company: "TechFlow AI",
    time: "2 weeks ago",
    text:
      "Incredibly responsive and provided valuable strategic guidance beyond just capital.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    initials: "MJ",
    name: "Marcus Johnson",
    company: "GreenGrid",
    time: "1 month ago",
    text:
      "Professional approach and deep industry knowledge. Highly recommend!",
    color: "bg-rose-100 text-rose-600",
  },
  {
    initials: "EW",
    name: "Emma Williams",
    company: "HealthSync",
    time: "2 months ago",
    text:
      "Great mentor, always available for quick calls when needed.",
    color: "bg-pink-100 text-pink-600",
  },
];

const NOTIFICATIONS_DATA = {
  badge: "4 new",
  items: [
    {
      title: "New Pitch Request",
      message:
        "CleanTech Innovations wants to pitch their Series A",
      time: "2 hours ago",
    },
    {
      title: "New Message",
      message:
        "Sarah Chen sent you a follow-up message",
      time: "5 hours ago",
    },
    {
      title: "Connection Request",
      message:
        "Michael Torres wants to connect",
      time: "1 day ago",
    },
    {
      title: "New Review",
      message:
        "You received a 5-star review from HealthSync",
      time: "2 days ago",
    },
  ],
};

const AI_DATA = {
  completeness: 85,
  suggestions: [
    "Add more expertise tags",
    "Update investment range",
    "Add recent exits",
  ],
  matchInsights: [
    "Strong match with AI startups",
    "Consider expanding to Series B",
    "FinTech expertise in high demand",
  ],
  privacyTitle: "Privacy Alert",
  privacyMessage:
    "Consider hiding specific investment amounts in public view.",
};

const CONNECT_ACTIONS = [
  { label: "Connect", type: "primary" },
  { label: "Pitch Startup", type: "primary" },
  { label: "Message", type: "outline" },
  { label: "Meeting", type: "disabled" },
];

/*  COMPONENT */

export default function StartupProfile() {
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState(true);
  const [messages, setMessages] = useState(true);

  return (
    <div className="min-h-screen bg-[#f3f4f6] px-8 py-8">
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* HEADER */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition">

          <div
            className="h-56 bg-cover bg-center"
            style={{ backgroundImage: `url(${PROFILE_DATA.coverImage})` }}
          />

          <div className="px-10 pb-10">

            <div className="-mt-24 relative w-fit group">
              <img
                src={PROFILE_DATA.avatar}
                className="w-44 h-44 rounded-full border-4 border-white object-cover shadow-md group-hover:scale-105 transition"
              />
              <div className="absolute bottom-5 right-5 bg-blue-500 p-2 rounded-full shadow">
                <CheckIcon />
              </div>
            </div>

            <div className="mt-6 flex justify-between flex-wrap gap-8">

              <div>
                <div className="flex items-center gap-4 flex-wrap">
                  <h1 className="text-3xl font-semibold text-slate-900">
                    {PROFILE_DATA.name}
                  </h1>

                  <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-medium">
                    {PROFILE_DATA.role}
                  </span>
                </div>

                <div className="mt-2 text-sm text-slate-500 flex gap-5 flex-wrap">
                  <span>{PROFILE_DATA.location}</span>
                  <span>{PROFILE_DATA.email}</span>
                  <span>{PROFILE_DATA.joined}</span>
                </div>

                <p className="mt-4 text-sm text-slate-600 max-w-2xl">
                  {PROFILE_DATA.bio}
                </p>

                {/* SOCIAL MEDIA */}
                <div className="flex gap-3 mt-5">
                  {SOCIAL_ICONS.map((Icon, index) => (
                    <SocialIcon key={index}>
                      <Icon />
                    </SocialIcon>
                  ))}
                </div>

                <div className="flex gap-14 mt-7 text-sm">
                  {HEADER_STATS.map((stat) => (
                    <Stat key={stat.label} {...stat} />
                  ))}
                </div>
              </div>

              <div className="flex gap-2 items-start">
                <button
                  onClick={() => navigate("/startup/editProfile")}
                  className="bg-slate-900 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-slate-800 transition"
                >
                  Edit Profile
                </button>

                <button className="border border-slate-300 px-4 py-1.5 rounded-lg text-xs hover:bg-slate-100 transition">
                  Public Profile
                </button>

                <button className="bg-orange-500 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-orange-600 transition">
                  AI Suggestions
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="xl:col-span-2 space-y-8">

            {/* Verification */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100">

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <ShieldIcon />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Verification & Trust
                  </h3>
                </div>

                <div className="text-sm text-slate-500">
                  Trust Score{" "}
                  <span className="text-blue-600 font-semibold ml-1">
                    {VERIFICATION_DATA.trustScore}%
                  </span>
                </div>
              </div>

              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-5">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{ width: `${VERIFICATION_DATA.trustScore}%` }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {VERIFICATION_DATA.items.map((item) => (
                  <VerifyItem
                    key={item.label}
                    icon={<item.icon />}
                    label={item.label}
                  />
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-blue-600">
                  <CheckCircleIcon />
                  {VERIFICATION_DATA.footerText}
                </div>
                <div className="text-slate-400 text-xs">
                  {VERIFICATION_DATA.completionText}
                </div>
              </div>
            </div>

            {/* Investment History */}
            <Card title="Investment History">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {INVESTMENT_STATS.map((stat) => (
                  <StatBox key={stat.label} {...stat} />
                ))}
              </div>

              <h3 className="text-sm font-medium mb-4">Success Stories</h3>

              {SUCCESS_STORIES.map((story, i) => (
                <Success key={i} {...story} />
              ))}
            </Card>

            {/* Background & Experience */}
            <Card
              title={
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center">
                    <DocIcon />
                  </div>
                  <span>Background & Experience</span>
                </div>
              }
            >
              <div className="bg-slate-50 rounded-xl p-6 text-sm text-slate-600 leading-relaxed">
                {EXPERIENCE_DATA.description}
              </div>

              <div className="bg-orange-50 rounded-xl p-6 flex gap-12 mt-6">
                {EXPERIENCE_DATA.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-orange-600">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">
                  Areas of Expertise
                </h4>
                <div className="flex flex-wrap gap-3">
                  {EXPERIENCE_DATA.expertise.map((tag) => (
                    <span
                      key={tag}
                      className="bg-slate-100 text-sm px-4 py-2 rounded-full hover:bg-orange-100 transition"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-4">
                  Previous Investments
                </h4>

                {EXPERIENCE_DATA.previousInvestments.map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between items-center bg-slate-50 rounded-xl p-4 mb-3 hover:bg-orange-50 transition"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {item.year}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        item.status === "Active"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* RATINGS & FEEDBACK */}
            <Card
              title={
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-yellow-50 flex items-center justify-center">
                    <StarIcon />
                  </div>
                  <span>Ratings & Feedback</span>
                </div>
              }
              right={
                <button className="text-sm text-slate-400 hover:text-slate-600 flex items-center gap-1 transition">
                  View All
                  <ChevronRightIcon />
                </button>
              }
            >
              <div className="bg-[#fdf6dc] rounded-xl p-6 flex justify-between items-center mb-6">
                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-4xl font-bold text-yellow-500">
                      {REVIEW_SUMMARY.rating}
                    </div>
                    <Stars count={5} />
                    <p className="text-xs text-slate-400 mt-1">
                      {REVIEW_SUMMARY.totalReviews}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                      <ClockIcon />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {REVIEW_SUMMARY.responseTitle}
                      </p>
                      <p className="text-xs text-slate-500">
                        {REVIEW_SUMMARY.responseTime}
                      </p>
                    </div>
                  </div>
                </div>

                <span className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
                  {REVIEW_SUMMARY.badge}
                </span>
              </div>

              {REVIEWS.map((review, i) => (
                <ReviewCard key={i} {...review} />
              ))}
            </Card>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8">

            {/* CONNECT */}
            <Card>
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-slate-900">
                  Connect & Interact
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-4">
                {CONNECT_ACTIONS.map((action, i) => (
                  <button
                    key={i}
                    className={
                      action.type === "primary"
                        ? "bg-orange-500 text-white py-2 rounded-3xl text-sm font-semibold hover:bg-orange-600 transition shadow-sm"
                        : action.type === "outline"
                        ? "border-2 border-slate-300 text-slate-700 py-2 rounded-3xl text-sm font-semibold hover:bg-slate-100 transition"
                        : "bg-slate-200 text-slate-400 py-1 rounded-3xl text-sm font-semibold cursor-not-allowed"
                    }
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </Card>

            {/* AI TOOLS */}
            <Card
              title={
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                    ✨
                  </div>
                  <span>AI Tools & Insights</span>
                </div>
              }
            >
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Profile Completeness</span>
                  <span className="text-orange-500 font-semibold">
                    {AI_DATA.completeness}%
                  </span>
                </div>
                <ProgressBar percent={AI_DATA.completeness} />

                <ul className="mt-4 text-sm text-slate-600 space-y-2">
                  {AI_DATA.suggestions.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 text-sm mb-4">
                <p className="font-medium mb-2">AI Match Insights</p>
                <ul className="space-y-2 text-slate-600">
                  {AI_DATA.matchInsights.map((item, i) => (
                    <li key={i}>✔ {item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-orange-50 text-sm p-4 rounded-xl mb-4">
                <p className="font-medium text-orange-600">
                  {AI_DATA.privacyTitle}
                </p>
                <p className="text-slate-600 mt-1">
                  {AI_DATA.privacyMessage}
                </p>
              </div>

              <button className="w-full bg-orange-500 text-white py-3 rounded-xl mb-3 hover:bg-orange-600 transition">
                Run AI Profile Check →
              </button>

              <button className="w-full border border-slate-300 py-3 rounded-xl hover:bg-slate-100 transition">
                Improve My Profile with AI
              </button>
            </Card>

            {/* NOTIFICATIONS */}
            <Card
              title={
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                      <BellIcon />
                    </div>
                    <span className="text-sm font-semibold text-slate-800">
                      Notifications
                    </span>
                  </div>

                  <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                    {NOTIFICATIONS_DATA.badge}
                  </span>
                </div>
              }
            >
              <div className="space-y-4">
                {NOTIFICATIONS_DATA.items.map((item, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 rounded-xl p-4 hover:bg-orange-50 transition cursor-pointer"
                  >
                    <p className="text-sm font-medium text-slate-800">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {item.message}
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      {item.time}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 text-center">
                <button className="text-sm text-slate-500 hover:text-slate-700 transition">
                  View All Notifications →
                </button>
              </div>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function Card({ title, right, children }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
      {(title || right) && (
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm font-semibold text-slate-800">
            {title}
          </div>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="font-semibold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}

function StatBox({ value, label }) {
  return (
    <div className="bg-slate-100 rounded-xl p-6 text-center hover:shadow-md transition">
      <div className="text-xl font-semibold">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}

function ProgressBar({ percent }) {
  return (
    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-orange-500 rounded-full transition-all duration-700"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

function Success({ name, description, growth }) {
  return (
    <div className="bg-orange-50 rounded-xl p-5 flex justify-between items-center mb-4 hover:shadow transition">
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <span className="bg-blue-100 text-blue-600 px-3 py-1 text-xs rounded-full">
        {growth}
      </span>
    </div>
  );
}

function ReviewCard({ initials, name, company, time, text, color }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 mb-3 hover:bg-slate-100 transition">
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-3">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold ${color}`}
          >
            {initials}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">
              {name}
              <span className="text-xs text-slate-400 ml-1">
                from {company}
              </span>
            </p>
            <Stars count={5} small />
          </div>
        </div>
        <span className="text-xs text-slate-400">{time}</span>
      </div>
      <p className="text-sm text-slate-600">{text}</p>
    </div>
  );
}

function VerifyItem({ icon, label }) {
  return (
    <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 hover:bg-blue-50 transition">
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm">
        {icon}
      </div>
      <span className="text-sm text-slate-700 font-medium">
        {label}
      </span>
    </div>
  );
}

function SocialIcon({ children }) {
  return (
    <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-500 transition cursor-pointer">
      {children}
    </div>
  );
}

function Stars({ count, small }) {
  return (
    <div className={`flex gap-0.5 ${small ? "mt-0.5" : "mt-1"}`}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width={small ? 12 : 14}
          height={small ? 12 : 14}
          viewBox="0 0 24 24"
          fill={i < count ? "#facc15" : "none"}
          stroke="#facc15"
          strokeWidth="2"
        >
          <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
        </svg>
      ))}
    </div>
  );
}

/* ICONS */

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" fill="none" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#10b981" strokeWidth="2"/>
      <path d="M8 12l2 2 4-4" stroke="#10b981" strokeWidth="2"/>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"
        stroke="#3b82f6"
        strokeWidth="2"
        fill="#eff6ff"
      />
    </svg>
  );
}

function IdIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="8" cy="12" r="2" fill="#3b82f6"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="#3b82f6" strokeWidth="2"/>
      <path d="M3 7l9 6 9-6" stroke="#3b82f6" strokeWidth="2"/>
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="#3b82f6" strokeWidth="2"/>
      <path d="M8 14l-2 6 6-3 6 3-2-6" stroke="#3b82f6" strokeWidth="2"/>
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M6 2h9l5 5v15H6z" stroke="#3b82f6" strokeWidth="2"/>
      <path d="M14 2v6h6" stroke="#3b82f6" strokeWidth="2"/>
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#facc15">
      <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke="#94a3b8" strokeWidth="2" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#3b82f6" strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke="#3b82f6" strokeWidth="2" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7"
        stroke="#64748b"
        strokeWidth="2"
      />
      <circle cx="12" cy="20" r="1.5" fill="#64748b" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 3a2 2 0 100 4 2 2 0 000-4zM3 8h2v13H3zM8 8h2v2h.03c.28-.53.97-1.09 2-1.09 2.14 0 2.53 1.41 2.53 3.24V21h-2v-6.63c0-1.58-.03-3.62-2.2-3.62-2.2 0-2.54 1.72-2.54 3.5V21H8z"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9-8-11h6l4 6 6-6z"/>
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9"/>
      <path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18"/>
    </svg>
  );
}
