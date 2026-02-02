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
    >

      {/* HEADER */}
      <section>
        <h1 className="text-2xl font-semibold text-[#2B3443]">
          Connection Requests
        </h1>
        <p className="text-sm text-[#3F5D7D] mt-1">
          Investors who want to connect with your startup
        </p>
      </section>

      {/* REQUEST LIST */}
      <section className="space-y-6">
        {requests.length === 0 && <EmptyState />}

        {requests.map((req) => (
          <RequestCard
            key={req.id}
            request={req}
            onAccept={() => handleAccept(req.id)}
            onReject={() => handleReject(req.id)}
          />
        ))}
      </section>
    </div>
  );
}
