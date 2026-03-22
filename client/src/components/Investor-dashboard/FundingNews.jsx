export default function FundingNews({ startups = [] }) {
  const primary = startups[0];
  const secondary = startups[1];

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Latest Funding News</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 md:items-start gap-4">
        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition cursor-pointer">
          <div className="overflow-hidden">
            <img
              src="/images/building.svg"
              alt="FinTech funding"
              className="h-44 w-full object-cover"
            />
          </div>
          <div className="p-4">
            <span className="text-xs bg-slate-200 px-2 py-1 rounded">Funding Round</span>
            <h3 className="font-semibold mt-2">
              {primary?.name
                ? `${primary.name} raises major round`
                : "FinTech startup raises major round"}
            </h3>
            <p className="text-sm text-gray-500">$25M Series A · 2h ago</p>
          </div>
        </div>

        <div className="space-y-4">
          <SmallFundingCard
            title={
              secondary?.name
                ? `${secondary.name} secures growth funding`
                : "AI platform secures growth funding"
            }
            tag="Investor Insight"
            image="/images/ai.svg"
          />
          <SmallFundingCard
            title="Climate tech energy platform funding"
            tag="Funding Round"
            image="/images/wind.svg"
          />
        </div>
      </div>
    </section>
  );
}

function SmallFundingCard({ title, tag, image }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg hover:-translate-y-1 transition cursor-pointer">
      <div className="overflow-hidden">
        <img src={image} alt="" className="h-32 w-full object-cover" />
      </div>
      <div className="p-3">
        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">{tag}</span>
        <p className="text-sm font-medium mt-2">{title}</p>
      </div>
    </div>
  );
}
