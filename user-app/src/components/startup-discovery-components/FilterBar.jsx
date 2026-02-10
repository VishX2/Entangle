export default function FilterBar({
  search,
  setSearch,
  industry,
  setIndustry,
  stage,
  setStage,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-wrap gap-4 items-center">
      <input
        type="text"
        placeholder="Search startups..."
        className="border rounded-lg px-4 py-2 flex-1 min-w-50"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border rounded-lg px-4 py-2"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
      >
        <option>All</option>
        <option>Artificial Intelligence</option>
        <option>HealthTech</option>
        <option>FinTech</option>
      </select>

      <select
        className="border rounded-lg px-4 py-2"
        value={stage}
        onChange={(e) => setStage(e.target.value)}
      >
        <option>All</option>
        <option>Seed</option>
        <option>Series A</option>
        <option>Series B</option>
      </select>
    </div>
  );
}
