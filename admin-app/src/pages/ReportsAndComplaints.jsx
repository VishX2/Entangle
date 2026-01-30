import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function ReportsAndComplaints() {
  const [reports, setReports] = useState([
    {
      id: "RPT-001",
      reporter: "InvestorA",
      entity: "TechVentures Inc.",
      entityType: "Startup",
      reason: "Fraudulent claims",
      priority: "High",
      status: "Open",
    },
    {
      id: "RPT-002",
      reporter: "StartupX",
      entity: "InvestorB",
      entityType: "Investor",
      reason: "Harassment",
      priority: "High",
      status: "Escalated",
    },
    {
      id: "RPT-003",
      reporter: "User123",
      entity: "Forum Post #456",
      entityType: "Content",
      reason: "Spam",
      priority: "Low",
      status: "Open",
    },
    {
      id: "RPT-004",
      reporter: "InvestorC",
      entity: "GreenEnergy Co.",
      entityType: "Startup",
      reason: "Misleading info",
      priority: "Medium",
      status: "Resolved",
    },
    {
      id: "RPT-005",
      reporter: "StartupY",
      entity: "InvestorD",
      entityType: "Investor",
      reason: "Unprofessional conduct",
      priority: "Low",
      status: "Dismissed",
    },
  ]);

  /* ---------- STATUS UPDATE HANDLER ---------- */
  const updateStatus = (id, newStatus) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === id
          ? { ...report, status: newStatus }
          : report
      )
    );
  };

  const statusBadge = (status) => {
    if (status === "Open") return "bg-blue-100 text-blue-600";
    if (status === "Escalated") return "bg-orange-100 text-orange-600";
    if (status === "Resolved") return "bg-green-100 text-green-600";
    return "bg-gray-100 text-gray-600";
  };

  const priorityColor = (priority) => {
    if (priority === "High") return "text-red-600";
    if (priority === "Medium") return "text-orange-500";
    return "text-gray-500";
  };

  return (
    <div className="flex min-h-screen bg-[#faf7f2]">
      <Sidebar />

      <main className="flex-1 p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Reports & Complaints
          </h1>
          <p className="text-sm text-gray-500">
            Review and manage user reports and platform complaints
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {["Open", "Escalated", "Resolved", "Dismissed"].map((status) => (
            <div
              key={status}
              className="bg-white border rounded-lg p-4"
            >
              <p className="text-sm text-gray-500">{status}</p>
              <p className="text-2xl font-semibold">
                {
                  reports.filter((r) => r.status === status)
                    .length
                }
              </p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-4 py-3">ID</th>
                <th className="text-left px-4 py-3">Reporter</th>
                <th className="text-left px-4 py-3">Reported Entity</th>
                <th className="text-left px-4 py-3">Reason</th>
                <th className="text-left px-4 py-3">Priority</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((r) => (
                <tr
                  key={r.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-4 text-gray-500">{r.id}</td>
                  <td className="px-4 py-4">{r.reporter}</td>
                  <td className="px-4 py-4">
                    <div className="font-medium">{r.entity}</div>
                    <div className="text-xs text-gray-400">
                      {r.entityType}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-500">{r.reason}</td>
                  <td
                    className={`px-4 py-4 font-medium ${priorityColor(
                      r.priority
                    )}`}
                  >
                    {r.priority}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(
                        r.status
                      )}`}
                    >
                      {r.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4 text-right space-x-3">
                    {r.status === "Open" && (
                      <>
                        <button
                          onClick={() =>
                            updateStatus(r.id, "Resolved")
                          }
                          className="text-green-600 hover:underline"
                        >
                          Resolve
                        </button>
                        <button
                          onClick={() =>
                            updateStatus(r.id, "Escalated")
                          }
                          className="text-orange-600 hover:underline"
                        >
                          Escalate
                        </button>
                        <button
                          onClick={() =>
                            updateStatus(r.id, "Dismissed")
                          }
                          className="text-gray-500 hover:underline"
                        >
                          Dismiss
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
