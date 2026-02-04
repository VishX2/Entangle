function Stat({ label, value }) {
  return (
    <div className="border rounded-xl p-4 text-center">
      <p className="text-lg font-semibold">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

export default function InvestmentHistory() {
  return (
    <div className="bg-white rounded-2xl p-6">
      <h2 className="font-semibold mb-4">Investment History</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Total Investments" value="47" />
        <Stat label="Active" value="23" />
        <Stat label="Exited" value="18" />
        <Stat label="Avg Investment" value="$125K" />
      </div>
    </div>
  );
}
