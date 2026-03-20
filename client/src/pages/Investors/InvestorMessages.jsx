import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
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
import { fetchConversations, fetchMessages, sendMessage as sendMessageApi } from "../../store/userApi";

export default function InvestorMessages() {
  const dispatch = useDispatch();
  const location = useLocation();
  const openConversationId = location.state?.openConversationId;
  const conversationsList = useSelector((s) => s.user?.conversations) || [];
  const messagesList = useSelector((s) => s.user?.messages) || [];
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  useEffect(() => {
    if (activeChat?.id) {
      dispatch(fetchMessages(activeChat.id));
    }
  }, [dispatch, activeChat?.id]);

  const conversations = conversationsList.map((c) => ({
    id: c.id,
    name: c.other_user?.name || c.other_user?.email || "Unknown",
    avatar: c.other_user?.profile_picture || null,
    lastMessage: c.last_message,
  }));

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeChat?.id) return;
    const result = await dispatch(sendMessageApi({ conversationId: activeChat.id, content: newMessage.trim() }));
    if (sendMessageApi.fulfilled.match(result)) {
      setNewMessage("");
      dispatch(fetchMessages(activeChat.id));
    }
  };

  const messages = messagesList.map((m) => ({
    sender: m.is_mine ? "investor" : "startup",
    text: m.content,
    time: m.created_at ? new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "",
  }));

  useEffect(() => {
    if (conversations.length === 0) return;
    if (openConversationId) {
      const conv = conversations.find((c) => c.id === openConversationId);
      if (conv) setActiveChat(conv);
      else setActiveChat(conversations[0]);
    } else if (!activeChat) {
      setActiveChat(conversations[0]);
    }
  }, [conversations, activeChat, openConversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  const renderStatus = (_status) => {
    const status = _status;
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
      <div className="w-72.5 bg-[#2E3A4B] text-white flex flex-col">
        <div className="px-6 py-5 text-lg font-semibold">Messages</div>

        <div className="px-4 pb-4">
          <div className="flex items-center bg-[#465F7F] rounded-lg px-3 py-2">
            <Search size={16} className="text-gray-300" />
            <input
              placeholder="Search conversations..."
              className="bg-transparent outline-none ml-2 text-sm w-full text-white placeholder-gray-300"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((c) => (
            <div
              key={c.id}
              onClick={() => setActiveChat(c)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer
              ${
                activeChat?.id === c.id
                  ? "bg-[#465F7F]"
                  : "hover:bg-[#465F7F]/70"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
                {c.avatar ? (
                  <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <User size={20} className="text-[#465F7F]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{c.name}</div>
                <div className="text-xs text-gray-300 truncate">
                  {c.lastMessage?.content || "No messages yet"}
                </div>
              </div>
            </div>
          ))}
          {conversations.length === 0 && (
            <div className="px-4 py-6 text-sm text-gray-400 text-center">No conversations yet</div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
        <div className="h-16 bg-white flex items-center justify-between px-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
              {activeChat.avatar ? (
                <img
                  src={activeChat.avatar}
                  alt={activeChat.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <User size={20} className="text-[#465F7F]" />
              )}
            </div>
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

        <div className="flex-1 p-6 space-y-5 overflow-y-auto">
          {messages.map((msg, i) => (
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
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

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
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation or start a new one from a company profile
          </div>
        )}
      </div>
    </div>
  );
}
