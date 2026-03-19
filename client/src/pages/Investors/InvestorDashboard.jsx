import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

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

import { HeroSection } from "../../components/Investor-dashboard/HeroSection";
import FundingNews from "../../components/Investor-dashboard/FundingNews";
import MASection from "../../components/Investor-dashboard/MASection";
import BusinessNews from "../../components/Investor-dashboard/BusinessNews";
import {
  MarketSnapshot,
  TrendingIndustries,
  RecommendedStartups,
} from "../../components/Investor-dashboard/DashboardSidebar";

export default function InvestorDashboard() {
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
      const res = await axios.get(
        "https://newsapi.org/v2/top-headlines?category=business&language=en&pageSize=6&apiKey=39a049a8c44c49518239d23453c96d6b"
      );
      setNews(res.data.articles);
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

  const startups = useMemo(() => {
    return (companies || [])
      .filter((c) => c?.company_type === "startup")
      .slice(0, 3);
  }, [companies]);

  // Light “Recent M&A-ish” signal from newest conversations.
  // (Backend doesn’t provide direct M&A deals here; we keep UI working with available data.)
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
          <FundingNews startups={startups} />
          <MASection deals={dealsSignal} />
          <BusinessNews news={news} />
        </div>

        {/* Right sidebar */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
          <MarketSnapshot fundingValue={fundingValue} dealsValue={String(dealsValue)} />
          <TrendingIndustries />
          <RecommendedStartups startups={startups} />
        </div>
      </div>
    </div>
  );
}
