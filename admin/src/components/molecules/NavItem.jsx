import { NavLink } from 'react-router-dom';

/* NavItem - Molecule for sidebar navigation */
export default function NavItem({ to, icon: Icon, label, end = true }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
          isActive
            ? 'bg-[#EF6F5B] text-white'
            : 'text-[#9EC0DB] hover:bg-[#465B77] hover:text-white'
        }`
      }
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="text-sm font-medium">{label}</span>
    </NavLink>
  );
}
