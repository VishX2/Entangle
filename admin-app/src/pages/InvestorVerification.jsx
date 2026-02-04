import { useState } from "react";
import Sidebar from "../components/Sidebar";

/* ---------------- STATUS STYLES ---------------- */

const STATUS_STYLES = {
  Pending: "bg-blue-100 text-blue-700",
  Verified: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

/* ================= PAGE ================= */

export default function InvestorVerification() {
  const [investors, setInvestors] = useState([
    {
      id: 1,
      name: "Capital Partners LLC",
      type: "Institution",
      brn: "BRN-2024-001234",
      status: "Pending",
      documents: 6,
      submitted: "2024-01-15",
    },
    {
      id: 2,
      name: "John Anderson",
      type: "Individual",
      brn: "ID-98765432",
      status: "Verified",
      documents: 4,
      submitted: "2024-01-10",
    },
    {
      id: 3,
      name: "Venture Holdings Inc.",
      type: "Company",
      brn: "BRN-2024-005678",
      status: "Verified",
      documents: 8,
      submitted: "2024-01-08",
    },
    {
      id: 4,
      name: "Sarah Mitchell",
      type: "Individual",
      brn: "ID-12345678",
      status: "Pending",
      documents: 3,
      submitted: "2024-01-14",
    },
    {
      id: 5,
      name: "Global Investments Group",
      type: "Institution",
      brn: "BRN-2024-009012",
      status: "Rejected",
      documents: 5,
      submitted: "2024-01-05",
    },
  ]);

  /* ---------------- ACTIONS ---------------- */

  const approveInvestor = (id) => {
    setInvestors((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: "Verified" } : i
      )
    );
  };

  const rejectInvestor = (id) => {
    setInvestors((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: "Rejected" } : i
      )
    );
  };

  /* ---------------- COUNTS ---------------- */

  const counts = investors.reduce((acc, i) => {
    acc[i.status] = (acc[i.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex min-h-screen bg-[#f7f3ec]">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-semibold">
          Investor Verification
        </h1>
        <p className="text-slate-500 mb-6">
          Manage investor identity & compliance verification
        </p>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {["Pending", "Verified", "Rejected"].map((label) => (
            <div
              key={label}
              className="bg-white rounded-xl p-5 border border-gray-200"
            >
              <p className="text-slate-500 text-sm">{label}</p>
              <p className="text-2xl font-bold">
                {counts[label] || 0}
              </p>
            </div>
          ))}
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-4 text-left">Investor Name</th>
                <th className="px-6 py-4 text-left">Investor Type</th>
                <th className="px-6 py-4 text-left">BRN / ID</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Documents</th>
                <th className="px-6 py-4 text-left">Submitted</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {investors.map((i) => (
                <tr key={i.id} className="border-b last:border-0">
                  <td className="px-6 py-4 font-medium">
                    {i.name}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {i.type}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {i.brn}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[i.status]}`}
                    >
                      {i.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {i.documents} files
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {i.submitted}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-4">
                      {i.status === "Pending" && (
                        <>
                          <button
                            onClick={() => approveInvestor(i.id)}
                            className="text-green-600 hover:scale-110 transition"
                          >
                            ✔
                          </button>
                          <button
                            onClick={() => rejectInvestor(i.id)}
                            className="text-red-500 hover:scale-110 transition"
                          >
                            ✖
                          </button>
                        </>
                      )}
                    </div>
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
