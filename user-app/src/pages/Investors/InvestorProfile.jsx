import ProfileHeader from "../../components/Investor-profile/ProfileHeader";
import VerificationCard from "../../components/InvestorProfile/VerificationCard";
import InvestmentPreferences from "../../components/InvestorProfile/InvestmentPreferences";
import BackgroundExperience from "../../components/InvestorProfile/BackgroundExperience";
import InvestmentHistory from "../../components/InvestorProfile/InvestmentHistory";
import RatingsFeedback from "../../components/InvestorProfile/RatingsFeedback";
import RightSidebar from "../../components/InvestorProfile/RightSidebar";

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
