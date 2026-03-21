import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye } from "lucide-react";
import Sidebar from "../components/organisms/Sidebar";
import { fetchCompanies, updateCompany } from "../store/adminApi";
import { selectCompanies, selectAdminLoading } from "../store/adminSlice";

const STATUS_STYLES = {
  Pending: "bg-blue-100 text-blue-700",
  Verified: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const TIERS = ["gold", "silver", "bronze", "none"];

export default function StartupVerification() {
  const dispatch = useDispatch();

  // Get startup data and loading state from Redux store
  const startups = useSelector(selectCompanies);
  const loading = useSelector(selectAdminLoading);

  // Fetch startup-type companies when component mounts
  useEffect(() => {
    dispatch(fetchCompanies({ type: "startup" }));
  }, [dispatch]);

  // Mark a startup as verified
  const markVerified = (id) => {
    dispatch(updateCompany({ id, is_verified: true }));
  };

  // Reject a startup (set inactive)
  const rejectStartup = (id) => {
    dispatch(updateCompany({ id, is_active: false }));
  };

  // Update verification tier
  const setTier = (id, verification_tier) => {
    dispatch(updateCompany({ id, verification_tier }));
  };

  // Determine status label based on company properties
  const getStatus = (c) => {
    if (!c.is_active) return "Rejected";
    return c.is_verified ? "Verified" : "Pending";
  };

  // Compute dashboard counts for each status category
  const counts = {
    Pending: startups.filter((c) => c.is_active && !c.is_verified).length,
    Verified: startups.filter((c) => c.is_verified).length,
    Rejected: startups.filter((c) => !c.is_active).length,
  };

  return (
    <div className="flex min-h-screen bg-[#f7f3ec]">
      <Sidebar />

      {/* Main content area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-semibold">Startup Verification</h1>
        <p className="text-slate-500 mb-6">
          Manage startup identity & compliance verification
        </p>

        {/* Summary cards showing counts of each status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(counts).map(([label, value]) => (
            <div
              key={label}
              className="bg-white rounded-xl p-5 shadow-sm border border-slate-200"
            >
              <p className="text-slate-500 text-sm">{label}</p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        {/* Table container */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading...</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left">Startup Name</th>
                  <th className="px-6 py-4 text-left">Type</th>
                  <th className="px-6 py-4 text-left">Verification Tier</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Created</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {startups.map((c) => {
                  const status = getStatus(c);
                  return (
                    <tr key={c.id} className="border-b border-slate-200 last:border-0 hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium">{c.name}</td>
                      <td className="px-6 py-4 text-slate-500 capitalize">
                        {c.company_type}
                      </td>

                      <td className="px-6 py-4 text-slate-500 capitalize">
                        {c.verification_tier || "none"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[status]}`}
                        >
                          {status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-slate-500">
                        {c.created_at
                          ? new Date(c.created_at).toLocaleDateString()
                          : "-"}
                      </td>

                      {/* Status badge */}
                      <td className="px-6 py-4">
                        <div className="flex justify-end items-center gap-2 flex-wrap">
                          <button
                            className="text-slate-500 hover:text-slate-800 transition"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>

                          {status === "Pending" && (
                            <>
                              <button
                                onClick={() => markVerified(c.id)}
                                className="text-green-600 hover:scale-110 transition px-2"
                                title="Verify"
                              >
                                ✔
                              </button>
                              <button
                                onClick={() => rejectStartup(c.id)}
                                className="text-red-500 hover:scale-110 transition px-2"
                                title="Reject"
                              >
                                ✖
                              </button>
                            </>
                          )}

                          {/* Dropdown to change verification tier */}
                          <select
                            value={c.verification_tier || "none"}
                            onChange={(e) =>
                              setTier(c.id, e.target.value || null)
                            }
                            className="text-sm border border-slate-200 rounded px-2 py-1"
                          >
                            {TIERS.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          
          {!loading && startups.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No startups found
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
