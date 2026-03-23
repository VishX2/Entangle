import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/authSlice";

export function HeroSection({
  fundingValue = "$1.2B",
  fundingChange = "+18%",
  dealsValue = "47",
  dealsChange = "+6%",
  primaryActionText = "Explore Markets →",
}) {
  const user = useSelector(selectCurrentUser);
  const firstName =
    user?.first_name || user?.firstName || user?.name || "Founder";

  return (
    <div className="rounded-2xl bg-linear-to-r from-[#2E3A4B] to-[#465F7F] text-white p-6 shadow-sm hover:shadow-xl transition duration-300">
      <p className="text-sm opacity-80">GOOD MORNING</p>
      <h1 className="text-3xl font-semibold mt-1">
        Welcome back, {firstName}
      </h1>
      <p className="text-sm mt-2 opacity-80">
        Your growth metrics, milestones, and next moves — right here.
      </p>

      <div className="flex flex-wrap gap-3 sm:gap-4 mt-5">
        <StatCard
          title="Funding This Week"
          value={fundingValue}
          change={fundingChange}
        />
        <StatCard title="Deals Closed" value={dealsValue} change={dealsChange} />

        <button className="bg-[#E66A4B] px-5 py-3 rounded-xl text-sm font-medium hover:bg-[#d85e40] hover:scale-105 transition duration-200">
          {primaryActionText}
        </button>
      </div>
    </div>
  );
}

function StatCard({ title, value, change }) {
  return (
    <div className="bg-white/10 rounded-xl px-4 py-3 hover:bg-white/20 hover:scale-105 transition duration-200 cursor-pointer">
      <div className="text-xs opacity-80">{title}</div>
      <div className="text-lg font-semibold">
        {value}{" "}
        <span className="text-green-300 text-sm">{change}</span>
      </div>
    </div>
  );
}
