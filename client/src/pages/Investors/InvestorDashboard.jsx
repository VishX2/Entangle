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

import { DashboardCard, DashboardPageLayout } from "../../components/dashboard/DashboardLayout";
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

  const startups = useMemo(() => {
    return (companies || [])
      .filter((c) => c?.company_type === "startup")
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
    <DashboardPageLayout
      hero={
        <HeroSection
          fundingValue={fundingValue}
          fundingChange="+18%"
          dealsValue={String(dealsValue)}
          dealsChange="+6%"
        />
      }
      mainColumn={
        <>
          <DashboardCard>
            <FundingNews startups={startups} />
          </DashboardCard>
          <DashboardCard>
            <MASection deals={dealsSignal} />
          </DashboardCard>
          <DashboardCard>
            <BusinessNews news={news} />
          </DashboardCard>
        </>
      }
      sidebar={
        <>
          <MarketSnapshot fundingValue={fundingValue} dealsValue={String(dealsValue)} />
          <TrendingIndustries />
          <RecommendedStartups startups={startups} />
        </>
      }
    />
  );
}
