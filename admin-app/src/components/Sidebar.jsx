import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  ShieldCheck,
  MessageSquare,
  AlertTriangle,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#0f172a] text-slate-200 flex flex-col sticky top-0 h-screen">
      {/* Logo */}
      <div className="p-6">
        <div className="text-xl font-bold">Entangle</div>
        <div className="mt-4 border-t border-slate-700" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4">
        <SidebarItem 
          to="/dashboard" 
          icon={LayoutGrid} 
          label="Dashboard" 
        />
        <SidebarItem
          to="/investor-verification"
          icon={ShieldCheck}
          label="Investor Verification"
        />
        <SidebarItem
          to="/content-moderation"
          icon={MessageSquare}
          label="Content Moderation"
        />
        <SidebarItem
          to="/reports"
          icon={AlertTriangle}
          label="Reports & Complaints"
        />
      </nav>

      {/* Footer */}
      <div className="px-6 my-4 border-t border-slate-700" />

      <div className="p-4 text-sm opacity-70 hover:text-white cursor-pointer flex items-center gap-3">
        <LogOut className="h-4 w-4" />
        Logout
      </div>
    </aside>
  );
}

/* ---------- SIDEBAR ITEM ---------- */

function SidebarItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
          isActive
            ? "bg-orange-500 text-white"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }`
      }
    >
      <Icon className="h-5 w-5" />
      <span className="text-sm font-medium">{label}</span>
    </NavLink>
  );
}
