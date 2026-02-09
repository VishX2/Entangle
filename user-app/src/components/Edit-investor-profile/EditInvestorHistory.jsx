export default function EditInvestorHistory() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow">
      <h3 className="font-semibold mb-4">Investment History</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
        <div className="bg-gray-100 rounded-xl p-4">
          <p className="text-lg font-semibold">$4.2M</p>
          <p className="text-gray-500">Total Invested</p>
        </div>
        <div className="bg-gray-100 rounded-xl p-4">
          <p className="text-lg font-semibold">12</p>
          <p className="text-gray-500">Active Deals</p>
        </div>
        <div className="bg-gray-100 rounded-xl p-4">
          <p className="text-lg font-semibold">8</p>
          <p className="text-gray-500">Exits</p>
        </div>
        <div className="bg-gray-100 rounded-xl p-4">
          <p className="text-lg font-semibold">3.2x</p>
          <p className="text-gray-500">Avg ROI</p>
        </div>
      </div>

      <textarea
        className="w-full border rounded-xl p-3 mt-4"
        rows="3"
        defaultValue="Led the seed round for PaymentHub in 2019."
      />
    </div>
  );
}
