export default function FilterBar({
  search,
  setSearch,
  industry,
  setIndustry,
  stage,
  setStage,
  location,
  setLocation,
  sort,
  setSort,
}) {
  return (
    <div className="bg-[#e7e4dc] rounded-2xl p-4">
      <div className="flex flex-wrap items-center gap-3">

        {/* Search */}
        <div className="flex items-center bg-[#f3f1ea] border border-[#d8d5cc] rounded-xl px-4 py-2 flex-1 min-w-[260px]">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search startups, industries..."
            className="bg-transparent outline-none text-sm ml-2 w-full text-slate-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Industry */}
        <Dropdown
          value={industry}
          onChange={setIndustry}
          options={[
            "All Industries",
            "Artificial Intelligence",
            "CleanTech",
            "FinTech",
            "HealthTech",
            "EdTech",
            "AgriTech",
            "SaaS",
            "E-Commerce",
            "Blockchain",
            "Logistics",
          ]}
        />

        {/* Stage */}
        <Dropdown
          value={stage}
          onChange={setStage}
          options={[
            "All Stages",
            "Pre-Seed",
            "Seed",
            "Series A",
            "Series B",
          ]}
        />

        {/* Location */}
        <Dropdown
          value={location}
          onChange={setLocation}
          options={[
            "All Locations",
            "San Francisco, CA",
            "Berlin, Germany",
            "London, UK",
            "Boston, MA",
            "Austin, TX",
            "Tel Aviv, Israel",
            "Toronto, Canada",
            "Paris, France",
            "Seattle, WA",
            "Singapore",
            "Tokyo, Japan",
            "New York, NY",
          ]}
        />

        {/* Sort Tabs (Exact style) */}
        <div className="bg-[#f3f1ea] border border-[#d8d5cc] rounded-2xl p-1 flex gap-1">
          <SortButton
            label="Top Rated"
            active={sort === "top"}
            onClick={() => setSort("top")}
          />
          <SortButton
            label="Newest"
            active={sort === "new"}
            onClick={() => setSort("new")}
          />
          <SortButton
            label="Trending"
            active={sort === "trending"}
            onClick={() => setSort("trending")}
          />
        </div>

      </div>
    </div>
  );
}

/* =====================================================
   SORT BUTTON
   ===================================================== */

function SortButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-5 py-2 text-sm font-medium rounded-xl transition
        ${
          active
            ? "bg-[#3e5a70] text-white shadow-sm"
            : "text-slate-600 hover:bg-[#dedad0]"
        }
      `}
    >
      {label}
    </button>
  );
}

/* =====================================================
   DROPDOWN
   ===================================================== */

function Dropdown({ value, onChange, options }) {
  return (
    <select
      className="bg-[#f3f1ea] border border-[#d8d5cc] rounded-xl px-4 py-2 text-sm text-slate-700"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  );
}

/* =====================================================
   SEARCH ICON
   ===================================================== */

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#64748b"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
