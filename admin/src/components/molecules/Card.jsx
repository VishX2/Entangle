/* Card - Molecule component for content containers */
export default function Card({ title, children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-[#e2ddd0] overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 py-4 bg-[#F5F0DD] border-b border-[#e2ddd0]">
          <h3 className="font-medium text-[#2F3B4B]">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
