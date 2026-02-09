export default function EditInvestorConnectPanel() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow">
      <h3 className="font-semibold mb-4">Connect & Interact</h3>
      <div className="space-y-3">
        <button className="w-full bg-orange-500 text-white py-2 rounded-xl">
          Connect
        </button>
        <button className="w-full bg-gray-100 py-2 rounded-xl">
          Pitch Startup
        </button>
        <button className="w-full bg-gray-100 py-2 rounded-xl">
          Message
        </button>
      </div>
    </div>
  );
}
