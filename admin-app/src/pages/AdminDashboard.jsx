import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#f7f3ec]">
      <Sidebar />
      <main className="flex-1 p-8 space-y-8">
        <Header />
        <Stats />
        <Charts />
        <RecentActivity />
      </main>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="w-64 bg-[#0f172a] text-slate-200 flex flex-col">
      <div className="p-6 text-xl font-bold">Entangle</div>
      <nav className="flex-1 space-y-2 px-4">
        <Item active label="Dashboard" />
        <Item label="Startup Verification" />
        <Item label="Content Moderation" />
        <Item label="Reports & Complaints" />
      </nav>
      <div className="p-4 text-sm opacity-70">Logout</div>
    </aside>
  );
}

function Item({ label, active }) {
  return (
    <div
      className={`px-4 py-2 rounded-lg cursor-pointer ${
        active ? 'bg-orange-500 text-white' : 'hover:bg-slate-800'
      }`}
    >
      {label}
    </div>
  );
}

function Header() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <p className="text-slate-500">Welcome back, Administrator.</p>
    </div>
  );
}

function Stats() {
  const cards = [
    { title: 'Total Startups', value: '1,284', sub: '+12% from last month' },
    { title: 'Pending Verifications', value: '47', sub: '23 new this week' },
    { title: 'Reported Content', value: '12', sub: '3 urgent', danger: true },
    { title: 'Active Investors', value: '892', sub: '+8% from last month' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((c) => (
        <div
          key={c.title}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="text-slate-500">{c.title}</div>
          <div className="text-3xl font-bold mt-2">{c.value}</div>
          <div
            className={`text-sm mt-1 ${
              c.danger ? 'text-red-500' : 'text-green-600'
            }`}
          >
            {c.sub}
          </div>
        </div>
      ))}
    </div>
  );
}

function Charts() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-semibold mb-4">Startup Verification Trends</h3>
        <Line
          data={{
            labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
            datasets: [
              {
                label: 'Gold',
                data: [45, 52, 60, 58, 70, 85],
                borderColor: '#eab308',
              },
              {
                label: 'Silver',
                data: [78, 85, 92, 98, 110, 125],
                borderColor: '#94a3b8',
              },
              {
                label: 'Bronze',
                data: [120, 135, 148, 155, 168, 182],
                borderColor: '#f97316',
              },
            ],
          }}
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-semibold mb-4">Platform Activity Breakdown</h3>
        <Bar
            data={{
                labels: ['Verifications', 'Reports', 'Moderation', 'Investors'],
                datasets: [
                    {
                        data: [340, 160, 90, 220],
                        backgroundColor: ['#f97316', '#475569', '#334155', '#94a3b8'],
                    },
                ],
            }}
            options={{
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            }}
        />
      </div>
    </div>
  );
}

function RecentActivity() {
  const items = [
    {
      title: "Startup verified",
      subtitle: "TechVentures Inc.",
      tag: "Gold",
      time: "2 min ago",
      tagStyle: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Content flagged",
      subtitle: "Description by StartupX",
      time: "15 min ago",
    },
    {
      title: "Report resolved",
      subtitle: "Complaint #1234",
      time: "1 hour ago",
    },
    {
      title: "Startup verified",
      subtitle: "GreenEnergy Co.",
      tag: "Silver",
      time: "2 hours ago",
      tagStyle: "bg-slate-100 text-slate-700",
    },
    {
      title: "User complaint",
      subtitle: "Investor Report #892",
      time: "3 hours ago",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <p className='text-sm text-slate-500'>
            Latest platform actions and events
        </p>
      </div>

      <div className="divide-y">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-6 py-5"
          >
            {/* LEFT */}
            <div>
              <p className="font-medium text-slate-800">
                {item.title}
              </p>
              <p className="text-sm text-slate-500">
                {item.subtitle}
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">
              {item.tag && (
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${item.tagStyle}`}
                >
                  {item.tag}
                </span>
              )}
              <span className="text-sm text-slate-500">
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

