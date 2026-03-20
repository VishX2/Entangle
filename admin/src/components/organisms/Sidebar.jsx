import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { logout, selectCurrentUser } from '../../store/authSlice';
import { NavItem } from '../molecules';
import { LayoutGrid, ShieldCheck, MessageSquare, AlertTriangle, LogOut, Sparkles, Users, Link2, User } from 'lucide-react';

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get currently logged-in user from Redux store
  const user = useSelector(selectCurrentUser);

  // Handle user logout
  const handleLogout = () => {
    dispatch(logout());
    toast.success('Signed out successfully');
    navigate('/login', { replace: true });
  };

  return (
    // Sidebar container
    <aside className="w-64 bg-[#2F3B4B] text-[#9EC0DB] flex flex-col sticky top-0 h-screen">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Entangle" className="w-9 h-9 object-contain" />
          <span className="text-xl font-bold text-white">Entangle</span>
        </div>

        {/* Display logged-in user's name if available */}
        {user && (
          <p className="mt-2 text-sm text-[#9EC0DB]/80 truncate">
            {user.first_name} {user.last_name}
          </p>
        )}

        <div className="mt-4 border-t border-[#465B77]" />
      </div>

      {/* Navigation menu */}
      <nav className="flex-1 space-y-2 px-4">
        <NavItem to="/dashboard" icon={LayoutGrid} label="Dashboard" />
        <NavItem to="/profile" icon={User} label="Profile" />
        <NavItem to="/users" icon={Users} label="User Management" />
        <NavItem to="/connection-requests" icon={Link2} label="Connection Requests" />
        <NavItem to="/investor-verification" icon={ShieldCheck} label="Investor Verification" />
        <NavItem to="/content-moderation" icon={MessageSquare} label="Content Moderation" />
        <NavItem to="/reports" icon={AlertTriangle} label="Reports & Complaints" />
        <NavItem to="/ai-matchmaking" icon={Sparkles} label="AI Matchmaking" />
      </nav>

      {/* Bottom divider */}
      <div className="px-6 my-4 border-t border-[#465B77]" />

      {/* Logout button */}
      <button
        type="button"
        onClick={handleLogout}
        className="p-4 text-sm text-[#9EC0DB]/80 hover:text-white cursor-pointer flex items-center gap-3 w-full text-left transition"
      >
        <LogOut className="h-4 w-4 shrink-0" />
        Logout
      </button>
    </aside>
  );
}
