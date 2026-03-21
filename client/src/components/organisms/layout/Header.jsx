import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { selectCurrentUser, logout } from '../../../store/authSlice';
import { ensureHttpsImageUrl } from '../../../utils/imageUrl';
import NotificationBell from '../../NotificationBell';

const getProfilePath = (userType) => {
  if (!userType) return null;
  const base = { investor: '/investor/profile', startup: '/startup/profile', entrepreneur: '/entrepreneur/profile' };
  return base[userType] || null;
};

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const displayName = user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : null;
  const profilePath = getProfilePath(user?.user_type);
  const avatarUrl = ensureHttpsImageUrl(user?.profile_picture);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  const handleProfileClick = () => {
    if (profilePath) navigate(profilePath);
  };

  return (
    <header className="h-16 bg-white flex items-center justify-between px-8 shadow-sm">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold text-gray-800">Entangle Platform</h1>
      </div>
      <div className="flex items-center gap-4">
        <NotificationBell />
        {displayName && (
          <button
            type="button"
            onClick={handleProfileClick}
            className="flex items-center gap-2 rounded-lg hover:bg-gray-100 transition outline-none focus:ring-2 focus:ring-[#465775] focus:ring-offset-1"
            aria-label="Go to profile"
          >
            <span className="flex shrink-0 w-9 h-9 rounded-full overflow-hidden bg-gray-200 ring-2 ring-gray-100">
              {avatarUrl ? (
                <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="w-full h-full flex items-center justify-center text-gray-500">
                  <User size={20} />
                </span>
              )}
            </span>
            <span className="text-sm text-gray-600 hidden sm:inline">Hi, {user.first_name}</span>
          </button>
        )}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition"
          aria-label="Log out"
        >
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
