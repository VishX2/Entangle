export function MarketSnapshot() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow">
      <h3 className="font-semibold mb-3">Market Snapshot</h3>
      <p className="text-sm">Funding This Week</p>
      <p className="text-lg font-semibold">$1.2B</p>
      <p className="text-sm mt-3">Deals Closed</p>
      <p className="text-lg font-semibold">47</p>
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
    <div className="bg-white rounded-2xl p-5 shadow">
      <h3 className="font-semibold mb-3">Trending Industries</h3>
      {industries.map((ind, i) => (
        <div key={i} className="text-sm py-1">
          {ind}
        </div>
      ))}
    </div>
  );
}

export function RecommendedStartups() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow">
      <h3 className="font-semibold mb-3">
        Recommended Startups
      </h3>
      <p className="text-sm">Lumosa AI</p>
      <p className="text-sm">EcoVolt</p>
      <p className="text-sm">Paystream</p>

      <button className="mt-4 w-full bg-[#E66A4B] text-white py-2 rounded-xl">
        Explore More Startups
      </button>
    </div>
  );
}
