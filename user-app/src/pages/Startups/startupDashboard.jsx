import {
  ArrowUpRight,
  Eye,
  Heart,
  MessageSquare,
  Star,
  CheckCircle,
} from "lucide-react";

export default function StartupDashboard() {
  return (
    <div
      className="min-h-screen px-12 py-10 space-y-14"
      style={{ backgroundColor: "#F5F1E3" }}
    >

      {/*  HERO */}
      <section className="flex items-center justify-between">
        <div>
          <h1
            className="text-4xl font-semibold tracking-tight"
            style={{ color: "#2B3443" }}
          >
            Startup Dashboard
          </h1>
          <p className="mt-2 text-base" style={{ color: "#3F5D7D" }}>
            A clear view of how your startup is performing
          </p>
        </div>

        <div
          className="rounded-2xl px-6 py-4 shadow-sm transition-all duration-300
                     hover:-translate-y-1 hover:shadow-lg"
          style={{ backgroundColor: "#0e1e39" }}
        >
          <p className="text-sm text-white/60">Traction Score</p>
          <p className="text-3xl font-semibold text-white">82</p>
        </div>
      </section>

      {/* KPI ROW */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Kpi icon={Eye} label="Profile Views" value="1,234" trend="+18%" />
        <Kpi icon={Heart} label="Investor Interest" value="48" trend="+6" />
        <Kpi
          icon={MessageSquare}
          label="Messages"
          value="15"
          trend="5 unread"
        />
      </section>

      {/* MAIN GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-10">

          {/* PROFILE STRENGTH */}
          <Card title="Profile Strength">
            <div className="flex items-center gap-6">
              <div className="text-5xl font-semibold text-[#EF6C4E]">
                72%
              </div>

              <div className="flex-1">
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: "#9EC6DC" }}
                >
                  <div
                    className="h-2 rounded-full transition-all duration-700"
                    style={{
                      width: "72%",
                      backgroundColor: "#EF6C4E",
                    }}
                  />
                </div>
                <p className="mt-2 text-sm text-[#3F5D7D]">
                  Strong visibility, close to optimal
                </p>
              </div>
            </div>
          </Card>

          {/* QUICK ACTIONS */}
          <Card title="Quick Actions">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Action primary>Create Post</Action>
              <Action>Upload Pitch</Action>
              <Action>Analytics</Action>
              <Action>Edit Profile</Action>
            </div>
          </Card>
        </div>

        {/* RIGHT */}
        <div>
          <Card title="Recent Activity" floating>
            <Timeline
              icon={Eye}
              title="Investor viewed profile"
              desc="TechVentures Capital"
            />
            <Timeline
              icon={Star}
              title="Pitch saved"
              desc="Innovation Fund"
            />
            <Timeline
              icon={CheckCircle}
              title="Verification completed"
              desc="Startup approved"
            />
          </Card>
        </div>
      </section>
    </div>
  );
}

/* COMPONENTS */

function Card({ title, children, floating }) {
  return (
    <div
      className={`rounded-3xl p-6 transition-all duration-300
                  hover:-translate-y-1 ${
        floating ? "hover:shadow-2xl" : "hover:shadow-xl"
      }`}
      style={{
        backgroundColor: "white",
        boxShadow: floating
          ? "0 20px 40px rgba(0,0,0,0.12)"
          : "0 8px 18px rgba(0,0,0,0.08)",
      }}
    >
      <p className="mb-5 font-medium text-[#2B3443]">
        {title}
      </p>
      {children}
    </div>
  );
}

function Kpi({ icon: Icon, label, value, trend, highlight }) {
  return (
    <div
      className="rounded-3xl p-6 flex justify-between items-center
                 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        backgroundColor: highlight ? "#2B3443" : "white",
        color: highlight ? "white" : "#2B3443",
        boxShadow: "0 10px 24px rgba(0,0,0,0.1)",
      }}
    >
      <div>
        <p className={`text-sm ${highlight ? "text-white/60" : ""}`}>
          {label}
        </p>
        <p className="text-3xl font-semibold mt-1">
          {value}
        </p>
        <p
          className="text-sm mt-1"
          style={{ color: highlight ? "#EF6C4E" : "#3F5D7D" }}
        >
          {trend}
        </p>
      </div>

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center
                   transition-all duration-300 group-hover:scale-105"
        style={{
          backgroundColor: highlight ? "#EF6C4E" : "#F5F1E3",
        }}
      >
        <Icon size={20} />
      </div>
    </div>
  );
}

function Action({ children, primary }) {
  return (
    <button
      className="rounded-xl py-3 font-medium transition-all duration-300
                 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]"
      style={{
        backgroundColor: primary ? "#EF6C4E" : "#F5F1E3",
        color: primary ? "white" : "#2B3443",
      }}
    >
      {children}
    </button>
  );
}

function Timeline({ icon: Icon, title, desc }) {
  return (
    <div
      className="flex items-start gap-4 py-3 rounded-xl
                 transition-all duration-300 hover:bg-[#F5F1E3]"
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center
                   transition-transform duration-300 hover:scale-105"
        style={{ backgroundColor: "#9EC6DC" }}
      >
        <Icon size={18} style={{ color: "#2B3443" }} />
      </div>
      <div>
        <p className="font-medium text-[#2B3443]">
          {title}
        </p>
        <p className="text-sm text-[#3F5D7D]">
          {desc}
        </p>
      </div>
    </div>
  );
}
