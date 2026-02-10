export default function SidebarItem({ name, rating }) {
  return (
    <div className="flex justify-between text-sm">
      <span>{name}</span>
      {rating && <span className="text-[#ff6b4a]">★ {rating}</span>}
    </div>
  );
}
