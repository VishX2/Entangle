import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import api from "../../api/client";

import { fetchCompanies, fetchConnectionRequestsSent, fetchConversations } from "../../store/userApi";
import {
  selectCompanies,
  selectConnectionRequestsSent,
  selectConversations,
} from "../../store/userSlice";
import { selectCurrentUser } from "../../store/authSlice";
import { DashboardCard, DashboardPageLayout } from "../../components/dashboard/DashboardLayout";

export default function EntrepreneurDashboard() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const companies = useSelector(selectCompanies);
  const connectionRequestsSent = useSelector(selectConnectionRequestsSent);
  const conversations = useSelector(selectConversations);

  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const res = await api.get("/news/headlines");
      setNews(res.data?.articles || []);
    } catch (err) {
      console.error("News fetch error:", err);
    }
  };

  useEffect(() => {
    fetchNews();
    dispatch(fetchCompanies());
    dispatch(fetchConnectionRequestsSent());
    dispatch(fetchConversations());
  }, [dispatch]);

  const myCompany = useMemo(() => {
    const uid = Number(currentUser?.id);
    if (!Number.isFinite(uid)) return null;
    return (companies || []).find(
      (c) => Number(c?.created_by) === uid && c?.company_type === "entrepreneur"
    );
  }, [companies, currentUser?.id]);

  const acceptedConnectionsCount = useMemo(() => {
    return (connectionRequestsSent || []).filter(
      (r) => r?.status === "accepted"
    ).length;
  }, [connectionRequestsSent]);

  const trustScore = myCompany?.is_verified ? 92 : 58;

  const profileStrength = useMemo(() => {
    if (!myCompany) return 76;
    const fields = [
      myCompany?.description,
      myCompany?.logo_url,
      myCompany?.website_url,
      myCompany?.headquarters,
      myCompany?.founded_year,
      myCompany?.investment_focus,
      myCompany?.min_investment,
      myCompany?.max_investment,
      myCompany?.funding_stage,
      myCompany?.team_size,
      myCompany?.years_experience,
    ];

    const filledCount = fields.filter((v) => {
      if (v === null || v === undefined) return false;
      if (typeof v === "string") return v.trim().length > 0;
      if (typeof v === "number") return Number.isFinite(v) && v !== 0;
      return true;
    }).length;

    return Math.round((filledCount / fields.length) * 100);
  }, [myCompany]);

  const monthlyRevenue = useMemo(() => {
    const maxInv = Number(myCompany?.max_investment);
    const minInv = Number(myCompany?.min_investment);
    const raw = Number.isFinite(maxInv) && maxInv > 0 ? maxInv : Number.isFinite(minInv) ? minInv : 58000;
    return Math.round(raw);
  }, [myCompany]);

  const activeInvestors = useMemo(() => {
    const totalReviews = Number(myCompany?.total_reviews);
    if (Number.isFinite(totalReviews) && totalReviews > 0) return totalReviews;
    return acceptedConnectionsCount || 27;
  }, [myCompany, acceptedConnectionsCount]);

  const growthMetrics = useMemo(() => {
    const revGrowth = `+${Math.min(35, Math.max(5, Math.round(profileStrength / 3)))}%`;
    const investorGrowth = `+${Math.min(30, Math.max(8, acceptedConnectionsCount * 2 || 14))}%`;
    const burnRateK = Math.max(8, Math.round((myCompany?.years_experience || 3) * 3));
    return [
      { id: 1, title: "Revenue Growth", value: revGrowth },
      { id: 2, title: "Investor Growth", value: investorGrowth },
      { id: 3, title: "Burn Rate", value: `$${burnRateK}K/mo` },
    ];
  }, [acceptedConnectionsCount, myCompany?.years_experience, profileStrength]);

  const investorCompanies = useMemo(() => {
    return (companies || []).filter((c) => c?.company_type === "investor").slice(0, 2);
  }, [companies]);

  const investorInterest = useMemo(() => {
    return investorCompanies.map((inv, idx) => ({
      id: idx + 1,
      name: inv?.name || "Investor",
      action: idx === 0 ? "Viewed your startup" : "Saved your pitch",
    }));
  }, [investorCompanies]);

  const recentActivity = useMemo(() => {
    return (conversations || []).slice(0, 3).map((c, idx) => ({
      id: idx + 1,
      text: `${c?.other_user?.name || "Investor"}: ${
        c?.last_message?.content || "New message"
      }`.slice(0, 80),
    }));
  }, [conversations]);

  const recommendedInvestors = useMemo(() => {
    return (companies || [])
      .filter((c) => c?.company_type === "investor")
      .slice(0, 3)
      .map((inv, idx) => ({ id: idx + 1, name: inv?.name || "Investor" }));
  }, [companies]);

  const quickActions = useMemo(
    () => [
      { id: 1, label: "Upload Pitch Deck" },
      { id: 2, label: "Edit Profile" },
    ],
    []
  );

  const displayName = currentUser?.first_name || "Founder";

  return (
    <DashboardPageLayout
      hero={
        <EntrepreneurHero
          revenue={monthlyRevenue}
          investors={activeInvestors}
          influence={trustScore}
          displayName={displayName}
        />
      }
      mainColumn={
        <>
          <DashboardCard>
            <GrowthAndInterest metrics={growthMetrics} interests={investorInterest} />
          </DashboardCard>
          <DashboardCard>
            <EntrepreneurNews news={news} />
          </DashboardCard>
        </>
      }
      sidebar={
        <>
          <ProfileStrength value={profileStrength} />
          <QuickActions actions={quickActions} />
          <RecentActivity activities={recentActivity} />
          <RecommendedInvestors investors={recommendedInvestors} />
        </>
      }
    />
  );
}

/* ---------------- COMPONENTS ---------------- */
function EntrepreneurHero({ revenue, investors, influence, displayName }) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-[#2E3A4B] to-[#465F7F] text-white p-6 shadow-md">
      <p className="text-sm opacity-80">ENTREPRENEUR DASHBOARD</p>
      <h1 className="text-3xl font-semibold mt-1">
        Welcome back, {displayName}
      </h1>

      <div className="flex flex-wrap gap-3 sm:gap-4 mt-5">
        <StatCard title="Monthly Revenue" value={`$${revenue}`} />
        <StatCard title="Active Investors" value={investors} />
        <StatCard title="Influence Score" value={influence} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white/10 rounded-xl px-4 py-3 hover:bg-white/20 transition duration-200">
      <div className="text-xs opacity-80">{title}</div>
      <div className="text-lg font-semibold mt-1">{value}</div>
    </div>
  );
}

function GrowthAndInterest({ metrics, interests }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Growth & Traction</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:items-start gap-4">
        <div className="bg-white rounded-2xl overflow-hidden shadow-md">
          <div className="h-40 bg-gradient-to-br from-[#2E3A4B] to-[#465F7F] flex items-center justify-center">
            <div className="grid grid-cols-3 gap-4 w-full px-6">
              {metrics.map((m) => (
                <div key={m.id} className="text-center">
                  <p className="text-white/80 text-xs uppercase tracking-wide">{m.title}</p>
                  <p className="text-2xl md:text-3xl font-bold text-white mt-1">{m.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4">
            <span className="text-xs bg-surface-alt text-text-muted px-2 py-1 rounded">Your metrics</span>
            <p className="text-sm text-gray-500 mt-2">Track revenue, investor engagement & burn</p>
          </div>
        </div>

        <div className="space-y-4">
          {(interests || []).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md min-h-[120px]"
            >
              <div className="h-20 bg-gradient-to-r from-orange-50 to-amber-50 flex items-center gap-4 px-4">
                <div className="w-12 h-12 rounded-xl bg-[#E66A4B]/20 flex items-center justify-center shrink-0">
                  <span className="text-[#E66A4B] font-bold text-lg">{item.name?.charAt(0) || "?"}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-800 truncate">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.action}</p>
                </div>
              </div>
              <div className="p-3 border-t border-gray-200">
                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded">Investor</span>
              </div>
            </div>
          ))}
          {(!interests || interests.length === 0) && (
            <div className="bg-white rounded-2xl p-6 shadow flex items-center justify-center min-h-[120px] text-gray-400 text-sm">
              No investor activity yet
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function EntrepreneurNews({ news }) {
  const items = news?.length ? news : [];
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Startup & Tech News</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500 col-span-full">No news articles to show yet.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id || item.url}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl hover:-translate-y-1 transition"
            >
              {item.urlToImage && (
                <img
                  src={item.urlToImage}
                  alt={item.title}
                  className="h-40 w-full object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{item.source?.name}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

function ProfileStrength({ value }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <h3 className="font-semibold mb-3">Profile Strength</h3>
      <p className="text-3xl font-semibold text-[#E66A4B]">{value}%</p>
    </div>
  );
}

function QuickActions({ actions }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <h3 className="font-semibold mb-3">Quick Actions</h3>

      {actions.map((action) => (
        <button
          key={action.id}
          className="w-full bg-gray-200 py-2 rounded-xl mb-3
                     hover:bg-[#E66A4B] hover:text-white
                     hover:shadow-md hover:-translate-y-1
                     active:scale-95
                     transition duration-200"
          type="button"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}

function RecentActivity({ activities }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <h3 className="font-semibold mb-3">Recent Activity</h3>

      {activities.map((item) => (
        <p key={item.id} className="text-sm mt-2">
          {item.text}
        </p>
      ))}
    </div>
  );
}

function RecommendedInvestors({ investors }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <h3 className="font-semibold mb-3">Recommended Investors</h3>

      {investors.map((inv) => (
        <p key={inv.id} className="text-sm py-1">
          {inv.name}
        </p>
      ))}

      <button
        className="mt-4 w-full bg-[#E66A4B] text-white py-2 rounded-xl
                   hover:bg-[#d85e40] hover:shadow-md hover:-translate-y-1
                   active:scale-95 transition duration-200"
        type="button"
      >
        Explore More Investors
      </button>
    </div>
  );
}