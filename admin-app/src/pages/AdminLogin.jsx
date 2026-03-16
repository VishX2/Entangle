import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { loginAdmin } from "../store/adminApi";
import { clearError } from "../store/authSlice";
import { selectAuthLoading, selectAuthError } from "../store/authSlice";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const from = location.state?.from?.pathname || "/dashboard";
  const isLoading = useSelector(selectAuthLoading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    const result = await dispatch(loginAdmin({ email, password }));
    if (loginAdmin.fulfilled.match(result)) {
      toast.success("Signed in successfully");
      navigate(from, { replace: true });
    }
  };

  const error = useSelector(selectAuthError);
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#F7F3EC]">
      <div className="relative bg-gradient-to-br from-[#0F1C2E] via-[#162840] to-[#0F1C2E] text-white px-10 py-12 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center font-bold">E</div>
            <span className="text-xl font-semibold">Entangle</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight max-w-md">
            Connecting startups with investors through verified trust
          </h1>
          <p className="mt-4 text-gray-300">Secure platform management dashboard</p>
          <ul className="mt-10 space-y-5">
            <li className="flex gap-4 items-start">
              <span className="text-orange-500">✔</span>
              <div>
                <p className="font-medium">Startup Verification</p>
                <p className="text-sm text-gray-400">Gold, Silver, Bronze tiers</p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-orange-500">✔</span>
              <div>
                <p className="font-medium">CMS Control</p>
                <p className="text-sm text-gray-400">Content moderation</p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-orange-500">✔</span>
              <div>
                <p className="font-medium">Investor Safety</p>
                <p className="text-sm text-gray-400">Compliance controls</p>
              </div>
            </li>
          </ul>
        </div>
        <p className="text-xs text-gray-400">© 2026 Entangle. Enterprise Administration Portal.</p>
      </div>

      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-[#F3EFE7] rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="h-14 w-14 rounded-full bg-[#3E516A] flex items-center justify-center text-white text-xl">🛡️</div>
          </div>
          <h2 className="text-center text-2xl font-semibold text-[#1F2F46]">Secure System Control Panel</h2>
          <p className="text-center text-sm text-gray-500 mb-8">Platform management & verification</p>

          {location.state?.registered && (
            <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 text-sm">
              Account created. Please sign in.
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">{error}</div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="admin@entangle.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
            >
              {isLoading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-orange-500 font-medium hover:text-orange-600">
              Sign up
            </Link>
          </p>
          <p className="text-xs text-gray-400 mt-3 text-center">
            First to register becomes admin
          </p>
        </div>
      </div>
    </div>
  );
}
