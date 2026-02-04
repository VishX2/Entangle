function Badge({ label }) {
  return (
    <div className="border rounded-xl px-4 py-3 text-sm bg-white text-slate-600">
      {label}
    </div>
  );
}

export default function VerificationCard() {
  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold">Verification & Trust</h2>
        <span className="text-orange-500 font-medium">Trust Score 92%</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Badge label="Identity Verified" />
        <Badge label="Email Verified" />
        <Badge label="Platform Trust Badge" />
        <Badge label="License Agreement" />
      </div>
    </div>
  );
}
