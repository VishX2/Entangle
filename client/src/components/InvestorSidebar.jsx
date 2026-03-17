import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Sparkles, 
  User, 
  Trophy, 
  MessageSquare, 
  LogOut 
} from 'lucide-react';

export default function InvestorSidebar() {
  const location = useLocation();
  
  const navItems = [
    { path: '/investor/dashboard', label: 'Dashboard', icon: Home },
    { path: '/investor/recommendations', label: 'Recommendations', icon: Search },
    { path: '/investor/ai-matchmaking', label: 'AI Matchmaking', icon: Sparkles },
    { path: '/investor/profile', label: 'Profile', icon: User },
    { path: '/investor/messages', label: 'Messages', icon: MessageSquare },
    { path: '/investor/requests', label: 'Connection Requests', icon: Trophy },
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <aside className="w-64 bg-[#2F3B4B] text-[#9EC0DB] flex flex-col min-h-screen">
      <div className="px-6 py-5 border-b border-[#465B77]">
        <Link to="/" className="flex items-center gap-2">
          <img src="/favicon.png" alt="Entangle Logo" className="w-9 h-9 object-contain" />
          <span className="text-xl font-bold text-white">Entangle</span>
        </Link>
        <div className="mt-6 inline-block text-xs font-semibold uppercase tracking-wider bg-[#465B77] text-[#9EC0DB] px-3 py-1 rounded">
          Investor Account
        </div>
      </div>

      <nav className="flex-1 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-3 rounded-lg mx-3 transition ${
                active ? 'bg-[#EF6F5B] text-white' : 'text-[#9EC0DB] hover:bg-[#465B77] hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-[#465B77]">
        <Link
          to="/login"
          className="flex items-center gap-3 cursor-pointer font-medium text-[#9EC0DB]/80 hover:text-white transition"
        >
          <LogOut size={20} />
          <span>Log out</span>
        </Link>
      </div>
    </aside>
  );
}
