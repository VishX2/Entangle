import { useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  Check,
  X,
  Flag,
  FileText,
  Image as ImageIcon,
  MessageCircle,
} from "lucide-react";

/* CONTENT MODERATION PAGE */

export default function ContentModeration() {
  return (
    <div className="flex min-h-screen bg-[#f7f3ec]">
      {/* SHARED SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 p-8 overflow-y-auto">
        <ModerationContent />
      </main>
    </div>
  );
}

/* MAIN CONTENT */

const TABS = ["All", "Pending", "Descriptions", "Media", "Comments"];

const initialItems = [
  {
    id: 1,
    title: "TechVentures Inc.",
    desc: "Misleading claims about revenue projections...",
    category: "Descriptions",
    status: "Pending",
    reason: "Misleading information",
    by: "InvestorA",
    date: "2024-01-15",
    icon: FileText,
  },
  {
    id: 2,
    title: "GreenEnergy Co.",
    desc: "Image: product_photo_03.jpg",
    category: "Media",
    status: "Pending",
    reason: "Inappropriate content",
    by: "User123",
    date: "2024-01-14",
    icon: ImageIcon,
  },
  {
    id: 3,
    title: "StartupX Forum",
    desc: "Aggressive promotional language targeting competitors...",
    category: "Comments",
    status: "Pending",
    reason: "Spam / Promotion",
    by: "ModeratorBot",
    date: "2024-01-13",
    icon: MessageCircle,
  },
  {
    id: 4,
    title: "FinanceFlow",
    desc: "Unverified partnership claims with major banks...",
    category: "Descriptions",
    status: "Approved",
    reason: "False claims",
    by: "InvestorB",
    date: "2024-01-12",
    icon: FileText,
  },
];

function ModerationContent() {
  const [activeTab, setActiveTab] = useState("All");
  const [items, setItems] = useState(initialItems);

  /* ---------- ACTIONS ---------- */

  const updateStatus = (id, status) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  /* ---------- COUNTS ---------- */

  const getCount = (tab) => {
    if (tab === "All") return items.length;
    if (tab === "Pending")
      return items.filter((i) => i.status === "Pending").length;

    return items.filter((i) => i.category === tab).length;
  };

  /* ---------- FILTER ---------- */

  const filteredItems = items.filter((item) => {
    if (activeTab === "All") return true;
    if (activeTab === "Pending") return item.status === "Pending";
    return item.category === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Content Moderation
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review and moderate flagged content across the platform
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
              activeTab === tab
                ? "bg-white border-slate-300 shadow-sm"
                : "border-slate-200 text-slate-500 hover:bg-white"
            }`}
          >
            {tab} ({getCount(tab)})
          </button>
        ))}
      </div>

      {/* Moderation List */}
      <div className="space-y-5">
        {filteredItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-xl px-6 py-5 shadow-sm border border-slate-200 flex justify-between items-start ${
                item.status === "Removed" ? "opacity-75" : ""
              }`}
            >
              {/* Left */}
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-lg bg-slate-300 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-orange-500" />
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-slate-800">
                      {item.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        item.status === "Pending"
                          ? "bg-blue-100 text-blue-700"
                          : item.status === "Removed"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 mt-1">
                    {item.desc}
                  </p>

                  <div className="flex gap-4 text-xs text-slate-500 mt-2">
                    <span>{item.reason}</span>
                    <span>by {item.by}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {item.status === "Pending" && (
                <div className="flex items-center gap-6 text-sm font-medium">
                  <button
                    onClick={() =>
                      updateStatus(item.id, "Approved")
                    }
                    className="flex items-center gap-2 text-green-600 hover:text-green-700"
                  >
                    <Check className="h-4 w-4" />
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(item.id, "Removed")
                    }
                    className="flex items-center gap-2 text-red-500 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                    Remove
                  </button>

                  <button className="flex items-center gap-2 text-slate-500 hover:text-slate-700">
                    <Flag className="h-4 w-4" />
                    Flag User
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
