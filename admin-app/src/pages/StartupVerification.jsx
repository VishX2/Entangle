import { useState } from "react";
import { NavLink } from "react-router-dom";
import TierDropdown from "../components/TierDropdown";
import {
  LayoutGrid,
  ShieldCheck,
  MessageSquare,
  AlertTriangle,
  LogOut,
} from "lucide-react";

/* -------------------- STATUS STYLES -------------------- */

const STATUS_STYLES = {
  Pending: "bg-blue-100 text-blue-700",
  Gold: "bg-yellow-100 text-yellow-700",
  Silver: "bg-slate-100 text-slate-700",
  Bronze: "bg-orange-100 text-orange-700",
  Rejected: "bg-red-100 text-red-700",
};

/* ================= PAGE ================= */

export default function StartupVerification() {
  const [startups, setStartups] = useState([
    {
      id: 1,
      name: "TechVentures Inc.",
      industry: "SaaS",
      status: "Gold",
      documents: 5,
      submitted: "2024-01-15",
    },
    {
      id: 2,
      name: "GreenEnergy Co.",
      industry: "CleanTech",
      status: "Silver",
      documents: 8,
      submitted: "2024-01-10",
    },
    {
      id: 3,
      name: "FinanceFlow",
      industry: "FinTech",
      status: "Silver",
      documents: 6,
      submitted: "2024-01-08",
    },
    {
      id: 4,
      name: "HealthHub",
      industry: "HealthTech",
      status: "Pending",
      documents: 4,
      submitted: "2024-01-14",
    },
    {
      id: 5,
      name: "EduLearn",
      industry: "EdTech",
      status: "Bronze",
      documents: 3,
      submitted: "2024-01-05",
    },
    {
      id: 6,
      name: "DataDrive",
      industry: "AI/ML",
      status: "Pending",
      documents: 7,
      submitted: "2024-01-13",
    },
  ]);

  /* ---------------- ACTIONS ---------------- */

  const approveStartup = (id) => {
    setStartups((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: "Gold" } : s
      )
    );
  };

  const rejectStartup = (id) => {
    setStartups((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: "Rejected" } : s
      )
    );
  };

  const changeTier = (id, tier) => {
    setStartups((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: tier } : s
      )
    );
  };

  /* ---------------- COUNTS ---------------- */

  const counts = startups.reduce(
    (acc, s) => {
      acc[s.status] = (acc[s.status] || 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <div className="flex min-h-screen bg-[#f7f3ec]">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-[#0f172a] text-slate-200 flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <div className="text-xl font-bold">Entangle</div>
          <div className="mt-4 border-t border-slate-700" />
        </div>

        <nav className="flex-1 space-y-2 px-4">
          <SidebarItem
            to="/dashboard"
            icon={LayoutGrid}
            label="Dashboard"
          />
          <SidebarItem
            to="/startup-verification"
            icon={ShieldCheck}
            label="Startup Verification"
          />
          <SidebarItem
            to="/content-moderation"
            icon={MessageSquare}
            label="Content Moderation"
          />
          <SidebarItem
            to="/reports"
            icon={AlertTriangle}
            label="Reports & Complaints"
          />
        </nav>

        <div className="px-6 my-4 border-t border-slate-700" />

        <div className="p-4 text-sm opacity-70 hover:text-white cursor-pointer flex items-center gap-3">
          <LogOut className="h-4 w-4" />
          Logout
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-semibold">
          Startup Verification
        </h1>
        <p className="text-slate-500 mb-6">
          Manage startup verification tiers: Gold, Silver,
          Bronze
        </p>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {[
            { label: "Pending", color: "text-blue-600" },
            { label: "Gold", color: "text-yellow-600" },
            { label: "Silver", color: "text-slate-600" },
            { label: "Bronze", color: "text-orange-600" },
            { label: "Rejected", color: "text-red-600" },
          ].map(({ label, color }) => (
            <div
              key={label}
              className="bg-white rounded-xl p-5 border border-gray-200"
            >
              <p className="text-slate-500 text-sm">
                {label}
              </p>
              <p
                className={`text-2xl font-bold ${color}`}
              >
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
                <th className="px-6 py-4 text-left">
                  Startup
                </th>
                <th className="px-6 py-4 text-left">
                  Industry
                </th>
                <th className="px-6 py-4 text-left">
                  Status
                </th>
                <th className="px-6 py-4 text-left">
                  Documents
                </th>
                <th className="px-6 py-4 text-left">
                  Submitted
                </th>
                <th className="px-6 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {startups.map((s) => (
                <tr
                  key={s.id}
                  className="border-b last:border-0"
                >
                  <td className="px-6 py-4 font-medium">
                    {s.name}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {s.industry}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[s.status]}`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {s.documents} files
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {s.submitted}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end items-center gap-4">
                      {s.status === "Pending" && (
                        <>
                          <button
                            onClick={() =>
                              approveStartup(s.id)
                            }
                            className="text-green-600 hover:scale-110 transition"
                          >
                            ✔
                          </button>
                          <button
                            onClick={() =>
                              rejectStartup(s.id)
                            }
                            className="text-red-500 hover:scale-110 transition"
                          >
                            ✖
                          </button>
                        </>
                      )}
                      <TierDropdown
                        onChange={(tier) =>
                          changeTier(s.id, tier)
                        }
                      />
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

/* ================= SIDEBAR ITEM ================= */

function SidebarItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
          isActive
            ? "bg-orange-500 text-white"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }`
      }
    >
      <Icon className="h-5 w-5" />
      <span className="text-sm font-medium">
        {label}
      </span>
    </NavLink>
  );
}
