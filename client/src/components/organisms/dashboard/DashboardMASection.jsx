import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConnectionRequestsSent, fetchCompanies } from '../../../store/userApi';

const TITLES = {
  investor: 'Recent M&A Activity',
  startup: 'Recent M&A Activity',
  entrepreneur: 'Exits & Acquisitions',
};

export default function DashboardMASection({ type = 'investor' }) {
  const dispatch = useDispatch();
  const requests = useSelector((s) => s.user?.connectionRequestsSent) || [];
  const companies = useSelector((s) => s.user?.companies) || [];

  useEffect(() => {
    dispatch(fetchConnectionRequestsSent());
    dispatch(fetchCompanies());
  }, [dispatch]);

  const recentDeals = useMemo(() => {
    const withNames = requests.map((r) => {
      const co = companies.find((c) => c.id === r.to_company_id);
      return {
        id: r.id,
        title: co?.name || r.toCompany?.name || `Company #${r.to_company_id}`,
        status: (r.status || 'pending').toLowerCase(),
        created_at: r.created_at,
      };
    });
    return withNames
      .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
      .slice(0, 3);
  }, [requests, companies]);

  const title = TITLES[type] || TITLES.investor;
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recentDeals.length === 0 ? (
          <DealCard title="No recent connections yet" value="—" type={type} />
        ) : (
          recentDeals.map((deal) => (
            <DealCard
              key={deal.id}
              title={deal.title}
              value={deal.status === 'accepted' ? 'Connected' : deal.status === 'rejected' ? 'Declined' : 'Pending'}
              type={type}
            />
          ))
        )}
      </div>
    </section>
  );
}

function DealCard({ title, value, type }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition duration-200 cursor-pointer relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-[#E66A4B]" />
      <h3 className="font-medium text-slate-800">{title}</h3>
      <p className="text-[#E66A4B] font-semibold mt-2 text-lg">{value}</p>
      <p className="text-xs text-slate-400 mt-1">
        {type === 'entrepreneur' ? 'Founder exit' : 'Acquisition deal'}
      </p>
    </div>
  );
}
