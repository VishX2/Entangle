import logo from "../assets/logo.png";
import {
  LayoutDashboard,
  Search,
  Sparkles,
  UserCircle,
  Trophy,
  TrendingUp,
  Mail,
  Shield,
  Settings,
  LogOut,
} from "lucide-react";

const SidebarItem = ({ icon: Icon, label, active }) => (
  <div
    className={`flex items-center gap-3 px-6 py-3 rounded-lg mx-3 cursor-pointer transition
      ${
        active
          ? "bg-[#F97316] text-white"
          : "text-gray-400 hover:bg-[#1e2954] hover:text-white"
      }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </div>
);

const InvestorSidebar = ({ activePage }) => {
  return (
    <aside className="w-64 bg-[#0B1220] text-white flex flex-col min-h-screen">

      {/* ===== LOGO ===== */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Entangle Logo"
            className="w-9 h-9 object-contain"
          />
          <span className="text-xl font-bold">Entangle</span>
        </div>

        <div className="mt-6 inline-block text-xs font-semibold uppercase tracking-wider
                        bg-[#333747]/90 text-[#cccfdb] px-3 py-1 rounded">
          Investor Account
        </div>
      </div>

      {/* ===== NAVIGATION ===== */}
      <nav className="flex-1 py-4 space-y-1">
        <SidebarItem
          icon={LayoutDashboard}
          label="Home"
          active={activePage === "dashboard"}
        />
        <SidebarItem
          icon={Search}
          label="Search"
          active={activePage === "search"}
        />
        <SidebarItem
          icon={Sparkles}
          label="AI Matches"
          active={activePage === "ai-matches"}
        />
        <SidebarItem
          icon={UserCircle}
          label="Profile"
          active={activePage === "profile"}
        />
        <SidebarItem
          icon={Trophy}
          label="Ranking"
          active={activePage === "ranking"}
        />
        <SidebarItem
          icon={TrendingUp}
          label="Trending"
          active={activePage === "trending"}
        />
        <SidebarItem
          icon={Mail}
          label="Messages"
          active={activePage === "messages"}
        />
        <SidebarItem
          icon={Shield}
          label="Verification"
          active={activePage === "verification"}
        />
        <SidebarItem
          icon={Settings}
          label="Settings"
          active={activePage === "settings"}
        />
      </nav>

      {/* ===== LOGOUT ===== */}
      <div className="p-6 border-t border-white/10">
        <div className="flex items-center gap-3 text-[#F6F1E1]/80 hover:text-white cursor-pointer">
          <LogOut size={20} />
          <span>Log out</span>
        </div>
      </div>
    </aside>
  );
};

export default InvestorSidebar;
