export default function RightSidebar() {
  return (
    <div className="space-y-6">
      
      <div className="bg-white rounded-2xl p-6">
        <h3 className="font-semibold mb-3">Connect & Interact</h3>
        <div className="flex gap-2">
          <button className="flex-1 bg-orange-500 text-white py-2 rounded-lg">
            Connect
          </button>
          <button className="flex-1 border py-2 rounded-lg">
            Message
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6">
        <h3 className="font-semibold mb-2">AI Tools & Insights</h3>
        <p className="text-sm text-slate-600">
          Profile completeness: <span className="font-medium">85%</span>
        </p>
      </div>
    </div>
  );
}
