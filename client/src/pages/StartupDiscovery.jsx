import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import StartupHero from "../components/startup-discovery-components/StartupHero";
import StartupCard from "../components/startup-discovery-components/StartupCard";
import FilterBar from "../components/startup-discovery-components/FilterBar";
import TopRatedCard from "../components/startup-discovery-components/TopRatedCard";
import TrendingIndustriesCard from "../components/startup-discovery-components/TrendingIndustriesCard";
import RecentlyFundedCard from "../components/startup-discovery-components/RecentlyFundedCard";
import { Sparkles } from "lucide-react";
import { fetchCompanies, fetchInvestors, fetchStartupsForInvestor } from "../store/userApi";
import { selectCompanies, selectInvestors, selectStartupMatches, selectMatchmakingLoading, selectUserLoading } from "../store/userSlice";

function mapCompanyToStartup(c) {
  return {
    id: c.id,
    name: c.name,
    location: c.headquarters || "—",
    rating: Number(c.average_rating) || 0,
    description: c.description || "No description",
    industry: c.investment_focus || c.funding_stage || "—",
    stage: c.funding_stage || "—",
    logo: c.logo_url || "",
    created_by: c.created_by,
  };
}

export default function StartupDiscovery() {
  const dispatch = useDispatch();
  const companies = useSelector(selectCompanies);
  const investors = useSelector(selectInvestors);
  const startupMatches = useSelector(selectStartupMatches);
  const matchmakingLoading = useSelector(selectMatchmakingLoading);
  const loading = useSelector(selectUserLoading);
  const aiMatchRef = useRef(null);

  const [selectedInvestorId, setSelectedInvestorId] = useState(null);

  useEffect(() => {
    dispatch(fetchCompanies({ type: "startup" }));
    dispatch(fetchInvestors());
  }, [dispatch]);

  useEffect(() => {
    if (selectedInvestorId) {
      dispatch(fetchStartupsForInvestor({ investorId: selectedInvestorId }));
    }
  }, [dispatch, selectedInvestorId]);

  const startupsData = (companies || []).map(mapCompanyToStartup);

  const FALLBACK_DATA = [
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

  const data = startupsData.length > 0 ? startupsData : FALLBACK_DATA;

  // AI Match results: map to startup format with match score
  const aiMatchList = startupMatches?.matches ?? [];
  const aiMatchStartups = aiMatchList.map(({ company, score }) => ({
    ...mapCompanyToStartup(company),
    matchScore: score,
  }));

  const showAIMatchResults = selectedInvestorId && aiMatchList.length > 0;

  // FILTER STATES
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All Industries");
  const [stage, setStage] = useState("All Stages");
  const [location, setLocation] = useState("All Locations");
  const [sort, setSort] = useState("top");

  // FILTER LOGIC
  const filteredStartups = data
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
  const topRated = [...data]
    .filter((s) => s.rating > 0)
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
      <StartupHero onRunAIMatch={() => aiMatchRef.current?.scrollIntoView({ behavior: "smooth" })} />

      {/* AI MATCH SECTION */}
      <section ref={aiMatchRef} id="ai-match" className="max-w-7xl mx-auto px-6 mt-8">
        <div className="bg-white/80 rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">AI Match — Get personalized startup recommendations</h2>
          <div className="flex flex-wrap items-center gap-4">
            <label className="text-sm font-medium text-slate-600">Select your investor profile:</label>
            <select
              value={selectedInvestorId ?? ""}
              onChange={(e) => setSelectedInvestorId(e.target.value ? Number(e.target.value) : null)}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 min-w-[220px]"
            >
              <option value="">— Pick an investor —</option>
              {investors.map((inv) => (
                <option key={inv.id} value={inv.id}>{inv.name}</option>
              ))}
            </select>
            <button
              onClick={() => selectedInvestorId && dispatch(fetchStartupsForInvestor({ investorId: selectedInvestorId }))}
              disabled={!selectedInvestorId || matchmakingLoading}
              className="px-5 py-2.5 rounded-xl bg-[#ff6b4a] text-white font-medium hover:bg-[#ff5a36] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {matchmakingLoading ? "Matching…" : "Run AI Match"}
            </button>
          </div>
          {investors.length === 0 && (
            <p className="mt-2 text-sm text-slate-500">No investors in the database. Add investor companies to use AI matchmaking.</p>
          )}
        </div>
      </section>

      {/* FILTER BAR */}
      <div id="browse" className="max-w-7xl mx-auto px-6 mt-8">
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
          {loading && startupsData.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500">Loading startups…</div>
          ) : matchmakingLoading && selectedInvestorId ? (
            <div className="col-span-full animate-matchmaking-pulse bg-white rounded-2xl p-12 shadow-lg border border-[#ff6b4a]/20">
              <div className="animate-matchmaking-shimmer rounded-xl px-8 py-12 text-center">
                <div className="flex justify-center gap-2 mb-4">
                  <Sparkles className="w-8 h-8 text-[#ff6b4a] animate-matchmaking-sparkle" />
                  <Sparkles className="w-8 h-8 text-[#ff6b4a]/80 animate-matchmaking-sparkle" style={{ animationDelay: "0.2s" }} />
                  <Sparkles className="w-8 h-8 text-[#ff6b4a] animate-matchmaking-sparkle" style={{ animationDelay: "0.4s" }} />
                </div>
                <p className="text-lg font-medium text-slate-800">AI is analyzing profiles...</p>
                <p className="text-sm text-slate-500 mt-1">Finding the best startups for your portfolio</p>
                <div className="flex justify-center gap-1 mt-6">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#ff6b4a] animate-bounce"
                      style={{ animationDelay: `${i * 0.1}s`, animationDuration: "0.6s" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : showAIMatchResults ? (
            aiMatchStartups.map((startup, idx) => (
              <div key={startup.id} className="animate-matchmaking-fade-in" style={{ animationDelay: `${idx * 0.05}s`, animationFillMode: "both" }}>
                <StartupCard startup={startup} matchScore={startup.matchScore} />
              </div>
            ))
          ) : (
            filteredStartups.map((startup) => (
              <StartupCard key={startup.id} startup={startup} />
            ))
          )}
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
