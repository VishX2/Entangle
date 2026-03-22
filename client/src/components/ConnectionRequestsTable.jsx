import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  fetchConnectionRequestsSent,
  fetchConnectionRequestsIncoming,
  respondConnectionRequest,
} from "../store/userApi";
import {
  selectConnectionRequestsSent,
  selectConnectionRequestsIncoming,
  selectUserLoading,
} from "../store/userSlice";

const STATUS_STYLE = {
  pending: "bg-amber-100 text-amber-800",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  awaiting_recipient: "bg-sky-100 text-sky-800",
  recipient_declined: "bg-orange-100 text-orange-800",
};

function formatStatus(s) {
  const x = (s || "pending").toLowerCase();
  return x.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function ConnectionRequestsTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const requests = useSelector(selectConnectionRequestsSent) ?? [];
  const incoming = useSelector(selectConnectionRequestsIncoming) ?? [];
  const loading = useSelector(selectUserLoading);

  const base = location.pathname.startsWith("/investor")
    ? "/investor"
    : location.pathname.startsWith("/startup")
    ? "/startup"
    : "/entrepreneur";

  useEffect(() => {
    dispatch(fetchConnectionRequestsSent());
    dispatch(fetchConnectionRequestsIncoming());
  }, [dispatch]);

  const pendingCount = requests.filter((r) => (r.status || "").toLowerCase() === "pending").length;
  const acceptedCount = requests.filter((r) => (r.status || "").toLowerCase() === "accepted").length;
  const rejectedCount = requests.filter((r) => {
    const s = (r.status || "").toLowerCase();
    return s === "rejected" || s === "recipient_declined";
  }).length;
  const awaitingYouCount = requests.filter((r) => (r.status || "").toLowerCase() === "awaiting_recipient").length;

  const viewCompany = (companyId) => {
    navigate(`${base}/company/${companyId}`);
  };

  const handleRespond = async (id, action) => {
    const result = await dispatch(respondConnectionRequest({ id, action }));
    if (respondConnectionRequest.fulfilled.match(result)) {
      toast.success(action === "accept" ? "Connection confirmed" : "Declined");
      dispatch(fetchConnectionRequestsIncoming());
      dispatch(fetchConnectionRequestsSent());
    } else {
      toast.error(result.payload || "Could not update request");
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">Connection Requests</h1>
        <p className="text-slate-500 mt-1">
          Incoming requests to approve, and requests you&apos;ve sent. Admin must approve first; then the
          company owner accepts or declines.
        </p>
      </div>

      {incoming.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-3">Needs your response</h2>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left font-medium text-slate-700">From</th>
                  <th className="px-6 py-4 text-left font-medium text-slate-700">Your company</th>
                  <th className="px-6 py-4 text-left font-medium text-slate-700">Message</th>
                  <th className="px-6 py-4 text-right font-medium text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {incoming.map((r) => {
                  const from = r.fromUser || {};
                  const fromName =
                    `${from.first_name || ""} ${from.last_name || ""}`.trim() || from.email || "User";
                  const co = r.toCompany || {};
                  return (
                    <tr key={r.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-800">{fromName}</td>
                      <td className="px-6 py-4">{co.name || "—"}</td>
                      <td className="px-6 py-4 text-slate-500 max-w-xs truncate">{r.message || "—"}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => handleRespond(r.id, "accept")}
                          className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-medium hover:bg-green-700"
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRespond(r.id, "decline")}
                          className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-medium hover:bg-slate-50"
                        >
                          Decline
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-3">Your outgoing requests</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm">Pending (admin)</p>
            <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm">Awaiting company</p>
            <p className="text-2xl font-bold text-sky-600">{awaitingYouCount}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm">Connected</p>
            <p className="text-2xl font-bold text-green-600">{acceptedCount}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm">Declined / rejected</p>
            <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-6">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading…</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left font-medium text-slate-700">To Company</th>
                  <th className="px-6 py-4 text-left font-medium text-slate-700">Type</th>
                  <th className="px-6 py-4 text-left font-medium text-slate-700">Message</th>
                  <th className="px-6 py-4 text-left font-medium text-slate-700">Status</th>
                  <th className="px-6 py-4 text-left font-medium text-slate-700">Date</th>
                  <th className="px-6 py-4 text-right font-medium text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => {
                  const status = (r.status || "pending").toLowerCase();
                  const company = r.toCompany || {};
                  return (
                    <tr
                      key={r.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800">{company.name || `Company #${r.to_company_id}`}</div>
                        {company.headquarters && (
                          <div className="text-xs text-slate-500">{company.headquarters}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-600 capitalize">{company.company_type || "—"}</td>
                      <td className="px-6 py-4 text-slate-500 max-w-xs truncate">{r.message || "—"}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            STATUS_STYLE[status] || "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {formatStatus(status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {r.created_at ? new Date(r.created_at).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => viewCompany(r.to_company_id)}
                          className="text-[#EF6F5B] hover:text-[#e85a45] font-medium text-sm"
                        >
                          View Company
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {!loading && requests.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No outgoing connection requests yet. Connect with companies from AI Matchmaking or company profiles.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
