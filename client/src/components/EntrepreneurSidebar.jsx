import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  MessageSquare, 
  Users,
  LogOut,
  Sparkles
} from 'lucide-react';

export default function EntrepreneurSidebar() {
  const location = useLocation();
  
  const navItems = [
    { path: '/entrepreneur/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/entrepreneur/profile', label: 'Profile', icon: User },
    { path: '/entrepreneur/ai-matchmaking', label: 'AI Matchmaking', icon: Sparkles },
    { path: '/entrepreneur/connections', label: 'Connections', icon: Users },
    { path: '/entrepreneur/messages', label: 'Messages', icon: MessageSquare },
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <aside className="w-64 bg-[#2F3B4B] text-[#9EC0DB] flex flex-col min-h-screen">
      {/* Logo Area */}
      <div className="px-6 py-5 border-b border-[#465B77]">
        <Link to="/" className="flex items-center gap-0.1">
          <img
            src="/favicon.png"
            alt="Entangle Logo"
            className="w-9 h-9 object-contain"
          />
          <span className="text-xl font-bold">Entangle</span>
        </Link>

        <div className="mt-6 inline-block text-xs font-semibold uppercase tracking-wider bg-[#465B77] text-[#9EC0DB] px-3 py-1 rounded">
          Entrepreneur Account
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
