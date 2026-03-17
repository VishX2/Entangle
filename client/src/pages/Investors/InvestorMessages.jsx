import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Paperclip,
  Smile,
  Send,
  MoreVertical,
  User,
  Check,
  CheckCheck,
} from "lucide-react";

export default function InvestorMessages() {
  const conversations = [
    {
      id: 1,
      name: "GreenLoop",
      avatar: "/avatars/greenloop.png",
      messages: [
        {
          sender: "startup",
          text: "Hello! Excited to connect with you.",
          time: "Yesterday",
        },
        {
          sender: "investor",
          text: "Hi GreenLoop! Tell me about your model.",
          time: "Yesterday",
          status: "read",
        },
        {
          sender: "startup",
          text: "We provide B2B waste-to-resource matching.",
          time: "Yesterday",
        },
        {
          sender: "investor",
          text: "Interesting. Can you share your deck?",
          time: "01:31 PM",
          status: "delivered",
        },
      ],
    },
    {
      id: 2,
      name: "FinBridge",
      avatar: "/avatars/finbridge.png",
      messages: [
        {
          sender: "startup",
          text: "Looking forward to the demo.",
          time: "Mon",
        },
      ],
    },
  ];

  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const updatedChat = {
      ...activeChat,
      messages: [
        ...activeChat.messages,
        {
          sender: "investor",
          text: newMessage,
          time: "Now",
          status: "sent",
        },
      ],
    };

    setActiveChat(updatedChat);
    setNewMessage("");
  };

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat]);

  const renderStatus = (status) => {
    if (!status) return null;

    if (status === "sent") {
      return <Check size={14} className="inline ml-1" />;
    }
    if (status === "delivered") {
      return <CheckCheck size={14} className="inline ml-1" />;
    }
    if (status === "read") {
      return (
        <CheckCheck
          size={14}
          className="inline ml-1 text-blue-200"
        />
      );
    }
  };

  return (
    <div className="h-screen flex bg-[#D8D4C5] font-sans">
      {/* Sidebar */}
      <div className="w-72.5 bg-[#2E3A4B] text-white flex flex-col">
        <div className="px-6 py-5 text-lg font-semibold">Messages</div>

        {/* Search */}
        <div className="px-4 pb-4">
          <div className="flex items-center bg-[#465F7F] rounded-lg px-3 py-2">
            <Search size={16} className="text-gray-300" />
            <input
              placeholder="Search conversations..."
              className="bg-transparent outline-none ml-2 text-sm w-full text-white placeholder-gray-300"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((c) => (
            <div
              key={c.id}
              onClick={() => setActiveChat(c)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer
              ${
                activeChat.id === c.id
                  ? "bg-[#465F7F]"
                  : "hover:bg-[#465F7F]/70"
              }`}
            >
              <img
                src={c.avatar}
                alt={c.name}
                className="w-10 h-10 rounded-full object-cover bg-gray-400"
              />

              <div className="flex-1">
                <div className="text-sm font-medium">{c.name}</div>
                <div className="text-xs text-gray-300 truncate">
                  {c.messages[c.messages.length - 1].text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 bg-white flex items-center justify-between px-6 border-b">
          <div className="flex items-center gap-3">
            <img
              src={activeChat.avatar}
              alt=""
              className="w-10 h-10 rounded-full object-cover bg-gray-400"
            />
            <div>
              <div className="font-semibold text-sm">{activeChat.name}</div>
              <div className="text-xs text-gray-500">Connected</div>
            </div>
          </div>

          <div className="flex gap-4 text-gray-600">
            <User size={18} />
            <MoreVertical size={18} />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 space-y-5 overflow-y-auto">
          {activeChat.messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "investor"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`px-5 py-3 rounded-2xl shadow-sm max-w-130 text-sm
                ${
                  msg.sender === "investor"
                    ? "bg-[#E66A4B] text-white"
                    : "bg-[#AFC2CF] text-[#2E3A4B]"
                }`}
              >
                {msg.text}
                <div className="text-xs mt-1 opacity-80 flex items-center justify-end gap-1">
                  {msg.time}
                  {msg.sender === "investor" &&
                    renderStatus(msg.status)}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white px-5 py-3 flex items-center gap-3 border-t">
          <Paperclip className="text-gray-500" size={20} />
          <Smile className="text-gray-500" size={20} />

          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-[#D8D4C5] rounded-full px-4 py-2 outline-none text-sm"
          />

          <button
            onClick={sendMessage}
            className="bg-[#E66A4B] p-3 rounded-xl text-white hover:bg-[#d75a3d] transition"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
