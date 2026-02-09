export default function EditInvestorPreferences() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow">
      <h3 className="font-semibold mb-4">Investment Preferences</h3>

      <div className="space-y-4 text-sm">
        <div>
          <label className="block mb-1 text-gray-500">
            Preferred Industries
          </label>
          <input
            className="w-full border rounded-xl p-2"
            defaultValue="FinTech, AI/ML, Climate Tech, SaaS"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-500">
            Investment Stages
          </label>
          <input
            className="w-full border rounded-xl p-2"
            defaultValue="Seed, Series A"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-500">
            Investment Range ($K)
          </label>
          <div className="flex gap-3">
            <input className="w-full border rounded-xl p-2" defaultValue="50" />
            <span className="self-center">to</span>
            <input className="w-full border rounded-xl p-2" defaultValue="500" />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-gray-500">
            Preferred Regions
          </label>
          <input
            className="w-full border rounded-xl p-2"
            defaultValue="North America, Europe"
          />
        </div>
      </div>
    </div>
  );
}
