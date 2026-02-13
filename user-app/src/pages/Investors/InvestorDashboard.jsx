import React, { useEffect, useState } from "react";
import axios from "axios";

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

  useEffect(() => {
    fetchNews();
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

  return (
    <div className="bg-[#D8D4C5] min-h-screen p-6 space-y-8">
      <HeroSection />

      <div className="grid grid-cols-12 gap-6">
        {/* Main content */}
        <div className="col-span-12 lg:col-span-9 space-y-8">
          <FundingNews />
          <MASection />
          <BusinessNews news={news} />
        </div>

        {/* Right sidebar */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <MarketSnapshot />
          <TrendingIndustries />
          <RecommendedStartups />
        </div>
      </div>
    </div>
  );
}
