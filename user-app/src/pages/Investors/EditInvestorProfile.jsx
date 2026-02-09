import ProfileHeader from "../components/Edit-investor-profile/ProfileHeader";
import InvestmentPreferences from "../components/Edit-investor-profile/InvestmentPreferences";
import BackgroundExperience from "../components/Edit-investor-profile/BackgroundExperience";
import InvestmentHistory from "../components/Edit-investor-profile/InvestmentHistory";
import ConnectPanel from "../components/Edit-investor-profile/ConnectPanel";
import ProfileCompleteness from "../components/Edit-investor-profile/ProfileCompleteness";
import PrivacySettings from "../components/Edit-investor-profile/PrivacySettings";

export default function EditInvestorProfile() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          <ProfileHeader />
          <InvestmentPreferences />
          <BackgroundExperience />
          <InvestmentHistory />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <ConnectPanel />
          <ProfileCompleteness />
          <PrivacySettings />
        </div>

      </div>
    </div>
  );
}
