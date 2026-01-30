import { useState, useRef, useEffect } from "react";

const TierDropdown = ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const tiers = ["Gold", "Silver", "Bronze"];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
      >
        Tier
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 rounded-lg border bg-white shadow-lg z-50">
          {tiers.map((tier) => (
            <button
              key={tier}
              onClick={() => {
                onChange(tier);
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            >
              {tier}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TierDropdown;
