export default function MASection() {
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
    <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-100 
                    hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] 
                    transition duration-200 cursor-pointer relative overflow-hidden">

      {/* Accent top bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#E66A4B]" />

      <h3 className="font-medium text-slate-800">
        {title}
      </h3>

      <p className="text-[#E66A4B] font-semibold mt-2 text-lg">
        {value}
      </p>

      <p className="text-xs text-slate-400 mt-1">
        Acquisition deal
      </p>
    </div>
  );
}
