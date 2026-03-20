import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Mail, User, ShieldCheck, PencilLine } from "lucide-react";
import Sidebar from "../components/organisms/Sidebar";
import { selectCurrentUser } from "../store/authSlice";

export default function AdminProfile() {
  const user = useSelector(selectCurrentUser);

  const displayName = useMemo(() => {
    const fullName = `${user?.first_name || ""} ${user?.last_name || ""}`.trim();
    return fullName || "Administrator";
  }, [user]);

  return (
    <div className="flex min-h-screen bg-[#f7f3ec]">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-semibold">Admin Profile</h1>
        <p className="text-slate-500 mb-6">View your account details and role information</p>

        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">{displayName}</h2>
              <p className="text-sm text-slate-500 mt-1">Manage your admin account details</p>
            </div>
            <Link
              to="/profile/edit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2F3B4B] text-white hover:bg-[#243140] transition"
            >
              <PencilLine className="h-4 w-4" />
              Edit Profile
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard icon={User} label="First Name" value={user?.first_name || "-"} />
            <InfoCard icon={User} label="Last Name" value={user?.last_name || "-"} />
            <InfoCard icon={Mail} label="Email" value={user?.email || "-"} />
            <InfoCard
              icon={ShieldCheck}
              label="Role"
              value={Number(user?.role_id) === 1 ? "Admin" : "User"}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
      <p className="mt-2 text-slate-800 font-medium break-words">{value}</p>
    </div>
  );
}
