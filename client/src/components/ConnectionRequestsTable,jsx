import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchConnectionRequestsSent } from "../store/userApi";
import { selectConnectionRequestsSent, selectUserLoading } from "../store/userSlice";

const STATUS_STYLE = {
  pending: "bg-amber-100 text-amber-800",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function ConnectionRequestsTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const requests = useSelector(selectConnectionRequestsSent) ?? [];
  const loading = useSelector(selectUserLoading);

  const base = location.pathname.startsWith("/investor")
    ? "/investor"
    : location.pathname.startsWith("/startup")
    ? "/startup"
    : "/entrepreneur";

  useEffect(() => {
    dispatch(fetchConnectionRequestsSent());
  }, [dispatch]);

  const pendingCount = requests.filter((r) => (r.status || "").toLowerCase() === "pending").length;
  const acceptedCount = requests.filter((r) => (r.status || "").toLowerCase() === "accepted").length;
  const rejectedCount = requests.filter((r) => (r.status || "").toLowerCase() === "rejected").length;

  const viewCompany = (companyId) => {
    navigate(`${base}/company/${companyId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">Connection Requests</h1>
        <p className="text-slate-500 mt-1">
          Requests you&apos;ve sent to connect with companies. Track status and view profiles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <p className="text-slate-500 text-sm">Pending</p>
          <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <p className="text-slate-500 text-sm">Accepted</p>
          <p className="text-2xl font-bold text-green-600">{acceptedCount}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <p className="text-slate-500 text-sm">Rejected</p>
          <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <p className="text-slate-500 text-sm">Total</p>
          <p className="text-2xl font-bold">{requests.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
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
                        {(status || "pending").charAt(0).toUpperCase() + (status || "pending").slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {r.created_at ? new Date(r.created_at).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
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
            No connection requests yet. Connect with companies from AI Matchmaking or company profiles.
          </div>
        )}
      </div>
    </div>
  );
}
