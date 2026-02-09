export default function EditInvestorCompleteness() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow">
      <h3 className="font-semibold mb-3">Profile Completeness</h3>
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div className="bg-orange-500 h-2 rounded-full w-3/4" />
      </div>
      <p className="text-sm text-gray-500 mt-2">78% complete</p>
    </div>
  );
}
