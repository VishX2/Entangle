export default function EditInvestorPrivacy() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow">
      <h3 className="font-semibold mb-4">Privacy & Settings</h3>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span>Profile Visibility</span>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="flex justify-between">
          <span>Allow Messages</span>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="flex justify-between">
          <span>Accept Pitch Requests</span>
          <input type="checkbox" defaultChecked />
        </div>
      </div>
    </div>
  );
}
