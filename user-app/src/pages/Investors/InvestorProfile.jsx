import ProfileHeader from "../components/Investor-Profile/ProfileHeader";
import VerificationCard from "../components/Investor-Profile/VerificationCard";
import InvestmentPreferences from "../components/Investor-Profile/InvestmentPreferences";
import BackgroundExperience from "../components/Investor-Profile/BackgroundExperience";
import InvestmentHistory from "../components/Investor-Profile/InvestmentHistory";
import RatingsFeedback from "../components/Investor-Profile/RatingsFeedback";
import RightSidebar from "../components/Investor-Profile/RightSidebar";

export default function InvestorProfile() {
  return (
    <div className="min-h-screen bg-slate-100 px-6 py-6">
      <ProfileHeader />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        {/* Left content */}
        <div className="xl:col-span-2 space-y-6">
          <VerificationCard />
          <InvestmentPreferences />
          <BackgroundExperience />
          <InvestmentHistory />
          <RatingsFeedback />
        </div>

        {/* Right sidebar */}
        <RightSidebar />
      </div>
    </div>
  );
}
