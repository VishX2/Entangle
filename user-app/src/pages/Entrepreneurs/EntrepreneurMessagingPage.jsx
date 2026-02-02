import {
  Search,
  Send,
  MoreVertical,
  CheckCheck,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

/*  MOCK DATA  */
const conversations = [
  {
    id: 1,
    name: "Sarah Williams",
    company: "BluePeak Ventures",
    avatar: "SW",
    online: true,
    unread: 2,
    messages: [
      { fromMe: false, text: "Hi Jordan! Loved your startup vision 🚀", time: "10:20 AM" },
      { fromMe: true, text: "Thanks Sarah! Happy to connect.", time: "10:22 AM" },
      { fromMe: false, text: "Would love to hear more about your traction.", time: "10:25 AM" },
    ],
  },
  {
    id: 2,
    name: "Daniel Kim",
    company: "DK Capital",
    avatar: "DK",
    online: false,
    unread: 0,
    messages: [
      { fromMe: false, text: "Would love to discuss growth strategy.", time: "Yesterday" },
      { fromMe: true, text: "Sure, happy to chat this week.", time: "Yesterday" },
    ],
  },
  {
    id: 3,
    name: "Aisha Khan",
    company: "NextGen Labs",
    avatar: "AK",
    online: true,
    unread: 1,
    messages: [
      { fromMe: false, text: "Your product aligns well with our accelerator.", time: "9:40 AM" },
      { fromMe: true, text: "That’s great to hear!", time: "9:42 AM" },
    ],
  },
  {
    id: 4,
    name: "Michael Chen",
    company: "Orbit Angels",
    avatar: "MC",
    online: false,
    unread: 0,
    messages: [
      { fromMe: false, text: "Reviewed your pitch deck. Very solid.", time: "Mon" },
      { fromMe: true, text: "Thanks for taking a look!", time: "Mon" },
    ],
  },
  {
    id: 5,
    name: "Emily Rodriguez",
    company: "SeedSpark",
    avatar: "ER",
    online: true,
    unread: 3,
    messages: [
      { fromMe: false, text: "Let’s schedule a call 📞", time: "11:10 AM" },
      { fromMe: false, text: "Are you available tomorrow?", time: "11:12 AM" },
    ],
  },
  {
    id: 6,
    name: "James Patel",
    company: "FounderCircle",
    avatar: "JP",
    online: false,
    unread: 0,
    messages: [
      { fromMe: false, text: "Happy to mentor you on fundraising.", time: "Sun" },
      { fromMe: true, text: "That would be amazing, thank you!", time: "Sun" },
    ],
  },
  {
    id: 7,
    name: "Olivia Brown",
    company: "GrowthWorks",
    avatar: "OB",
    online: true,
    unread: 0,
    messages: [
      { fromMe: false, text: "Your go-to-market strategy looks sharp.", time: "Today" },
    ],
  },
  {
    id: 8,
    name: "Rahul Mehta",
    company: "ScaleX Partners",
    avatar: "RM",
    online: false,
    unread: 1,
    messages: [
      { fromMe: false, text: "Can you share your ARR numbers?", time: "Yesterday" },
    ],
  },
];
/*  COMPONENT  */
export default function EntrepreneurMessages() {
  const [selected, setSelected] = useState(conversations[0]);
  const [message, setMessage] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selected]);

  const sendMessage = () => {
    if (!message.trim()) return;

    selected.messages.push({
      fromMe: true,
      text: message,
      time: "Now",
    });

    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[#F7F3E6] p-6">

      <div className="bg-white rounded-3xl shadow-sm border border-[#3F5C7D]/30
                      grid grid-cols-1 md:grid-cols-[360px_1fr]
                      overflow-hidden"></div>
 {/*  LEFT: CONVERSATIONS  */}
        <div className="border-r border-[#3F5C7D]/20 bg-gradient-to-b from-white to-[#FAF9F6]">

          {/* Header */}
          <div className="p-5 border-b border-[#3F5C7D]/20">
            <h2 className="text-xl font-bold text-[#0F172A]">
              Messages
            </h2>

            <div className="mt-3 flex items-center gap-2
                            bg-[#F7F3E6] rounded-xl px-3 py-2">
              <Search size={16} className="text-[#64748B]" />
              <input
                placeholder="Search conversations"
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
          </div>
             {/* Conversation List */}
          <div className="divide-y divide-[#3F5C7D]/10">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={`w-full flex gap-4 p-4 text-left transition
                  ${
                    selected.id === c.id
                      ? "bg-[#F7F3E6]"
                      : "hover:bg-[#FAF9F6]"
                  }`}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full
                                  bg-gradient-to-br from-[#9EC7DD] to-[#E5E7EB]
                                  flex items-center justify-center
                                  font-bold text-[#0F172A]">
                    {c.avatar}
                  </div>
                  {c.online && (
                    <span className="absolute bottom-0 right-0
                                     w-3 h-3 bg-green-500
                                     border-2 border-white rounded-full" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-[#0F172A]">
                      {c.name}
                    </p>
                    {c.unread > 0 && (
                      <span className="text-xs bg-[#F97316] text-white
                                       px-2 py-0.5 rounded-full">
                        {c.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#64748B] truncate">
                    {c.messages[c.messages.length - 1]?.text}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

