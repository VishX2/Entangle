export function HeroSection() {
  return (
    <div className="rounded-2xl bg-linear-to-r from-[#2E3A4B] to-[#465F7F] text-white p-8">
      <p className="text-sm opacity-80">GOOD MORNING</p>
      <h1 className="text-3xl font-semibold mt-1">
        Welcome back, James
      </h1>
      <p className="text-sm mt-2 opacity-80">
        Here's what's happening in the startup and investment world today.
      </p>

      <div className="flex gap-4 mt-6">
        <StatCard title="Funding This Week" value="$1.2B" change="+18%" />
        <StatCard title="Deals Closed" value="47" change="+6" />
        <button className="bg-[#E66A4B] px-5 py-3 rounded-xl text-sm font-medium">
          Explore Markets →
        </button>
      </div>
    </div>
  );
}

function StatCard({ title, value, change }) {
  return (
    <div className="bg-white/10 rounded-xl px-4 py-3">
      <div className="text-xs opacity-80">{title}</div>
      <div className="text-lg font-semibold">
        {value}{" "}
        <span className="text-green-300 text-sm">{change}</span>
      </div>
    </div>
  );
}
