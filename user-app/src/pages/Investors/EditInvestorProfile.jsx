import EditInvestorProfileHeader from "../../components/Edit-investor-profile/EditInvestorProfileHeader";
import EditVerification from "../../components/Edit-investor-profile/EditVerification";
import EditInvestorPreferences from "../../components/Edit-investor-profile/EditInvestorPreferences";
import EditInvestorBackground from "../../components/Edit-investor-profile/EditInvestorBackground";
import EditInvestorHistory from "../../components/Edit-investor-profile/EditInvestorHistory";
import EditInvestorConnectPanel from "../../components/Edit-investor-profile/EditInvestorConnectPanel";
import EditInvestorPrivacy from "../../components/Edit-investor-profile/EditInvestorPrivacy";
import EditInvestorRatings from "../../components/Edit-investor-profile/EditInvestorRatings";
import EditAiToolInsights from "../../components/Edit-investor-profile/EditAiToolInsights";
import EditNotificationSettings from "../../components/EditNotificationSettings";

export default function EditInvestorProfile() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          <EditInvestorProfileHeader />

          {/* Verification & Trust */}
          <EditVerification />

          {/* Investment Preferences */}
          <EditInvestorPreferences />

          <EditInvestorBackground />
          <EditInvestorHistory />
          <EditInvestorRatings />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <EditInvestorConnectPanel />
          <EditAiToolInsights />
          <EditNotificationSettings />
        
          <EditInvestorPrivacy />
        </div>

      </div>
    </div>
  );
}
