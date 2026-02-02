import {
  Eye,
  Heart,
  MessageSquare,
  Plus,
  Upload,
  BarChart3,
  Edit3,
  Star,
  CheckCircle,
  Users,
} from "lucide-react";

export default function EntrepreneurDashboard() {
  const data = {
    name: "Jordan",
    profileStrength: 75,
    views: 247,
    interest: 12,
    messages: 8,
    unread: 4,
    activity: [
      {
        id: 1,
        title: "New investor interest",
        description: "Sequoia Capital viewed your pitch deck",
        time: "2h ago",
        icon: Star,
      },
      {
        id: 2,
        title: "Connection accepted",
        description: "You are now connected with Angel Network",
        time: "4h ago",
        icon: CheckCircle,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F7F3E6] p-10 space-y-16">

      {/* HEADER */}
      <div className="bg-white rounded-[32px] p-8
                      border border-[#3F5C7D]/40
                      shadow-sm transition
                      hover:shadow-lg hover:-translate-y-1">
        <div className="absolute inset-x-0 top-0 h-1
                        bg-gradient-to-r from-[#0F172A] via-[#3F5C7D] to-[#F97316]
                        rounded-t-[32px]" />

        <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">
          Entrepreneur Dashboard
        </h1>
        <p className="text-[#64748B] mt-1">
          Here’s what’s happening with your startup today
        </p>
      </div>

      {/* PROFILE STRENGTH */}
      <div className="bg-white rounded-3xl p-8
                      border border-[#3F5C7D]/40
                      shadow-sm transition
                      hover:shadow-lg hover:-translate-y-1
                      space-y-4">

        <div className="flex justify-between items-center">
          <p className="font-semibold text-[#0F172A]">
            Profile Strength
          </p>
          <span className="px-3 py-1 rounded-full text-sm font-semibold
                           bg-[#F97316]/10 text-[#F97316]">
            {data.profileStrength}%
          </span>
        </div>

        <div className="w-full bg-[#E5E7EB] rounded-full h-2 overflow-hidden">
          <div
            className="h-2 rounded-full
                       bg-gradient-to-r from-[#F97316] to-[#F59E0B]
                       transition-all duration-700"
            style={{ width: `${data.profileStrength}%` }}
          />
        </div>

        <p className="text-sm text-[#64748B]">
          Complete your profile to increase visibility to investors
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <ActionButton icon={Users} label="Add Team Members" primary />
          <ActionButton icon={Upload} label="Upload Pitch Deck" />
        </div>
      </div>

       
      {/*  METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <MetricCard icon={Eye} title="Profile Views" value={data.views} />
        <MetricCard icon={Heart} title="Investor Interest" value={data.interest} />
        <MetricCard
          icon={MessageSquare}
          title="Messages"
          value={data.messages}
          subtitle={`${data.unread} unread`}
        />
      </div>

      {/*  QUICK ACTIONS */}
      <div className="bg-white rounded-3xl p-8
                      border border-[#3F5C7D]/40
                      shadow-sm transition
                      hover:shadow-lg hover:-translate-y-1">
        <p className="font-semibold text-[#0F172A] mb-6">
          Quick Actions
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <PrimaryAction icon={Plus} label="Create Post" />
          <SecondaryAction icon={Upload} label="Upload Pitch Deck" />
          <SecondaryAction icon={BarChart3} label="View Analytics" />
          <SecondaryAction icon={Edit3} label="Edit Profile" />
        </div>
      </div>

      {/*  RECENT ACTIVITY */}
      <div className="bg-white rounded-3xl p-8
                      border border-[#3F5C7D]/40
                      shadow-sm transition
                      hover:shadow-lg hover:-translate-y-1">
        <p className="font-semibold text-[#0F172A] mb-6">
          Recent Activity
        </p>

        <ul className="space-y-5">
          {data.activity.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center
                         p-4 rounded-2xl
                         border border-[#3F5C7D]/30
                         transition
                         hover:border-[#F97316]
                         hover:bg-[#F7F3E6]"
            >
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl
                                bg-gradient-to-br from-[#9EC7DD] to-[#E5E7EB]
                                border border-[#3F5C7D]/40
                                flex items-center justify-center
                                transition hover:bg-[#0F172A]">
                  <item.icon
                    size={20}
                    className="text-[#0F172A] transition hover:text-white"
                  />
                </div>
                <div>
                  <p className="font-medium text-[#0F172A]">
                    {item.title}
                  </p>
                  <p className="text-sm text-[#64748B]">
                    {item.description}
                  </p>
                </div>
              </div>
              <span className="text-xs text-[#64748B]">
                {item.time}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

/*  COMPONENTS */

function MetricCard({ icon: Icon, title, value, subtitle }) {
  return (
    <div className="bg-white rounded-2xl p-8
                    border border-[#3F5C7D]/40
                    shadow-sm transition
                    hover:shadow-lg hover:-translate-y-1
                    flex justify-between items-center">
      <div>
        <p className="text-sm text-[#64748B]">{title}</p>
        <p className="text-3xl font-bold text-[#0F172A] mt-1">
          {value}
        </p>
        {subtitle && (
          <p className="text-sm text-[#F97316] mt-1">
            {subtitle}
          </p>
        )}
      </div>

      <div className="w-12 h-12 rounded-xl
                      bg-gradient-to-br from-[#9EC7DD] to-[#E5E7EB]
                      border border-[#3F5C7D]/40
                      flex items-center justify-center
                      transition hover:bg-[#0F172A]">
        <Icon
          size={20}
          className="text-[#0F172A] transition hover:text-white"
        />
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, label, primary }) {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-lg
        text-sm font-medium transition
        ${
          primary
            ? "bg-[#0F172A] text-white hover:shadow-lg hover:-translate-y-0.5"
            : "border border-[#E5E7EB] text-[#0F172A] hover:bg-[#F7F3E6]"
        }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}

function PrimaryAction({ icon: Icon, label }) {
  return (
    <button className="flex items-center justify-center gap-2
                       bg-[#F97316] text-white
                       py-4 rounded-xl font-medium
                       shadow-md transition
                       hover:bg-[#0F172A]
                       hover:shadow-xl hover:-translate-y-0.5">
      <Icon size={18} />
      {label}
    </button>
  );
}

function SecondaryAction({ icon: Icon, label }) {
  return (
    <button className="flex items-center justify-center gap-2
                       py-4 rounded-xl font-medium
                       border border-[#3F5C7D]/40
                       text-[#0F172A]
                       bg-white transition
                       hover:border-[#F97316]
                       hover:bg-[#F7F3E6]">
      <Icon size={18} />
      {label}
    </button>
  );
}

