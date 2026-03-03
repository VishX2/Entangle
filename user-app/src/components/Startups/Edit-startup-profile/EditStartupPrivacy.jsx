import { useState } from "react";
import { Settings, Eye, DollarSign, MessageSquare, Monitor } from "lucide-react";

function Toggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`w-11 h-6 rounded-full relative transition ${
        enabled ? "bg-orange-500" : "bg-slate-300"
      }`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
          enabled ? "right-0.5" : "left-0.5"
        }`}
      />
    </button>
  );
}

export default function EditStartupPrivacy() {
  const [settings, setSettings] = useState({
    visibility: true,
    hideAmounts: false,
    messages: true,
    pitches: true,
  });

  const toggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const items = [
    {
      key: "visibility",
      title: "Profile Visibility",
      description: "Make your profile visible to all users",
      icon: Eye,
    },
    {
      key: "hideAmounts",
      title: "Hide Investment Amounts",
      description: "Keep your investment details private",
      icon: DollarSign,
    },
    {
      key: "messages",
      title: "Allow Messages",
      description: "Receive direct messages from founders",
      icon: MessageSquare,
    },
    {
      key: "pitches",
      title: "Accept Pitch Requests",
      description: "Allow investors to send you pitch decks",
      icon: Monitor,
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Settings className="text-orange-500" size={18} />
        <h3 className="font-semibold text-slate-900">
          Privacy & Settings
        </h3>
      </div>

      {/* Settings list */}
      <div className="space-y-5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.key}
              className="flex items-center justify-between"
            >
              <div className="flex gap-3">
                <Icon
                  size={20}
                  className="text-slate-500 mt-1"
                />
                <div>
                  <div className="text-sm font-medium text-slate-900">
                    {item.title}
                  </div>
                  <div className="text-xs text-slate-500">
                    {item.description}
                  </div>
                </div>
              </div>

              <Toggle
                enabled={settings[item.key]}
                onToggle={() => toggle(item.key)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
