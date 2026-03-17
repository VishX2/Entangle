import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/logo.png";
import { 
  Home, 
  Search, 
  Sparkles, 
  User, 
  Trophy, 
  TrendingUp, 
  MessageSquare, 
  Shield, 
  Settings, 
  LogOut 
} from 'lucide-react';

export default function InvestorSidebar() {
  const location = useLocation();
  
  const navItems = [
    { path: '/investor/home', label: 'Home', icon: Home },
    { path: '/investor/search', label: 'Search', icon: Search },
    { path: '/investor/ai-matches', label: 'AI Matches', icon: Sparkles },
    { path: '/investor/profile', label: 'Profile', icon: User },
    { path: '/investor/ranking', label: 'Ranking', icon: Trophy },
    { path: '/investor/trending', label: 'Trending', icon: TrendingUp },
    { path: '/investor/messages', label: 'Messages', icon: MessageSquare },
    { path: '/investor/verification', label: 'Verification', icon: Shield },
    { path: '/investor/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <aside className="w-64 bg-[#0B1220] text-white flex flex-col min-h-screen">
      {/* Logo Area */}
      <div className="px-6 py-5 border-b border-white/10">
        <Link to="/" className="flex items-center gap-0.1">
          <img
            src={logo}
            alt="Entangle Logo"
            className="w-9 h-9 object-contain"
          />
          <span className="text-xl font-bold">Entangle</span>
        </Link>

        <div className="mt-6 inline-block
          text-xs font-semibold uppercase tracking-wider
          bg-[#333747]/90 text-[#cccfdb]
          px-3 py-1 rounded">
          Investor Account
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-3 rounded-lg mx-3 transition ${
                active
                  ? 'bg-[#F97316] text-white'
                  : 'text-gray-400 hover:bg-[#1e2954] hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-white/10">
        <Link
          to="/login"
          className="flex items-center gap-3 cursor-pointer font-medium
            text-[#F6F1E1]/80 hover:text-white transition"
        >
          <LogOut size={20} />
          <span>Log out</span>
        </Link>
      </div>
    </aside>
  );
}
