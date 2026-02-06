import { useState, useRef, useEffect } from "react";

const InvestorActionDropdown = ({
  onVerify,
  onViewDocs,
  onRequestInfo,
}) => {
  const [open, setOpen] = useState(false);
  const [openUpwards, setOpenUpwards] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    // If dropdown would go above viewport - open DOWN
    setOpenUpwards(rect.top > 180);
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={handleToggle}
        className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
      >
        Actions
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute right-0 w-56 rounded-lg border bg-white shadow-lg z-50 ${
            openUpwards
              ? "bottom-full mb-2"
              : "top-full mt-2"
          }`}
        >
          <button
            onClick={() => {
              onVerify();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            ✔ Mark as Verified
          </button>

          <button
            onClick={() => {
              onViewDocs();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            📄 View Documents
          </button>

          <button
            onClick={() => {
              onRequestInfo();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100 text-orange-600"
          >
            ✉ Request Additional Info
          </button>
        </div>
      )}
    </div>
  );
};

export default InvestorActionDropdown;
