import { useState } from "react";

const TABS = ["All", "Pending", "Descriptions", "Media", "Comments"];

const initialItems = [
  {
    id: 1,
    name: "TechVentures Inc.",
    description: "Misleading claims about revenue projections...",
    type: "Descriptions",
    status: "Removed",
    reason: "Misleading information",
    by: "InvestorA",
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "GreenEnergy Co.",
    description: "Image: product_photo_03.jpg",
    type: "Media",
    status: "Pending",
    reason: "Inappropriate content",
    by: "User123",
    date: "2024-01-14",
  },
  {
    id: 3,
    name: "StartupX Forum",
    description: "Aggressive promotional language targeting competitors...",
    type: "Comments",
    status: "Pending",
    reason: "Spam / Promotion",
    by: "ModeratorBot",
    date: "2024-01-13",
  },
  {
    id: 4,
    name: "FinanceFlow",
    description: "Unverified partnership claims with major banks...",
    type: "Descriptions",
    status: "Approved",
    reason: "False claims",
    by: "InvestorB",
    date: "2024-01-12",
  },
];

export default function ContentModeration() {
  const [activeTab, setActiveTab] = useState("All");
  const [items, setItems] = useState(initialItems);

  const handleApprove = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Approved" } : item
      )
    );
  };

  const handleRemove = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Removed" } : item
      )
    );
  };

  const filteredItems = items.filter((item) => {
    if (activeTab === "All") return true;
    if (activeTab === "Pending") return item.status === "Pending";
    return item.type === activeTab;
  });

  const statusStyles = {
    Pending: "bg-blue-100 text-blue-700",
    Approved: "bg-green-100 text-green-700",
    Removed: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-8 bg-[#faf7f2] min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-slate-800">
        Content Moderation
      </h1>
      <p className="text-sm text-slate-500 mt-1">
        Review and moderate flagged content across the platform
      </p>

      {/* Tabs */}
      <div className="flex gap-3 mt-6 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm border transition
              ${
                activeTab === tab
                  ? "bg-white border-slate-300 text-slate-900 shadow-sm"
                  : "bg-transparent border-slate-200 text-slate-500 hover:bg-white"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="mt-6 space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#f4efe7] rounded-xl p-5 flex justify-between items-start shadow-sm"
          >
            {/* Left */}
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-medium text-slate-800">
                  {item.name}
                </h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[item.status]}`}
                >
                  {item.status}
                </span>
              </div>

              <p className="text-sm text-slate-600 mt-1">
                {item.description}
              </p>

              <div className="text-xs text-slate-500 mt-2 flex gap-4">
                <span>{item.reason}</span>
                <span>by {item.by}</span>
                <span>{item.date}</span>
              </div>
            </div>

            {/* Actions */}
            {item.status === "Pending" && (
              <div className="flex items-center gap-6 text-sm font-medium">
                <button
                  onClick={() => handleApprove(item.id)}
                  className="text-green-600 hover:text-green-700 transition"
                >
                  ✓ Approve
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  ✕ Remove
                </button>
                <button className="text-slate-500 hover:text-slate-700 transition">
                  Flag User
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
