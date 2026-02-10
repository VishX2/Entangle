import { useState } from "react";

import FeatureCard from "../../components/startup-discovery-components/FeatureCard";
import StartupCard from "../../components/startup-discovery-components/StartupCard";
import SidebarCard from "../../components/startup-discovery-components/SidebarCard";
import SidebarItem from "../../components/startup-discovery-components/SidebarItem";
import FilterBar from "../../components/startup-discovery-components/FilterBar";

export default function StartupDiscovery() {
  // ✅ DATA KEPT HERE
  const startupsData = [
    {
      id: 1,
      name: "NeuralForge",
      location: "San Francisco, CA",
      rating: 4.9,
      description: "AI-powered code review for engineering teams",
      industry: "Artificial Intelligence",
      stage: "Series A",
    },
    {
      id: 2,
      name: "WellMind",
      location: "New York, NY",
      rating: 4.9,
      description: "AI mental health companion with therapist matching",
      industry: "HealthTech",
      stage: "Seed",
    },
    {
      id: 3,
      name: "FinBridge",
      location: "London, UK",
      rating: 4.8,
      description: "Cross-border payments made seamless for SMBs",
      industry: "FinTech",
      stage: "Series B",
    },
  ];

  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All");
  const [stage, setStage] = useState("All");

  const filteredStartups = startupsData.filter((s) => {
    return (
      (industry === "All" || s.industry === industry) &&
      (stage === "All" || s.stage === stage) &&
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="bg-[#f5f3ef] min-h-screen">
      {/* Hero */}
      <section className="bg-linear-to-b from-[#4a657d] to-[#3e5a70] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">
            Discover the next generation of{" "}
            <span className="text-[#ff6b4a]">startups.</span>
          </h1>

          <p className="mt-6 text-lg text-gray-200">
            Explore innovative ideas and connect with founders shaping the
            future.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <FeatureCard
              title="Smart Matching"
              desc="AI analyzes investor requirements."
            />
            <FeatureCard
              title="Personalized Suggestions"
              desc="Tailored opportunities based on interests."
            />
            <FeatureCard
              title="Opportunity Discovery"
              desc="Discover high-potential startups early."
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <FilterBar
          search={search}
          setSearch={setSearch}
          industry={industry}
          setIndustry={setIndustry}
          stage={stage}
          setStage={setStage}
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 mt-8 grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredStartups.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>

        <div className="space-y-6">
          <SidebarCard title="Top Rated">
            <SidebarItem name="NeuralForge" rating="4.9" />
            <SidebarItem name="WellMind" rating="4.9" />
            <SidebarItem name="FinBridge" rating="4.8" />
          </SidebarCard>
        </div>
      </div>
    </div>
  );
}
