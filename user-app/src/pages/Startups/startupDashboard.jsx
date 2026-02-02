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
} from "lucide-react";

export default function StartupDashboard() {
  const data = {
    name: "Your Startup",
    profileStrength: 72,
    views: 1234,
    interest: 48,
    messages: 15,
    unread: 5,
    activity: [
      {
        id: 1,
        title: "Investor viewed your profile",
        description: "TechVentures Capital checked your startup",
        time: "2h ago",
        icon: Eye,
      },
      {
        id: 2,
        title: "New investor interest",
        description: "Innovation Fund liked your pitch",
        time: "5h ago",
        icon: Star,
      },
      {
        id: 3,
        title: "Profile verified",
        description: "Your startup verification is complete",
        time: "1 day ago",
        icon: CheckCircle,
      },
    ],
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF6EE] p-8 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">
          Welcome back!
        </h1>
        <p className="text-[#64748B] mt-1">
          Welcome back! Here's your startup overview.
        </p>
      </div>

      {/* PROFILE STRENGTH */}
      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
        <div className="flex justify-between items-center mb-3">
          <p className="font-semibold text-[#0F172A]">
            Profile Strength
          </p>
          <span className="text-sm font-semibold px-3 py-1 rounded-full
                           bg-[#F97316]/10 text-[#F97316]">
            {data.profileStrength}%
          </span>
        </div>

        <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden mb-3">
          <div
            className="h-2 bg-[#F97316] rounded-full transition-all duration-700"
            style={{ width: `${data.profileStrength}%` }}
          />
        </div>

        <p className="text-sm text-[#64748B]">
          Complete your profile to improve investor visibility.
        </p>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          icon={Eye}
          title="Profile Views"
          value={data.views}
          subtitle="+20% from last week"
          color="text-[#16A34A]"
        />
        <MetricCard
          icon={Heart}
          title="Investor Interest"
          value={data.interest}
          subtitle="+12 this week"
          color="text-[#16A34A]"
        />
        <MetricCard
          icon={MessageSquare}
          title="Messages"
          value={data.messages}
          subtitle={`${data.unread} unread`}
          color="text-[#DC2626]"
        />
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
        <p className="font-semibold text-[#0F172A] mb-4">
          Quick Actions
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <PrimaryAction icon={Plus} label="Create Post" />
          <SecondaryAction icon={Upload} label="Upload Pitch Deck" />
          <SecondaryAction icon={BarChart3} label="View Analytics" />
          <SecondaryAction icon={Edit3} label="Edit Profile" />
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
        <p className="font-semibold text-[#0F172A] mb-4">
          Recent Activity
        </p>

        <ul className="space-y-4">
          {data.activity.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-start
                         rounded-xl p-3 hover:bg-[#FAF6EE] transition"
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E5E7EB]
                                flex items-center justify-center text-[#F97316]">
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="font-medium text-sm text-[#0F172A]">
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

/*  COMPONENTS  */

function MetricCard({ icon: Icon, title, value, subtitle, color }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md
                    transition flex justify-between items-center">
      <div>
        <p className="text-sm text-[#64748B]">{title}</p>
        <h3 className="text-3xl font-bold text-[#0F172A] mt-1">
          {value}
        </h3>
        <p className={`text-sm mt-1 ${color}`}>
          {subtitle}
        </p>
      </div>

      <div className="w-12 h-12 rounded-xl bg-[#E5E7EB]
                      flex items-center justify-center text-[#F97316]">
        <Icon size={20} />
      </div>
    </div>
  );
}

function PrimaryAction({ icon: Icon, label }) {
  return (
    <button className="flex items-center justify-center gap-2
                       bg-[#F97316] text-white rounded-xl py-3
                       font-medium shadow hover:shadow-lg
                       hover:scale-[1.02] transition">
      <Icon size={18} />
      {label}
    </button>
  );
}

function SecondaryAction({ icon: Icon, label }) {
  return (
    <button className="flex items-center justify-center gap-2
                       border border-[#E5E7EB] rounded-xl py-3
                       text-[#0F172A] font-medium
                       hover:bg-[#FAF6EE]
                       hover:scale-[1.02] transition">
      <Icon size={18} />
      {label}
    </button>
  );
}
