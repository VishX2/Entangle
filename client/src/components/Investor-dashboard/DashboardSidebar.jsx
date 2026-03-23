export function MarketSnapshot({
  fundingValue = "$1.2B",
  dealsValue = "47",
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <h3 className="font-semibold mb-3">Market Snapshot</h3>
      <p className="text-sm">Funding This Week</p>
      <p className="text-lg font-semibold">{fundingValue}</p>
      <p className="text-sm mt-3">Deals Closed</p>
      <p className="text-lg font-semibold">{dealsValue}</p>
    </div>
  );
}

export function TrendingIndustries() {
  const industries = [
    "Artificial Intelligence",
    "FinTech",
    "Climate Tech",
    "HealthTech",
    "SaaS",
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <h3 className="font-semibold mb-3">Trending Industries</h3>
      {industries.map((ind, i) => (
        <div key={i} className="text-sm py-1">
          {ind}
        </div>
      ))}
    </div>
  );
}

export function RecommendedStartups({ startups = [] }) {
  const names = (startups || []).length
    ? startups.slice(0, 3).map((s) => s?.name).filter(Boolean)
    : ["Lumosa AI", "EcoVolt", "Paystream"];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <h3 className="font-semibold mb-3">Recommended Startups</h3>
      {names.map((name) => (
        <p key={name} className="text-sm">
          {name}
        </p>
      ))}

      <button
        type="button"
        className="mt-4 w-full bg-[#E66A4B] text-white py-2 rounded-xl hover:bg-[#d85e40] transition"
      >
        Explore More Startups
      </button>
    </div>
  );
}
