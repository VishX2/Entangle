import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  LayoutDashboard,
  Home,
  User,
  MessageSquare,
  Trophy,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { logout, selectCurrentUser } from '../../../store/authSlice';

const NAV_CONFIG = {
  investor: [
    { path: '/investor/dashboard', label: 'Dashboard', icon: Home },
    { path: '/investor/ai-matchmaking', label: 'AI Matchmaking', icon: Sparkles },
    { path: '/investor/profile', label: 'Profile', icon: User },
    { path: '/investor/messages', label: 'Messages', icon: MessageSquare },
    { path: '/investor/requests', label: 'Connection Requests', icon: Trophy },
  ],
  startup: [
    { path: '/startup/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/startup/profile', label: 'Profile', icon: User },
    { path: '/startup/ai-matchmaking', label: 'AI Matchmaking', icon: Sparkles },
    { path: '/startup/messages', label: 'Messages', icon: MessageSquare },
    { path: '/startup/requests', label: 'Connection Requests', icon: Trophy },
  ],
  entrepreneur: [
    { path: '/entrepreneur/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/entrepreneur/profile', label: 'Profile', icon: User },
    { path: '/entrepreneur/ai-matchmaking', label: 'AI Matchmaking', icon: Sparkles },
    { path: '/entrepreneur/requests', label: 'Connection Requests', icon: Trophy },
    { path: '/entrepreneur/messages', label: 'Messages', icon: MessageSquare },
  ],
};

const BADGE_LABELS = {
  investor: 'Investor Account',
  startup: 'Startup Account',
  entrepreneur: 'Entrepreneur Account',
};

export default function UserSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const userType = user?.user_type || 'entrepreneur';

  const navItems = NAV_CONFIG[userType] || NAV_CONFIG.entrepreneur;
  const badgeLabel = BADGE_LABELS[userType] || BADGE_LABELS.entrepreneur;

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <aside className="w-64 bg-[#2F3B4B] text-[#9EC0DB] flex flex-col min-h-screen">
      <div className="px-6 py-5 border-b border-[#465B77]">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Entangle Logo" className="w-9 h-9 object-contain" />
          <span className="text-xl font-bold text-white">Entangle</span>
        </Link>
        <div className="mt-6 inline-block text-xs font-semibold uppercase tracking-wider bg-[#465B77] text-[#9EC0DB] px-3 py-1 rounded">
          {badgeLabel}
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
                active ? 'bg-[#F97316] text-white' : 'text-[#9EC0DB] hover:bg-[#465B77] hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-[#465B77]">
        <button
          type="button"
          onClick={() => { dispatch(logout()); navigate('/login', { replace: true }); }}
          className="flex items-center gap-3 w-full cursor-pointer font-medium text-[#9EC0DB]/80 hover:text-white transition"
        >
          <LogOut size={20} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
