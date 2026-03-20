import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Sidebar from "../components/organisms/Sidebar";
import { fetchConnectionRequests, updateConnectionRequest } from "../store/adminApi";
import { selectConnectionRequests, selectAdminLoading } from "../store/adminSlice";

// Styling map for different request statuses
const STATUS_STYLE = {
  pending: "bg-amber-100 text-amber-800",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

// Get connection requests and loading state from Redux store
export default function ConnectionRequests() {
  const dispatch = useDispatch();
  const requests = useSelector(selectConnectionRequests);
  const loading = useSelector(selectAdminLoading);

  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(fetchConnectionRequests(filter ? { status: filter } : {}));
  }, [dispatch, filter]);

  // Approve connection request
  const handleApprove = (req) => {
    dispatch(updateConnectionRequest({ id: req.id, status: "accepted" }))
      .then((result) => {
        if (updateConnectionRequest.fulfilled.match(result)) {
          toast.success("Connection approved");
          dispatch(fetchConnectionRequests(filter ? { status: filter } : {}));
        } else {
          toast.error(result.payload || "Failed to approve");
        }
      });
  };

  // Reject connection request
  const handleReject = (req) => {
    dispatch(updateConnectionRequest({ id: req.id, status: "rejected" }))
      .then((result) => {
        if (updateConnectionRequest.fulfilled.match(result)) {
          toast.success("Connection rejected");
          dispatch(fetchConnectionRequests(filter ? { status: filter } : {}));
        } else {
          toast.error(result.payload || "Failed to reject");
        }
      });
  };

  // Calculate counts for dashboard cards
  const pendingCount = requests.filter((r) => (r.status || "").toLowerCase() === "pending").length;
  const acceptedCount = requests.filter((r) => (r.status || "").toLowerCase() === "accepted").length;
  const rejectedCount = requests.filter((r) => (r.status || "").toLowerCase() === "rejected").length;

  return (
    <div className="flex min-h-screen bg-[#f7f3ec]">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-semibold">Connection Requests</h1>
        <p className="text-slate-500 mb-6">
          Review and approve or reject user connection requests. Users send requests to connect with companies.
        </p>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Pending count */}  
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm">Pending</p>
            <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
          </div>

            {/* Accepted count */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm">Accepted</p>
            <p className="text-2xl font-bold text-green-600">{acceptedCount}</p>
          </div>

            {/* Rejected count */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm">Rejected</p>
            <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
          </div>

              {/* Total count */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm">Total</p>
            <p className="text-2xl font-bold">{requests.length}</p>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFilter("")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              !filter ? "bg-orange-500 text-white" : "bg-slate-200 text-slate-700 hover:bg-slate-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === "pending" ? "bg-amber-500 text-white" : "bg-slate-200 text-slate-700 hover:bg-slate-300"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("accepted")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === "accepted" ? "bg-green-500 text-white" : "bg-slate-200 text-slate-700 hover:bg-slate-300"
            }`}
          >
            Accepted
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === "rejected" ? "bg-red-500 text-white" : "bg-slate-200 text-slate-700 hover:bg-slate-300"
            }`}
          >
            Rejected
          </button>
        </div>

        {/* Table container */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading...</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left">From (User)</th>
                  <th className="px-6 py-4 text-left">To (Company)</th>
                  <th className="px-6 py-4 text-left">Message</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => {
                  const status = (r.status || "pending").toLowerCase();
                  const isPending = status === "pending";
                  return (
                    <tr
                      key={r.id}
                      className="border-b border-slate-200 last:border-0 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium">{r.from_name || r.from_email || `User #${r.from_user_id}`}</div>
                        <div className="text-xs text-slate-500">{r.from_email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{r.to_company_name || `Company #${r.to_company_id}`}</div>
                        <div className="text-xs text-slate-500 capitalize">{r.to_company_type || "—"}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 max-w-xs truncate">
                        {r.message || "—"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLE[status] || "bg-slate-100 text-slate-600"}`}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {r.created_at ? new Date(r.created_at).toLocaleString() : "—"}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {isPending && (
                          <>
                            <button
                              onClick={() => handleApprove(r)}
                              className="px-3 py-1.5 rounded-lg bg-green-500 text-white text-xs font-medium hover:bg-green-600"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(r)}
                              className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600"
                            >
                              Reject
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
          
          {/* Empty state */}
          {!loading && requests.length === 0 && (
            <div className="p-8 text-center text-slate-500">No connection requests yet.</div>
          )}
        </div>
      </main>
    </div>
  );
}
