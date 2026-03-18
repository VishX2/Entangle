/**
 * Shared Button - Atomic component
 * Used by both admin and client apps
 * Variants: primary, secondary, ghost, danger
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-[#EF6F5B] text-white hover:bg-[#e85a45] focus:ring-[#EF6F5B]',
    secondary: 'bg-[#9EC0DB] text-[#2F3B4B] hover:bg-[#8ab3d0] focus:ring-[#9EC0DB]',
    ghost: 'bg-transparent text-[#465B77] hover:bg-[#9EC0DB]/20 focus:ring-[#465B77]',
    danger: 'bg-[#ef4444] text-white hover:bg-[#dc2626] focus:ring-[#ef4444]',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-3',
  };
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
