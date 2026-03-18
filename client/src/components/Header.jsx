import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/authSlice';
import NotificationBell from './NotificationBell';

const Header = () => {
  const user = useSelector(selectCurrentUser);
  const displayName = user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : null;

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8">
      <div className="flex items-center gap-2">
        <img src="/favicon.png" alt="Entangle" className="h-8 w-8 object-contain" />
        <h1 className="text-lg font-semibold text-gray-800">
          Entangle Platform
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <NotificationBell />
        {displayName && (
          <span className="text-sm text-gray-600">
            Hi, {user.first_name}
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
