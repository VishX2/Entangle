export default function StartupCard({ startup }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">{startup.name}</h3>
          <span className="text-[#ff6b4a] font-semibold">
            ★ {startup.rating}
          </span>
        </div>

        <p className="text-sm text-gray-500">{startup.location}</p>

        <p className="mt-3 text-sm text-gray-600">
          {startup.description}
        </p>

        <div className="flex gap-2 mt-4 text-xs">
          <span className="bg-gray-100 px-2 py-1 rounded">
            {startup.industry}
          </span>
          <span className="bg-gray-100 px-2 py-1 rounded">
            {startup.stage}
          </span>
        </div>
      </div>

      <button className="mt-5 bg-[#ff6b4a] text-white py-2 rounded-lg">
        View Profile
      </button>
    </div>
  );
}
