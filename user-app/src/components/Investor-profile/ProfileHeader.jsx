export default function ProfileHeader() {
  return (
    <div className="bg-linear-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-white flex flex-col md:flex-row justify-between">
      
      <div className="flex gap-4">
        <img
          src="https://i.pravatar.cc/150?img=32"
          alt="profile"
          className="w-20 h-20 rounded-full border-2 border-white"
        />

        <div>
          <h1 className="text-2xl font-semibold">Elena Martinez</h1>
          <p className="text-sm text-slate-300">
            Angel Investor • San Francisco, CA
          </p>

          <p className="text-sm mt-2 text-slate-300 max-w-xl">
            Backing visionary founders building the future of AI and sustainable technology.
          </p>

          <div className="flex gap-6 mt-3 text-sm">
            <span>2.5K Connections</span>
            <span>12.8K Followers</span>
            <span>847 Posts</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-4 md:mt-0">
        <button className="bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-medium">
          Edit Profile
        </button>
        <button className="border border-white/30 px-4 py-2 rounded-lg text-sm">
          Public Profile
        </button>
        <button className="bg-orange-500 px-4 py-2 rounded-lg text-sm font-medium">
          AI Suggestions
        </button>
      </div>
    </div>
  );
}
