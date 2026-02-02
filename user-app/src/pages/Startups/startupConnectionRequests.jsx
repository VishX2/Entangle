import { Check, X, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function StartupConnectionRequests() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Sequoia Capital",
      type: "Venture Capital",
      location: "California, USA",
      note: "Interested in learning more about your traction and roadmap.",
    },
    {
      id: 2,
      name: "Angel Network",
      type: "Angel Group",
      location: "London, UK",
      note: "We would like to explore a potential partnership opportunity.",
    },
  ]);

  const handleAccept = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleReject = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div
      className="min-h-screen px-10 py-8 space-y-10"
      style={{ backgroundColor: "#F5F1E3" }}
    ></div>