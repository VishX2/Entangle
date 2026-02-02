import {
  Eye,
  Heart,
  MessageSquare,
  Plus,
  Upload,
  BarChart3,
  Edit3,
  Star,
  CheckCircle,
  Users,
} from "lucide-react";

export default function EntrepreneurDashboard() {
  const data = {
    name: "Jordan",
    profileStrength: 75,
    views: 247,
    interest: 12,
    messages: 8,
    unread: 4,
    activity: [
      {
        id: 1,
        title: "New investor interest",
        description: "Sequoia Capital viewed your pitch deck",
        time: "2h ago",
        icon: Star,
      },
      {
        id: 2,
        title: "Connection accepted",
        description: "You are now connected with Angel Network",
        time: "4h ago",
        icon: CheckCircle,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F7F3E6] p-10 space-y-16">

      {/* HEADER */}
      <div className="bg-white rounded-[32px] p-8
                      border border-[#3F5C7D]/40
                      shadow-sm transition
                      hover:shadow-lg hover:-translate-y-1">
        <div className="absolute inset-x-0 top-0 h-1
                        bg-gradient-to-r from-[#0F172A] via-[#3F5C7D] to-[#F97316]
                        rounded-t-[32px]" />

        <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">
          Entrepreneur Dashboard
        </h1>
        <p className="text-[#64748B] mt-1">
          Here’s what’s happening with your startup today
        </p>
      </div>

      {/* PROFILE STRENGTH */}
      <div className="bg-white rounded-3xl p-8
                      border border-[#3F5C7D]/40
                      shadow-sm transition
                      hover:shadow-lg hover:-translate-y-1
                      space-y-4">

        <div className="flex justify-between items-center">
          <p className="font-semibold text-[#0F172A]">
            Profile Strength
          </p>
          <span className="px-3 py-1 rounded-full text-sm font-semibold
                           bg-[#F97316]/10 text-[#F97316]">
            {data.profileStrength}%
          </span>
        </div>

        <div className="w-full bg-[#E5E7EB] rounded-full h-2 overflow-hidden">
          <div
            className="h-2 rounded-full
                       bg-gradient-to-r from-[#F97316] to-[#F59E0B]
                       transition-all duration-700"
            style={{ width: `${data.profileStrength}%` }}
          />
        </div>

        <p className="text-sm text-[#64748B]">
          Complete your profile to increase visibility to investors
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <ActionButton icon={Users} label="Add Team Members" primary />
          <ActionButton icon={Upload} label="Upload Pitch Deck" />
        </div>
      </div>
