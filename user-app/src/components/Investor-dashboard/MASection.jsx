export function MASection() {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">
        Recent M&A Activity
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DealCard title="TechCorp → DataFlow" value="$120M" />
        <DealCard title="FinanceHub → PayLink" value="$85M" />
        <DealCard title="HealthFirst → MediBot" value="$210M" />
      </div>
    </section>
  );
}

function DealCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <h3 className="font-medium">{title}</h3>
      <p className="text-orange-500 font-semibold mt-1">
        {value}
      </p>
    </div>
  );
}
