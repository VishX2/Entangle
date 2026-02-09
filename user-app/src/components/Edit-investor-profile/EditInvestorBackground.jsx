export default function EditInvestorBackground() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow">
      <h3 className="font-semibold mb-4">Background & Experience</h3>

      <div className="space-y-4 text-sm">
        <div>
          <label className="block mb-1 text-gray-500">
            Experience Summary
          </label>
          <textarea
            className="w-full border rounded-xl p-3"
            rows="4"
            defaultValue="Former CTO at TechVenture Inc. with a successful exit."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-gray-500">
              Years of Experience
            </label>
            <input
              className="w-full border rounded-xl p-2"
              defaultValue="15"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-500">
              Investments Made
            </label>
            <input
              className="w-full border rounded-xl p-2"
              defaultValue="42"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-gray-500">
            Areas of Expertise
          </label>
          <input
            className="w-full border rounded-xl p-2"
            defaultValue="Product Strategy, Technical Due Diligence"
          />
        </div>
      </div>
    </div>
  );
}
