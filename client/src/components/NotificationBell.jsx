import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell } from "lucide-react";
import { fetchNotifications, markNotificationRead, markAllNotificationsRead } from "../store/userApi";
import { selectToken } from "../store/authSlice";

/** Poll interval so admin-approved connections (etc.) show up without full page refresh */
const NOTIFICATION_POLL_MS = 45_000;

export default function NotificationBell() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isLoggedIn = useSelector(selectToken);
  const notifications = useSelector((s) => s.user?.notifications) ?? [];

  const refresh = useCallback(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedIn) return;
    refresh();
  }, [isLoggedIn, location.pathname, refresh]);

  useEffect(() => {
    if (!isLoggedIn) return;
    const id = window.setInterval(refresh, NOTIFICATION_POLL_MS);
    return () => window.clearInterval(id);
  }, [isLoggedIn, refresh]);

  useEffect(() => {
    if (!isLoggedIn) return;
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [isLoggedIn, refresh]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  const handleClick = (n) => {
    if (!n.read_at) dispatch(markNotificationRead(n.id));
    if (n.link) navigate(n.link);
    setOpen(false);
  };

  const handleMarkAllRead = () => {
    dispatch(markAllNotificationsRead());
  };

  if (!isLoggedIn) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-semibold bg-[#E66A4B] text-white rounded-full px-1">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-80 max-h-96 overflow-hidden bg-white rounded-xl shadow-lg border border-slate-200 z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <span className="font-semibold text-slate-800">Notifications</span>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs text-[#E66A4B] hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-72 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-slate-500">
                No notifications yet
              </div>
            ) : (
              notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => handleClick(n)}
                  className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition border-b border-slate-50 last:border-0 ${
                    !n.read_at ? "bg-[#E66A4B]/5" : ""
                  }`}
                >
                  <div className="font-medium text-slate-800 text-sm">{n.title}</div>
                  {n.body && (
                    <div className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.body}</div>
                  )}
                  <div className="text-[10px] text-slate-400 mt-1">
                    {n.created_at
                      ? new Date(n.created_at).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
