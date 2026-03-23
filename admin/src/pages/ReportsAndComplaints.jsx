import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/organisms/Sidebar";
import { fetchReports, updateReport } from "../store/adminApi";
import { selectReports, selectAdminLoading } from "../store/adminSlice";

//Maps backend status values to UI display values
const STATUS_MAP = {
  pending: "Open",
  resolved: "Resolved",
  escalated: "Escalated",
  dismissed: "Dismissed",
};

//Returns Tailwind CSS styles based on report status
const statusBadge = (status) => {
  const s = (status || "").toLowerCase();
  if (s === "pending" || s === "open") return "bg-blue-100 text-blue-600";
  if (s === "escalated") return "bg-orange-100 text-orange-600";
  if (s === "resolved") return "bg-green-100 text-green-600";
  return "bg-surface-alt text-text-muted";
};

//Color coding for priority level
const priorityColor = (priority) => {
  const p = (priority || "").toLowerCase();
  if (p === "high") return "text-red-600";
  if (p === "medium") return "text-orange-500";
  return "text-gray-500";
};

export default function ReportsAndComplaints() {
  // Redux dispatch
  const dispatch = useDispatch();
  //Get reports and loading state from Redux store
  const reports = useSelector(selectReports);
  const loading = useSelector(selectAdminLoading);

  // Fetch reports when page loads calls backend
  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  //update report status by dispatching updateReport action with report ID and new status
  const updateStatus = (id, status) => {
    dispatch(updateReport({ id, status }));
  };

  //Helper function to convert backend status to user-friendly display status
  const displayStatus = (s) => STATUS_MAP[(s || "").toLowerCase()] || s || "Open";

  //Dashboard summary counts
  const counts = {
    Open: reports.filter((r) => (r.status || "").toLowerCase() === "pending").length,
    Escalated: reports.filter((r) => (r.status || "").toLowerCase() === "escalated").length,
    Resolved: reports.filter((r) => (r.status || "").toLowerCase() === "resolved").length,
    Dismissed: reports.filter((r) => (r.status || "").toLowerCase() === "dismissed").length,
  };

  return (
    <div className="flex min-h-screen bg-[#f7f3ec]">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-semibold">Reports & Complaints</h1>
        <p className="text-slate-500 mb-6">
          Review and manage user reports and platform complaints
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {["Open", "Escalated", "Resolved", "Dismissed"].map((status) => (
            <div
              key={status}
              className="bg-white rounded-xl p-5 shadow-sm border border-slate-200"
            >
              <p className="text-slate-500 text-sm">{status}</p>
              <p className="text-2xl font-bold">{counts[status] ?? 0}</p>
            </div>
          ))}
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading...</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-surface-alt border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left">ID</th>
                  <th className="px-6 py-4 text-left">Reporter</th>
                  <th className="px-6 py-4 text-left">Reported Entity</th>
                  <th className="px-6 py-4 text-left">Reason</th>
                  <th className="px-6 py-4 text-left">Priority</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {reports.map((r) => {
                  const status = (r.status || "").toLowerCase();
                  const isPending = status === "pending";
                  return (
                    <tr
                      key={r.id}
                      className="border-b border-slate-200 last:border-0 hover:bg-gray-50 transition"
                    >
                      {/* Report ID */}
                      <td className="px-6 py-4 text-slate-500">#{r.id}</td>
                      {/* Reporter */}
                      <td className="px-6 py-4">{r.reporter || "Unknown"}</td>
                      {/* Company / Entity */}
                      <td className="px-6 py-4">
                        <div className="font-medium">
                          {r.company_name || `Company #${r.company_id || "-"}`}
                        </div>
                        <div className="text-xs text-gray-400 capitalize">
                          {r.type || "content"}
                        </div>
                      </td>

                      {/* Reason */}
                      <td className="px-6 py-4 text-slate-500 max-w-xs truncate">
                        {r.content || "-"}
                      </td>
                      {/* Priority */}
                      <td
                        className={`px-6 py-4 font-medium ${priorityColor(
                          r.priority
                        )}`}
                      >
                        {r.priority || "Medium"}
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(
                            r.status
                          )}`}
                        >
                          {displayStatus(r.status)}
                        </span>
                      </td>

                      {/* Admin Actions - only visible for pending reports */}
                      <td className="px-6 py-4 text-right space-x-3">
                        {isPending && (
                          <>
                            <button
                              onClick={() => updateStatus(r.id, "resolved")}
                              className="text-green-600 hover:underline"
                            >
                              Resolve
                            </button>
                            <button
                              onClick={() => updateStatus(r.id, "escalated")}
                              className="text-orange-600 hover:underline"
                            >
                              Escalate
                            </button>
                            <button
                              onClick={() => updateStatus(r.id, "dismissed")}
                              className="text-gray-500 hover:underline"
                            >
                              Dismiss
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {/* Empty state when no reports are found */}
          {!loading && reports.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No reports found
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
