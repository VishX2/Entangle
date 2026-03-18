import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { MessageCircle } from "lucide-react";
import { getOrCreateConversation, fetchConversations } from "../store/userApi";
import { selectToken, selectCurrentUser } from "../store/authSlice";

/**
 * MessageButton - Opens or creates a conversation with the company owner and navigates to messages.
 * Requires company with created_by (user id). Hidden if messaging self or not logged in.
 */
export default function MessageButton({ company, variant = "default", className = "" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector(selectToken);
  const currentUser = useSelector(selectCurrentUser);
  const [messaging, setMessaging] = useState(false);

  const base = location.pathname.startsWith("/investor")
    ? "/investor"
    : location.pathname.startsWith("/startup")
    ? "/startup"
    : "/entrepreneur";
  const messagesPath = `${base}/messages`;

  const ownerId = company?.created_by;
  const isSelf = ownerId != null && currentUser?.id === ownerId;

  const handleMessage = async (e) => {
    e?.stopPropagation?.();
    if (!ownerId || messaging || isSelf) return;
    if (!isLoggedIn) {
      navigate("/login", { state: { from: { pathname: window.location.pathname } } });
      return;
    }
    setMessaging(true);
    const result = await dispatch(getOrCreateConversation(ownerId));
    setMessaging(false);
    if (getOrCreateConversation.fulfilled.match(result)) {
      const conv = result.payload;
      await dispatch(fetchConversations());
      navigate(messagesPath, { state: { openConversationId: conv.id } });
    } else {
      toast.error(result.payload || "Could not start conversation");
    }
  };

  if (!isLoggedIn || !ownerId || isSelf) return null;

  const baseClass =
    variant === "compact"
      ? "flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-600 text-white text-sm font-medium hover:bg-slate-700 transition disabled:opacity-50"
      : "flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-600 text-white text-sm font-medium hover:bg-slate-700 transition disabled:opacity-50";

  return (
    <button onClick={handleMessage} disabled={messaging} className={`${baseClass} ${className}`}>
      <MessageCircle size={14} />
      {messaging ? "Opening…" : "Message"}
    </button>
  );
}
