import { Link, useLocation } from 'react-router-dom';
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
    <div className="w-64 min-h-screen bg-[#1a2234] flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <span className="text-xl font-semibold text-white">Entangle</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                active
                  ? 'bg-[#E5654E] text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <Link
          to="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log out</span>
        </Link>
      </div>
    </div>
  );
}
