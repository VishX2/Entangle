import ProfileHeader from "../../components/Startups/Startup-profile/ProfileHeader";
import VerificationCard from "../../components/Startups/Startup-profile/VerificationCard";
import InvestmentPreferences from "../../components/Startups/Startup-profile/InvestmentPreferences";
import BackgroundExperience from "../../components/Startups/Startup-profile/BackgroundExperience";
import InvestmentHistory from "../../components/Startups/Startup-profile/InvestmentHistory";
import RatingsFeedback from "../../components/Startups/Startup-profile/RatingsFeedback";
import ConnectInteract from "../../components/Startups/Startup-profile/ConnectInteract";
import AIToolsInsights from "../../components/Startups/Startup-profile/AIToolsInsights";
import Notifications from "../../components/Startups/Startup-profile/Notifications";
import PrivacySettings from "../../components/Startups/Startup-profile/PrivacySettings";


export default function StartupProfile() {
  return (
    <div className="min-h-screen bg-slate-100 px-6 py-6">
      
      {/* CENTERED CONTAINER */}
      <div className="max-w-7xl mx-auto">
        
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
    </div>
  );
}
