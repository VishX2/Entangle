export default function SidebarCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h4 className="font-semibold mb-4">{title}</h4>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
