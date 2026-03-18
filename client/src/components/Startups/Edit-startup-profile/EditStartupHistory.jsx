import { useState } from "react";
import { TrendingUp, DollarSign, Target, CheckCircle } from "lucide-react";

export default function EditStartupHistory() {
  const [stats, setStats] = useState({
    totalInvested: "$4.2M",
    activeDeals: 12,
    exits: 8,
    avgRoi: "3.2x",
  });

  const [story, setStory] = useState(
    "Led the seed round for PaymentHub in 2019, which grew to process $2B annually and was acquired by FinanceCorp in 2023 for $180M, delivering an 18x return."
  );

  const updateStat = (key, value) => {
    setStats({ ...stats, [key]: value });
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="text-orange-500" size={20} />
        <h3 className="font-semibold text-slate-900">
          Investment History
        </h3>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

        <StatCard
          icon={<DollarSign className="text-orange-500" size={18} />}
          label="Total Invested"
          value={stats.totalInvested}
          onChange={(val) => updateStat("totalInvested", val)}
        />

        <StatCard
          icon={<Target className="text-slate-500" size={18} />}
          label="Active Deals"
          value={stats.activeDeals}
          onChange={(val) => updateStat("activeDeals", val)}
        />

        <StatCard
          icon={<CheckCircle className="text-green-500" size={18} />}
          label="Exits"
          value={stats.exits}
          onChange={(val) => updateStat("exits", val)}
        />

        <StatCard
          icon={<TrendingUp className="text-orange-500" size={18} />}
          label="Avg ROI"
          value={stats.avgRoi}
          onChange={(val) => updateStat("avgRoi", val)}
        />
      </div>

      {/* SUCCESS STORY */}
      <div>
        <h4 className="text-sm font-medium text-slate-700 mb-2">
          Featured Success Story
        </h4>

        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          className="w-full bg-slate-100 rounded-xl p-4 text-sm resize-none"
          rows="3"
        />

        <div className="text-right text-xs text-slate-400 mt-1">
          {story.length}/300
        </div>
      </div>
    </div>
  );
}

/* STAT CARD COMPONENT */

function StatCard({ icon, label, value, onChange }) {
  return (
    <div className="bg-slate-100 rounded-2xl p-4 text-center space-y-1">
      <div className="flex justify-center">{icon}</div>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-lg font-semibold text-slate-900 bg-transparent text-center w-full outline-none"
      />

      <div className="text-xs text-slate-500">
        {label}
      </div>
    </div>
  );
}
