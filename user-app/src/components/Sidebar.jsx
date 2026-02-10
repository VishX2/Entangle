import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

import {
  Layout as LayoutIcon,
  User,
  PlusSquare,
  BarChart2,
  Award,
  TrendingUp,
  MessageSquare,
  Shield,
  Settings,
  LogOut,
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, to }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-6 py-3 rounded-lg mx-3 cursor-pointer transition
    ${
      active
        ? "bg-[#F97316] text-white"
          : "text-gray-400 hover:bg-[#1e2954] hover:text-white"
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

const Sidebar = ({ activePage }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-[#0B1220] text-white flex flex-col min-h-screen">
      
      {/* Logo Area */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-0.1">
          <img
            src={logo}
            alt="Entangle Logo"
            className="w-9 h-9 object-contain"
          />
          <span className="text-xl font-bold">Entangle</span>
        </div>

        <div className="mt-6 inline-block
          text-xs font-semibold uppercase tracking-wider
          bg-[#333747]/90 text-[#cccfdb]
          px-3 py-1 rounded">
          Startup Account
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-1">
        <SidebarItem icon={LayoutIcon} label="Dashboard" active={activePage === 'dashboard'} to="/startup/dashboard" />
        <SidebarItem icon={User} label="Profile" active={activePage === 'profile'} to="/startup/profile" />
        <SidebarItem icon={PlusSquare} label="Create Post" active={activePage === 'create-post'} to="/startup/create" />
        <SidebarItem icon={BarChart2} label="Analytics" active={activePage === 'analytics'} to="/startup/analytics" />
        <SidebarItem icon={Award} label="Rankings" active={activePage === 'rankings'} to="/startup/rankings" />
        <SidebarItem icon={TrendingUp} label="Trending" active={activePage === 'trending'} to="/startup/trending" />
        <SidebarItem icon={MessageSquare} label="Messages" active={activePage === 'messages'} to="/startup/messages" />
        <SidebarItem icon={Shield} label="Verification" active={activePage === 'verification'} to="/startup/verification" />
        <SidebarItem icon={Settings} label="Settings" active={activePage === 'settings'} to="/settings" />
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 cursor-pointer font-medium
          text-[#F6F1E1]/80 hover:text-white transition w-full"
        >
          <LogOut size={20} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
