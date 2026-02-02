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

/* COMPONENTS */

function RequestCard({ request, onAccept, onReject }) {
  return (
    <div
      className="bg-white rounded-3xl p-6 transition-all duration-300
                 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex justify-between items-start gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#2B3443]">
            {request.name}
          </h3>
          <p className="text-sm text-[#3F5D7D] mt-0.5">
            {request.type} · {request.location}
          </p>
        </div>

        <div className="flex gap-2">
          <ActionButton
            label="Accept"
            icon={Check}
            bg="#EF6C4E"
            text="white"
            onClick={onAccept}
          />
          <ActionButton
            label="Decline"
            icon={X}
            bg="#9EC6DC"
            text="#2B3443"
            onClick={onReject}
          />
        </div>
      </div>

      {request.note && (
        <div
          className="mt-4 rounded-xl p-4 text-sm"
          style={{ backgroundColor: "#F5F1E3", color: "#2B3443" }}
        >
          {request.note}
        </div>
      )}

      <button
        className="mt-4 flex items-center gap-2 text-sm font-medium
                   transition hover:underline"
        style={{ color: "#EF6C4E" }}
      >
        <MessageSquare size={16} />
        View profile & message
      </button>
    </div>
  );
}

