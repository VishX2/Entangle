import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import api from "../../api/client";

import {
  fetchCompanies,
  fetchConnectionRequestsSent,
  fetchConversations,
} from "../../store/userApi";
import {
  selectCompanies,
  selectConnectionRequestsSent,
  selectConversations,
} from "../../store/userSlice";

import { HeroSection } from "../../components/Startups/Startup-dashboard/HeroSection";
import FundingNews from "../../components/Startups/Startup-dashboard/FundingNews";
import MASection from "../../components/Startups/Startup-dashboard/MASection";
import BusinessNews from "../../components/Startups/Startup-dashboard/BusinessNews";
import {
  MarketSnapshot,
  TrendingIndustries,
  RecommendedStartups,
} from "../../components/Startups/Startup-dashboard/DashboardSidebar";

export default function StartupDashboard() {
  const [news, setNews] = useState([]);
  const dispatch = useDispatch();

  const companies = useSelector(selectCompanies);
  const connectionRequestsSent = useSelector(selectConnectionRequestsSent);
  const conversations = useSelector(selectConversations);

  useEffect(() => {
    fetchNews();
    dispatch(fetchCompanies());
    dispatch(fetchConnectionRequestsSent());
    dispatch(fetchConversations());
  }, []);

  const fetchNews = async () => {
    try {
      const res = await api.get("/news/headlines");
      setNews(res.data?.articles || []);
    } catch (err) {
      console.error("News fetch error:", err);
    }
  };

  const acceptedConnectionsCount = useMemo(() => {
    return (connectionRequestsSent || []).filter(
      (r) => r?.status === "accepted"
    ).length;
  }, [connectionRequestsSent]);

  const fundingValue = acceptedConnectionsCount
    ? `$${(acceptedConnectionsCount * 1.2).toFixed(1)}B`
    : "$1.2B";
  const dealsValue = acceptedConnectionsCount || 47;

  const investors = useMemo(() => {
    return (companies || [])
      .filter((c) => c?.company_type === "investor")
      .slice(0, 3);
  }, [companies]);

  const dealsSignal = useMemo(() => {
    return (conversations || []).slice(0, 3).map((c, idx) => ({
      id: c?.id ?? idx,
      name: c?.other_user?.name || "Company",
      value: c?.last_message?.content ? "Active" : "New",
    }));
  }, [conversations]);

  return (
    <div className="bg-[#D8D4C5] min-h-screen p-6 space-y-4">
      <HeroSection
        fundingValue={fundingValue}
        fundingChange="+18%"
        dealsValue={String(dealsValue)}
        dealsChange="+6%"
      />

      <div className="grid grid-cols-12 gap-4 items-stretch">
        {/* Main content */}
        <div className="col-span-12 lg:col-span-9 flex flex-col gap-4">
          <FundingNews investors={investors} />
          <MASection deals={dealsSignal} />
          <BusinessNews news={news} />
        </div>

        {/* Right sidebar */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
          <MarketSnapshot fundingValue={fundingValue} dealsValue={String(dealsValue)} />
          <TrendingIndustries />
          <RecommendedStartups investors={investors} />
        </div>
      </div>
    </div>
  );
}
