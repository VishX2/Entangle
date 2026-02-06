import ProfileHeader from "../../components/Investor-profile/ProfileHeader";
import VerificationCard from "../../components/Investor-profile/VerificationCard";
import InvestmentPreferences from "../../components/Investor-profile/InvestmentPreferences";
import BackgroundExperience from "../../components/Investor-profile/BackgroundExperience";
import InvestmentHistory from "../../components/Investor-profile/InvestmentHistory";
import RatingsFeedback from "../../components/Investor-profile/RatingsFeedback";

import ConnectInteract from "../../components/Investor-profile/ConnectInteract";
import AIToolsInsights from "../../components/Investor-profile/AIToolsInsights";
import Notifications from "../../components/Investor-profile/Notifications";
import PrivacySettings from "../../components/Investor-profile/PrivacySettings";

export default function InvestorProfile() {
  return (
    <div className="min-h-screen bg-slate-100 px-6 py-6">

      {/* PROFILE HEADER */}
      <ProfileHeader />

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

        {/* LEFT COLUMN */}
        <div className="xl:col-span-2 space-y-6">
          <VerificationCard />
          <InvestmentPreferences />
          <BackgroundExperience />
          <InvestmentHistory />
          <RatingsFeedback />
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          <ConnectInteract />
          <AIToolsInsights />
          <Notifications />
          <PrivacySettings />
        </div>

      </div>
    </div>
  );
}
