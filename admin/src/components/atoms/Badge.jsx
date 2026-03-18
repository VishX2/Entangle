/* Badge - Atomic component for status/tags */
export default function Badge({ children, variant = 'default', className = '' }) {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium';
  const variants = {
    default: 'bg-[#9EC0DB]/30 text-[#2F3B4B]',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    error: 'bg-red-100 text-red-800',
    accent: 'bg-[#EF6F5B]/20 text-[#e85a45]',
  };
  return <span className={`${base} ${variants[variant]} ${className}`}>{children}</span>;
}
