import React from 'react';
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

const SidebarItem = ({ icon: Icon, label, active }) => (
  <div
    className={`flex items-center space-x-3 px-6 py-3 cursor-pointer transition-colors
    ${
      active
        ? 'bg-white/10 text-white'
        : 'text-slate-300 hover:bg-white/5 hover:text-white'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </div>
);

const Sidebar = ({ activePage }) => {
  return (
    <aside className="w-64 bg-[#958bb6] text-white flex flex-col shrink-0 min-h-screen">
      
      {/* Logo Area */}
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rotate-45" />
          </div>
          <span className="text-xl font-bold">Entangle</span>
        </div>

        <div className="mt-6 text-sm font-semibold text-indigo-900 uppercase tracking-wider bg-white/30 px-3 py-1 rounded inline-block">
          Startup Account
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4">
        <SidebarItem icon={LayoutIcon} label="Dashboard" active={activePage === 'dashboard'} />
        <SidebarItem icon={User} label="Profile" active={activePage === 'profile'} />
        <SidebarItem icon={PlusSquare} label="Create Post" active={activePage === 'create-post'} />
        <SidebarItem icon={BarChart2} label="Analytics" active={activePage === 'analytics'} />
        <SidebarItem icon={Award} label="Rankings" active={activePage === 'rankings'} />
        <SidebarItem icon={TrendingUp} label="Trending" active={activePage === 'trending'} />
        <SidebarItem icon={MessageSquare} label="Messages" active={activePage === 'messages'} />
        <SidebarItem icon={Shield} label="Verification" active={activePage === 'verification'} />
        <SidebarItem icon={Settings} label="Settings" active={activePage === 'settings'} />
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-white/10">
        <div className="flex items-center space-x-3 text-indigo-900 font-medium cursor-pointer">
          <LogOut size={20} />
          <span>Log out</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
