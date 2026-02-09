import EditInvestorProfileHeader from "../../components/Edit-investor-profile/EditInvestorProfileHeader";
import EditInvestorPreferences from "../../components/Edit-investor-profile/EditInvestorPreferences";
import EditInvestorBackground from "../../components/Edit-investor-profile/EditInvestorBackground";
import EditInvestorHistory from "../../components/Edit-investor-profile/EditInvestorHistory";
import EditInvestorConnectPanel from "../../components/Edit-investor-profile/EditInvestorConnectPanel";
import EditInvestorCompleteness from "../../components/Edit-investor-profile/EditInvestorCompleteness";
import EditInvestorPrivacy from "../../components/Edit-investor-profile/EditInvestorPrivacy";

export default function EditInvestorProfile() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          <EditInvestorProfileHeader />
          <EditInvestorPreferences />
          <EditInvestorBackground />
          <EditInvestorHistory />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <EditInvestorConnectPanel />
          <EditInvestorCompleteness />
          <EditInvestorPrivacy />
        </div>

      </div>
    </div>
  );
}
