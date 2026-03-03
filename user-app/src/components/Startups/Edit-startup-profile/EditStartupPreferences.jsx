import { useState } from "react";
import { Target } from "lucide-react";

function TagRow({ title, items = [], setItems }) {
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    const value = prompt(`Add ${title}`);
    if (value && value.trim()) {
      setItems([...items, value.trim()]);
    }
  };

  return (
    <div className="mb-6">
      <div className="text-sm font-medium text-slate-700 mb-2">
        {title}
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm flex items-center gap-2"
          >
            {item}
            <button
              onClick={() => removeItem(index)}
              className="text-orange-500"
            >
              ×
            </button>
          </span>
        ))}

        <button
          onClick={addItem}
          className="px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-sm"
        >
          + Add
        </button>
      </div>
    </div>
  );
}

export default function EditStartupPreferences() {
  const [industries, setIndustries] = useState([
    "FinTech",
    "AI/ML",
    "Climate Tech",
    "SaaS",
  ]);

  const [stages, setStages] = useState(["Seed", "Series A"]);

  const [regions, setRegions] = useState([
    "North America",
    "Europe",
  ]);

  const [minRange, setMinRange] = useState(50);
  const [maxRange, setMaxRange] = useState(500);

  return (
    <div className="bg-white rounded-3xl p-6 shadow">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Target className="text-orange-500" size={18} />
        <h3 className="font-semibold text-slate-900">
          Investment Preferences
        </h3>
      </div>

      {/* Preferred Industries */}
      <TagRow
        title="Preferred Industries"
        items={industries}
        setItems={setIndustries}
      />

      {/* Investment Stages */}
      <TagRow
        title="Investment Stages"
        items={stages}
        setItems={setStages}
      />

      {/* Investment Range */}
      <div className="mb-6">
        <div className="text-sm font-medium text-slate-700 mb-3">
          Investment Range
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-slate-500">$</span>

          <input
            type="number"
            value={minRange}
            onChange={(e) => setMinRange(Number(e.target.value))}
            className="w-20 bg-slate-100 rounded-lg px-3 py-2 text-sm"
          />

          <span className="text-slate-500">K to $</span>

          <input
            type="number"
            value={maxRange}
            onChange={(e) => setMaxRange(Number(e.target.value))}
            className="w-20 bg-slate-100 rounded-lg px-3 py-2 text-sm"
          />

          <span className="text-slate-500">K</span>
        </div>

        {/* Slider */}
        <input
          type="range"
          min="0"
          max="1000"
          value={maxRange}
          onChange={(e) => setMaxRange(Number(e.target.value))}
          className="w-full accent-orange-500"
        />
      </div>

      {/* Preferred Regions */}
      <TagRow
        title="Preferred Regions"
        items={regions}
        setItems={setRegions}
      />
    </div>
  );
}
