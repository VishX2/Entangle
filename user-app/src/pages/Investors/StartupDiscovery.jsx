import { useState } from "react";

import StartupHero from "../../components/startup-discovery-components/StartupHero";
import StartupCard from "../../components/startup-discovery-components/StartupCard";
import FilterBar from "../../components/startup-discovery-components/FilterBar";
import TopRatedCard from "../../components/startup-discovery-components/TopRatedCard";
import TrendingIndustriesCard from "../../components/startup-discovery-components/TrendingIndustriesCard";
import RecentlyFundedCard from "../../components/startup-discovery-components/RecentlyFundedCard"; // <-- missing import

export default function StartupDiscovery() {
  // STARTUP DATA
  const startupsData = [
    {
      id: 1,
      name: "NeuralForge",
      location: "San Francisco, CA",
      rating: 4.9,
      description: "AI-powered code review for engineering teams",
      industry: "Artificial Intelligence",
      stage: "Series A",
      logo: "/logos/neuralforge.png",
    },
    {
      id: 2,
      name: "WellMind",
      location: "New York, NY",
      rating: 4.9,
      description: "AI mental health companion with therapist matching",
      industry: "HealthTech",
      stage: "Seed",
      logo: "/logos/wellmind.png",
    },
    {
      id: 3,
      name: "FinBridge",
      location: "London, UK",
      rating: 4.8,
      description: "Cross-border payments made seamless for SMBs",
      industry: "FinTech",
      stage: "Series B",
      logo: "/logos/finbridge.png",
    },
    {
      id: 4,
      name: "CloudNest",
      location: "Toronto, Canada",
      rating: 4.8,
      description: "Zero-config deployment platform for startups",
      industry: "SaaS",
      stage: "Series A",
      logo: "/logos/cloudnest.png",
    },
    {
      id: 5,
      name: "GreenPulse",
      location: "Berlin, Germany",
      rating: 4.7,
      description: "Smart energy management for sustainable buildings",
      industry: "CleanTech",
      stage: "Seed",
      logo: "/logos/greenpulse.png",
    },
    {
      id: 6,
      name: "DataHive",
      location: "Seattle, WA",
      rating: 4.7,
      description: "Real-time analytics pipeline for enterprise teams",
      industry: "Artificial Intelligence",
      stage: "Series B",
      logo: "/logos/datahive.png",
    },
    {
      id: 7,
      name: "MedSync",
      location: "Boston, MA",
      rating: 4.6,
      description: "Patient data interoperability platform for hospitals",
      industry: "HealthTech",
      stage: "Series A",
      logo: "/logos/medsync.png",
    },
    {
      id: 8,
      name: "RoboFleet",
      location: "Tokyo, Japan",
      rating: 4.6,
      description: "Fleet management for autonomous delivery vehicles",
      industry: "Logistics",
      stage: "Series A",
      logo: "/logos/robofleet.png",
    },
    {
      id: 9,
      name: "EduVerse",
      location: "Austin, TX",
      rating: 4.5,
      description: "Immersive VR learning experiences for K-12",
      industry: "EdTech",
      stage: "Pre-Seed",
      logo: "/logos/eduverse.png",
    },
    {
      id: 10,
      name: "AgriBot",
      location: "Tel Aviv, Israel",
      rating: 4.4,
      description: "Autonomous drones for precision agriculture",
      industry: "AgriTech",
      stage: "Seed",
      logo: "/logos/agribot.png",
    },
    {
      id: 11,
      name: "StyleAI",
      location: "Paris, France",
      rating: 4.3,
      description: "AI stylist for personalized fashion recommendations",
      industry: "E-Commerce",
      stage: "Seed",
      logo: "/logos/styleai.png",
    },
    {
      id: 12,
      name: "SecureChain",
      location: "Singapore",
      rating: 4.2,
      description: "Blockchain-based identity verification for Web3",
      industry: "Blockchain",
      stage: "Pre-Seed",
      logo: "/logos/securechain.png",
    },
  ];

  // FILTER STATES
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All Industries");
  const [stage, setStage] = useState("All Stages");
  const [location, setLocation] = useState("All Locations");
  const [sort, setSort] = useState("top");

  // FILTER LOGIC
  const filteredStartups = startupsData
    .filter((s) => {
      return (
        (industry === "All Industries" || s.industry === industry) &&
        (stage === "All Stages" || s.stage === stage) &&
        (location === "All Locations" || s.location === location) &&
        s.name.toLowerCase().includes(search.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sort === "top") return b.rating - a.rating;
      if (sort === "new") return b.id - a.id;
      return 0;
    });

  // TOP RATED SIDEBAR DATA
  const topRated = [...startupsData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)
    .map((s) => ({
      name: s.name,
      initials: s.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      industry: s.industry,
      stage: s.stage,
      rating: s.rating,
    }));

  return (
    <div className="bg-[#f5f3ef] min-h-screen">
      {/* HERO */}
      <StartupHero />

      {/* FILTER BAR */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <FilterBar
          search={search}
          setSearch={setSearch}
          industry={industry}
          setIndustry={setIndustry}
          stage={stage}
          setStage={setStage}
          location={location}
          setLocation={setLocation}
          sort={sort}
          setSort={setSort}
        />
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 mt-8 grid lg:grid-cols-4 gap-8">
        {/* Startup Grid */}
        <div className="lg:col-span-3 grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredStartups.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <TopRatedCard startups={topRated} />

          <TrendingIndustriesCard
            industries={[
              { name: "Artificial Intelligence", growth: "+12%", count: 342 },
              { name: "HealthTech", growth: "+8%", count: 218 },
              { name: "FinTech", growth: "+5%", count: 195 },
              { name: "CleanTech", growth: "+15%", count: 167 },
              { name: "SaaS", growth: "+3%", count: 154 },
            ]}
          />

          <RecentlyFundedCard
            startups={[
              {
                name: "DataHive",
                initials: "DH",
                stage: "Series B",
                amount: "$12M",
                time: "2d ago",
              },
              {
                name: "FinBridge",
                initials: "FB",
                stage: "Series B",
                amount: "$8.5M",
                time: "5d ago",
              },
              {
                name: "NeuralForge",
                initials: "NF",
                stage: "Series A",
                amount: "$5M",
                time: "8d ago",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
