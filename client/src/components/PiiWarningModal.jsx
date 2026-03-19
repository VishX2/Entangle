import { AlertTriangle } from "lucide-react";

export default function PiiWarningModal({ open, warnings = [], onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={24} />
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800">Sensitive data detected</h3>
            <p className="text-sm text-slate-600 mt-1">
              Your content may contain personal or sensitive information that could be a privacy risk:
            </p>
            <ul className="mt-3 space-y-1 text-sm text-slate-700">
              {warnings.map((w, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-amber-600">•</span>
                  {w.message}
                  {w.count > 1 && (
                    <span className="text-slate-500">({w.count} found)</span>
                  )}
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 mt-3">
              Consider removing or generalizing this information before sharing.
            </p>
            <div className="flex gap-3 mt-5">
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-2 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-600 transition"
              >
                Save anyway
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
