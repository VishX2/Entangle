import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight } from "lucide-react";
import { sendConnectionRequest } from "../store/userApi";
import { selectToken } from "../store/authSlice";

export default function ConnectButton({ companyId, variant = "default", className = "", children, redirectToRequests }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectToken);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async (e) => {
    e?.stopPropagation?.();
    if (!companyId || connecting) return;
    if (!isLoggedIn) {
      navigate("/login", { state: { from: { pathname: window.location.pathname } } });
      return;
    }
    setConnecting(true);
    const result = await dispatch(sendConnectionRequest({ to_company_id: companyId }));
    setConnecting(false);
    if (sendConnectionRequest.fulfilled.match(result)) {
      toast.success("Connect request sent");
      if (redirectToRequests) {
        navigate(redirectToRequests);
      }
    } else {
      const msg = result.payload || "Failed to send request";
      toast.error(msg === "Connection request already sent" ? "Connect request already sent" : msg);
    }
  };

  const baseClass = variant === "compact"
    ? "flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2B3443] text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
    : "flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2B3443] text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50";

  return (
    <button
      onClick={handleConnect}
      disabled={connecting}
      className={`${baseClass} ${className}`}
    >
      {children ?? (connecting ? "Sending…" : "Connect")}
      {!connecting && <ArrowRight size={14} />}
    </button>
  );
}
