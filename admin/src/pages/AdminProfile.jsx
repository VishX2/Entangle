import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Mail, Shield, UserRound, PencilLine } from "lucide-react";
import Sidebar from "../components/organisms/Sidebar";
import { selectCurrentUser } from "../store/authSlice";

const fieldLabels = {
  first_name: "First name",
  last_name: "Last name",
  email: "Email address",
  username: "Username",
  phone: "Phone number",
};

export default function AdminProfile() {
  const user = useSelector(selectCurrentUser);

  const visibleFields = Object.entries(fieldLabels).filter(([key]) => user?.[key]);

  return (
    <div className="flex min-h-screen bg-[#F5F0DD]">
      <Sidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto h-screen">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Admin Profile</h1>
            <p className="text-slate-500">
              Review your account details and keep your admin information up to date.
            </p>
          </div>

          <Link
            to="/profile/edit"
            className="inline-flex items-center gap-2 rounded-lg bg-[#2F3B4B] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#24303d]"
          >
            <PencilLine className="h-4 w-4" />
            Edit profile
          </Link>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D8E6F2] text-[#2F3B4B]">
                <UserRound className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  {[user?.first_name, user?.last_name].filter(Boolean).join(" ") || "Administrator"}
                </h2>
                <p className="text-sm text-slate-500">
                  Signed in as {user?.email || "no email available"}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {visibleFields.length > 0 ? (
                visibleFields.map(([key, label]) => (
                  <DetailCard
                    key={key}
                    label={label}
                    value={String(user[key])}
                    icon={key === "email" ? Mail : UserRound}
                  />
                ))
              ) : (
                <EmptyState />
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <InfoPanel
              title="Access level"
              body="Your account has administrator access to moderation, reports, and platform management tools."
              icon={Shield}
            />
            <InfoPanel
              title="Profile tips"
              body="Keep your contact details current so other admins can identify and coordinate with you quickly."
              icon={Mail}
            />
          </aside>
        </section>
      </main>
    </div>
  );
}

function DetailCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <p className="mt-2 break-words text-base font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function InfoPanel({ title, body, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D8E6F2] text-[#2F3B4B]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{body}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500 md:col-span-2">
      No profile details are available yet. Use the edit screen to add your information.
    </div>
  );
}
