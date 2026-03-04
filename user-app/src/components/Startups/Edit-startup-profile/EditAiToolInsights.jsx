import { Sparkles, CheckCircle, Zap } from "lucide-react";

export default function EditAiToolInsights() {
  const completeness = 78;

  const suggestions = [
    "Add a professional headshot",
    "Complete investment thesis",
    "Link portfolio companies",
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-orange-500" size={18} />
        <h3 className="font-semibold text-slate-900">
          AI Tools & Insights
        </h3>
      </div>

      {/* Profile completeness */}
      <div className="flex justify-between text-sm mb-2">
        <span className="text-slate-500">
          Profile Completeness
        </span>
        <span className="text-orange-500 font-medium">
          {completeness}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-slate-200 rounded-full mb-5">
        <div
          className="h-2 bg-orange-500 rounded-full"
          style={{ width: `${completeness}%` }}
        />
      </div>

      {/* Suggestions title */}
      <div className="text-xs font-semibold text-slate-400 mb-3 tracking-wide">
        SUGGESTIONS
      </div>

      {/* Suggestion items */}
      <div className="space-y-2 mb-4">
        {suggestions.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-slate-100 rounded-xl px-4 py-3 text-sm text-slate-700"
          >
            <CheckCircle
              size={16}
              className="text-slate-400"
            />
            {item}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="space-y-2">
        <button className="w-full flex items-center gap-2 justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 rounded-xl font-medium transition">
          <Zap size={16} className="text-orange-500" />
          Run AI Profile Check
        </button>

        <button className="w-full flex items-center gap-2 justify-center bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-medium transition">
          <Sparkles size={16} />
          Improve My Profile with AI
        </button>
      </div>
    </div>
  );
}
