import { Link, useLocation } from 'react-router-dom';

/**
 * NavItem - Molecule for sidebar navigation
 */
export default function NavItem({ path, icon: Icon, label }) {
  const location = useLocation();
  const active = location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <Link
      to={path}
      className={`flex items-center gap-3 px-6 py-3 rounded-lg mx-3 transition ${
        active
          ? 'bg-[#EF6F5B] text-white'
          : 'text-[#9EC0DB] hover:bg-[#465B77] hover:text-white'
      }`}
    >
      <Icon size={20} className="shrink-0" />
      <span className="font-medium">{label}</span>
    </Link>
  );
}
