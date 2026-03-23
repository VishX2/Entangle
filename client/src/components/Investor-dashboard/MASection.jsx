export default function MASection({ deals = [] }) {
  const cards =
    (deals || []).length > 0
      ? deals.slice(0, 3).map((d, idx) => ({
          id: d?.id ?? idx,
          title: `${d?.name || "Company"} → Dealflow`,
          value:
            typeof d?.value === "string" && d.value.startsWith("$")
              ? d.value
              : d?.value || "$120M",
        }))
      : [
          { id: "a", title: "TechCorp → DataFlow", value: "$120M" },
          { id: "b", title: "FinanceHub → PayLink", value: "$85M" },
          { id: "c", title: "HealthFirst → MediBot", value: "$210M" },
        ];

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Recent M&A Activity</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((d) => (
          <DealCard key={d.id} title={d.title} value={d.value} />
        ))}
      </div>
    </section>
  );
}

function DealCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition cursor-pointer relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-[#E66A4B]" />
      <h3 className="font-medium text-slate-800">{title}</h3>
      <p className="text-[#E66A4B] font-semibold mt-2 text-lg">{value}</p>
      <p className="text-xs text-slate-400 mt-1">Acquisition deal</p>
    </div>
  );
}
