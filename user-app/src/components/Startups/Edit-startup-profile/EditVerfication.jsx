import { useState } from "react";
import { Check, Shield, Mail, Linkedin, Award, FileText } from "lucide-react";

export default function EditVerification() {
  const [items, setItems] = useState([
    { label: "Identity Verified", icon: Shield, verified: true },
    { label: "Email Verified", icon: Mail, verified: true },
    { label: "LinkedIn Verified", icon: Linkedin, verified: true },
    { label: "Platform Trust Badge", icon: Award, verified: true },
    { label: "License Agreement", icon: FileText, verified: true },
  ]);

  const verifiedCount = items.filter((i) => i.verified).length;
  const trustScore = Math.round((verifiedCount / items.length) * 100);

  const toggleVerification = (index) => {
    const updated = [...items];
    updated[index].verified = !updated[index].verified;
    setItems(updated);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="text-orange-500" size={20} />
        <h3 className="font-semibold text-slate-900">
          Verification & Trust
        </h3>
      </div>

      <div className="flex justify-between text-sm mb-2">
        <span className="text-slate-500">Trust Score</span>
        <span className="text-orange-500 font-medium">
          {trustScore}%
        </span>
      </div>

      <div className="w-full h-2 bg-slate-200 rounded-full mb-6">
        <div
          className="h-2 bg-orange-500 rounded-full transition-all"
          style={{ width: `${trustScore}%` }}
        />
      </div>

      <div className="space-y-4">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={() => toggleVerification(index)}
              className="w-full flex items-center justify-between hover:bg-slate-50 p-2 rounded-xl transition"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    item.verified ? "bg-green-100" : "bg-slate-100"
                  }`}
                >
                  <Icon
                    size={18}
                    className={
                      item.verified
                        ? "text-green-600"
                        : "text-slate-400"
                    }
                  />
                </div>

                <span className="text-sm text-slate-700">
                  {item.label}
                </span>
              </div>

              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  item.verified
                    ? "border-green-500"
                    : "border-slate-300"
                }`}
              >
                {item.verified && (
                  <Check size={14} className="text-green-500" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
