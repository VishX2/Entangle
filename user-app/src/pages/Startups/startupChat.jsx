import { Search } from "lucide-react";

export default function Messages() {
  const messages = [
    {
      id: 1,
      name: "TechVentures Capital",
      text: "Thanks for sharing the pitch deck",
      time: "10 min ago",
      unread: 2,
    },
    {
      id: 2,
      name: "Innovation Fund",
      text: "Interested in learning more",
      time: "1 hour ago",
      unread: 1,
    },
    {
      id: 3,
      name: "Sarah Chen",
      text: "Looking forward to our meeting next week",
      time: "3 hours ago",
      unread: 0,
    },
    {
      id: 4,
      name: "Angel Investor Network",
      text: "Your product looks promising. Let's connect",
      time: "5 hours ago",
      unread: 0,
    },
    {
      id: 5,
      name: "DataFlow Startup",
      text: "Would love to collaborate on this project",
      time: "2 days ago",
      unread: 0,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm h-[78vh] flex overflow-hidden">

      {/* ===== LEFT PANEL ===== */}
      <div className="w-[380px] bg-white flex flex-col">

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-xl font-semibold text-[#0F172A]">
            Messages
          </h2>
          <p className="text-sm text-gray-500">
            Manage your conversations
          </p>
        </div>

        {/* Search */}
        <div className="px-6 pb-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg
                         bg-[#F4F1EB] text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#F97316]"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 pb-4 flex gap-6 text-sm font-medium">
          <button className="text-[#0F172A] relative">
            All
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#F97316]" />
          </button>
          <button className="text-gray-400 hover:text-[#0F172A]">
            Unread
          </button>
          <button className="text-gray-400 hover:text-[#0F172A]">
            Investors
          </button>
        </div>

        {/* Message List (NO DIVIDERS) */}
        <ul className="flex-1 overflow-y-auto px-4 space-y-2">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className="
                rounded-xl px-4 py-3 cursor-pointer
                transition
                hover:bg-[#F4F1EB]
              "
            >
              <div className="flex justify-between items-start">
                <p className="font-medium text-[#0F172A]">
                  {msg.name}
                </p>

                {msg.unread > 0 && (
                  <span className="bg-[#F97316] text-white text-xs px-2 py-0.5 rounded-full">
                    {msg.unread}
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-500 truncate mt-1">
                {msg.text}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {msg.time}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* ===== RIGHT EMPTY STATE ===== */}
      <div className="flex-1 bg-[#F4F1EB] flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div
            className="mx-auto w-20 h-20 rounded-full
                       bg-white flex items-center justify-center
                       text-gray-400 shadow-sm"
          >
            <Search size={32} />
          </div>

          <h3 className="mt-6 font-semibold text-[#0F172A]">
            Select a conversation
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Choose a message from the list to view the conversation
          </p>

          <button
            className="mt-6 bg-[#141657] text-white
                       px-5 py-2.5 rounded-lg
                       hover:bg-[#eb7734] transition"
          >
            View Messages
          </button>
        </div>
      </div>

    </div>
  );
}
