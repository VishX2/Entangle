import {
  Search,
  Filter,
  Briefcase,
  MapPin,
  TrendingUp,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";

const collaborationsData = [
  {
    id: 1,
    title: "AI-Powered FinTech Platform",
    company: "NovaPay",
    location: "San Francisco, USA",
    description:
      "Looking for strategic partners to scale our AI-driven payment and fraud detection platform.",
    industries: ["AI", "FinTech", "SaaS"],
    stage: "Seed",
  },
  {
    id: 2,
    title: "HealthTech Remote Monitoring Startup",
    company: "CarePulse",
    location: "Berlin, Germany",
    description:
      "Seeking collaboration with healthcare providers and AI partners for patient monitoring.",
    industries: ["HealthTech", "AI"],
    stage: "Pre-Seed",
  },
  {
    id: 3,
    title: "B2B SaaS Automation Tool",
    company: "FlowOps",
    location: "London, UK",
    description:
      "Open to partnerships with SaaS platforms and enterprise solution providers.",
    industries: ["SaaS", "Enterprise"],
    stage: "Series A",
  },
];

export default function StartupCollaborations() {
  const [search, setSearch] = useState("");

  const filtered = collaborationsData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F7F3E6] p-10 space-y-12"></div>