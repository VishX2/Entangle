export default function AdminLogin() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#F7F3EC]">
      
      {/* LEFT PANEL */}
      <div className="relative bg-gradient-to-br from-[#0F1C2E] via-[#162840] to-[#0F1C2E] text-white px-10 py-12 flex flex-col justify-between">
        
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center font-bold">
              E
            </div>
            <span className="text-xl font-semibold">Entangle</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold leading-tight max-w-md">
            Connecting startups with investors through verified trust
          </h1>
          <p className="mt-4 text-gray-300">
            Secure platform management dashboard
          </p>

          {/* Feature List */}
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

        {/* Footer */}
        <p className="text-xs text-gray-400">
          © 2026 Entangle. All rights reserved. <br />
          Enterprise Administration Portal v2.1
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-[#F3EFE7] rounded-2xl shadow-xl p-8">
          
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="h-14 w-14 rounded-full bg-[#3E516A] flex items-center justify-center text-white text-xl">
              🛡️
            </div>
          </div>

          <h2 className="text-center text-2xl font-semibold text-[#1F2F46]">
            Secure System Control Panel
          </h2>
          <p className="text-center text-sm text-gray-500 mb-8">
            Platform management & verification
          </p>

          {/* Form */}
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Administrator username"
                className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Secure password"
                className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="text-right">
              <button type="button" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Sign In
            </button>
          </form>

          {/* Footer note */}
          <p className="text-xs text-gray-500 mt-6 text-center">
            Restricted to authorized administrators only.  
            All login activity is monitored for platform integrity.
          </p>
        </div>
      </div>
    </div>
  );
}
