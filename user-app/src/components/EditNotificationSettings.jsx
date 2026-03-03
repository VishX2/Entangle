import { useState } from "react";
import { Bell, MessageSquare, Star } from "lucide-react";

export default function EditNotificationSettings() {
  const [notifications, setNotifications] = useState({
    pitch: true,
    messages: true,
    reviews: true,
  });

  const toggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const items = [
    {
      key: "pitch",
      label: "Pitch Requests",
      icon: MessageSquare,
      count: 5,
      color: "bg-orange-500",
    },
    {
      key: "messages",
      label: "Messages",
      icon: MessageSquare,
      count: 3,
      color: "bg-slate-800",
    },
    {
      key: "reviews",
      label: "Reviews",
      icon: Star,
      count: 2,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Bell className="text-orange-500" size={18} />
        <h3 className="font-semibold text-slate-900">
          Notifications
        </h3>
      </div>

      {/* Notification rows */}
      <div className="space-y-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => toggle(item.key)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition
                ${
                  notifications[item.key]
                    ? "bg-slate-100"
                    : "bg-slate-50 opacity-60"
                }`}
            >
              <div className="flex items-center gap-3 text-slate-700">
                <Icon size={18} />
                <span className="text-sm font-medium">
                  {item.label}
                </span>
              </div>

              <span
                className={`text-white text-xs font-semibold px-2 py-1 rounded-full ${item.color}`}
              >
                {item.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
