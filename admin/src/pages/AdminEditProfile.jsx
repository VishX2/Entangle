import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../components/organisms/Sidebar";
import { setUser, selectCurrentUser } from "../store/authSlice";
import { fetchMe, updateMe } from "../store/adminApi";

export default function AdminEditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    dispatch(fetchMe()).then((result) => {
      if (fetchMe.fulfilled.match(result) && result.payload) {
        dispatch(setUser(result.payload));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    setForm({
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
    });
  }, [user]);

  const disabled = useMemo(
    () => !form.first_name.trim() || !form.last_name.trim() || !form.email.trim() || saving,
    [form, saving]
  );

  const onChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      email: form.email.trim(),
    };

    const result = await dispatch(updateMe(payload));
    setSaving(false);

    if (updateMe.fulfilled.match(result)) {
      dispatch(setUser(result.payload));
      toast.success("Profile updated successfully");
      navigate("/profile", { replace: true });
      return;
    }

    toast.error(result.payload || "Failed to update profile");
  };

  return (
    <div className="flex min-h-screen bg-[#f7f3ec]">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-semibold">Edit Profile</h1>
        <p className="text-slate-500 mb-6">Update your personal details</p>

        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Field
              id="first_name"
              label="First Name"
              value={form.first_name}
              onChange={onChange("first_name")}
            />
            <Field
              id="last_name"
              label="Last Name"
              value={form.last_name}
              onChange={onChange("last_name")}
            />
            <Field id="email" label="Email" type="email" value={form.email} onChange={onChange("email")} />

            <div className="flex items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={disabled}
                className="px-4 py-2 rounded-lg bg-[#2F3B4B] text-white hover:bg-[#243140] disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

function Field({ id, label, value, onChange, type = "text" }) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm text-slate-600">{label}</span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-[#9EC0DB] focus:border-[#9EC0DB]"
      />
    </label>
  );
}
