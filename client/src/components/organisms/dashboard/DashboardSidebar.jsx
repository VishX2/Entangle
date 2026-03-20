const MARKET_LABELS = {
  investor: { title: 'Market Snapshot', row1: 'Funding This Week', row2: 'Deals Closed' },
  startup: { title: 'Market Snapshot', row1: 'Funding This Week', row2: 'Deals Closed' },
  entrepreneur: { title: 'Funding Overview', row1: 'Funding This Week', row2: 'Investor Activity' },
};

export function MarketSnapshot({ type = 'investor', fundingValue, dealsValue }) {
  const labels = MARKET_LABELS[type] || MARKET_LABELS.investor;
  const funding = fundingValue || '$1.2B';
  const deals = dealsValue || (type === 'entrepreneur' ? '89' : '47');
  return (
    <div className="bg-white rounded-2xl p-5 shadow">
      <h3 className="font-semibold mb-3">{labels.title}</h3>
      <p className="text-sm">{labels.row1}</p>
      <p className="text-lg font-semibold">{funding}</p>
      <p className="text-sm mt-3">{labels.row2}</p>
      <p className="text-lg font-semibold">{deals}</p>
    </div>
  );
}

export function TrendingIndustries({ type = 'investor' }) {
  const industries = ['Artificial Intelligence', 'FinTech', 'Climate Tech', 'HealthTech', 'SaaS'];
  const title = type === 'entrepreneur' ? 'Hot Sectors for Founders' : 'Trending Industries';
  return (
    <div className="bg-white rounded-2xl p-5 shadow">
      <h3 className="font-semibold mb-3">{title}</h3>
      {industries.map((ind, i) => (
        <div key={i} className="text-sm py-1">
          {ind}
        </div>
      ))}
    </div>
  );
}

export function RecommendedStartups({ items = ['Lumosa AI', 'EcoVolt', 'Paystream'], onExplore }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow">
      <h3 className="font-semibold mb-3">Recommended Startups</h3>
      {items.slice(0, 3).map((item, idx) => (
        <p key={`${item}-${idx}`} className="text-sm">
          {item}
        </p>
      ))}
      <button onClick={onExplore} className="mt-4 w-full bg-[#E66A4B] text-white py-2 rounded-xl">
        Explore More Startups
      </button>
    </div>
  );
}

export function RecommendedInvestors({ type = 'investor' }) {
  const title = type === 'entrepreneur' ? 'Investors for Your Venture' : 'Recommended Investors';
  const btnText = type === 'entrepreneur' ? 'Find More Investors' : 'Explore More Investors';
  return (
    <div className="bg-white rounded-2xl p-5 shadow">
      <h3 className="font-semibold mb-3">{title}</h3>
      <p className="text-sm">Lumosa AI</p>
      <p className="text-sm">EcoVolt</p>
      <p className="text-sm">Paystream</p>
      <button className="mt-4 w-full bg-[#E66A4B] text-white py-2 rounded-xl">
        {btnText}
      </button>
    </div>
  );
}
