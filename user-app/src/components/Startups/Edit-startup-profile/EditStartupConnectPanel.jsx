import { UserPlus, MessageSquare, Send } from "lucide-react";

export default function EditStartupConnectPanel() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow">
      {/* Title */}
      <h3 className="font-semibold text-slate-900 mb-4">
        Connect & Interact
      </h3>

      {/* Buttons */}
      <div className="space-y-3">
        {/* Connect */}
        <button className="w-full flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-xl font-medium transition">
          <UserPlus size={18} />
          Connect
        </button>

        {/* Pitch Startup */}
        <button className="w-full flex items-center gap-3 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-xl font-medium transition">
          <Send size={18} />
          Pitch Investor
        </button>

        {/* Message */}
        <button className="w-full flex items-center gap-3 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-xl font-medium transition">
          <MessageSquare size={18} />
          Message
        </button>
      </div>
    </div>
  );
}
