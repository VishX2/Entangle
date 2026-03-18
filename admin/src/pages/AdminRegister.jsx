import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { registerUser } from "../store/adminApi";
import { clearRegisterError } from "../store/authSlice";
import { selectRegisterLoading, selectRegisterError } from "../store/authSlice";

export default function AdminRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectRegisterLoading);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearRegisterError());
    const result = await dispatch(
      registerUser({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      })
    );
    if (registerUser.fulfilled.match(result)) {
      toast.success("Account created successfully");
      navigate("/login", { replace: true, state: { registered: true } });
    }
  };

  const error = useSelector(selectRegisterError);
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
            Create your account
          </h1>
          <p className="mt-4 text-gray-300">Join the platform as a new user</p>
          <ul className="mt-10 space-y-5">
            <li className="flex gap-4 items-start">
              <span className="text-orange-500">✔</span>
              <div>
                <p className="font-medium">Quick setup</p>
                <p className="text-sm text-gray-400">Get started in minutes</p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-orange-500">✔</span>
              <div>
                <p className="font-medium">Secure</p>
                <p className="text-sm text-gray-400">Your data is protected</p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-orange-500">✔</span>
              <div>
                <p className="font-medium">Admin access</p>
                <p className="text-sm text-gray-400">Contact admin for elevated access</p>
              </div>
            </li>
          </ul>
        </div>
        <p className="text-xs text-gray-400">© 2026 Entangle. Enterprise Administration Portal.</p>
      </div>

      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-[#F3EFE7] rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="h-14 w-14 rounded-full bg-[#3E516A] flex items-center justify-center text-white text-xl">📝</div>
          </div>
          <h2 className="text-center text-2xl font-semibold text-[#1F2F46]">Create Account</h2>
          <p className="text-center text-sm text-gray-500 mb-8">Register a new user account</p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">{error}</div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">First name</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last name</label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Min 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                minLength={6}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
            >
              {isLoading ? "Creating account…" : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 font-medium hover:text-orange-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
