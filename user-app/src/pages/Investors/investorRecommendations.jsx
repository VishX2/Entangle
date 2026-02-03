import {
  Star,
  TrendingUp,
  MapPin,
  Briefcase,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function InvestorRecommendations() {
  const investors = [
    {
      id: 1,
      name: "Sequoia Capital",
      location: "California, USA",
      focus: ["SaaS", "AI", "FinTech"],
      stage: "Seed · Series A",
      match: 92,
      verified: true,
    },
    {
      id: 2,
      name: "Accel Partners",
      location: "Global",
      focus: ["B2B", "SaaS", "Cloud"],
      stage: "Seed · Growth",
      match: 87,
      verified: true,
    },
    {
      id: 3,
      name: "Angel Network",
      location: "Europe",
      focus: ["FinTech", "Marketplaces"],
      stage: "Pre-Seed · Seed",
      match: 81,
      verified: false,
    },
  ];

  