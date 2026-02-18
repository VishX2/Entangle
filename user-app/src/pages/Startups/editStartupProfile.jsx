import EditStartupProfileHeader from "../../components/Startups/Edit-startup-profile/EditStartupProfileHeader";
import EditVerification from "../../components/Startups/Edit-startup-profile/EditVerfication";
import EditStartupPreferences from "../../components/Startups/Edit-startup-profile/EditStartupPreferences";
import EditStartupBackground from "../../components/Startups/Edit-startup-profile/EditStartupBackground";
import EditStartupHistory from "../../components/Startups/Edit-startup-profile/EditStartupHistory";
import EditStartupConnectPanel from "../../components/Startups/Edit-startup-profile/EditStartupConnectPanel";
import EditStartupPrivacy from "../../components/Startups/Edit-startup-profile/EditStartupPrivacy";
import EditStartupRatings from "../../components/Startups/Edit-startup-profile/EditStartupRatings";
import EditAiToolInsights from "../../components/Startups/Edit-startup-profile/EditAiToolInsights";
import EditNotificationSettings from "../../components/EditNotificationSettings";

export default function EditStartupProfile() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          <EditStartupProfileHeader />

          {/* Verification & Trust */}
          <EditVerification />

          {/* Investment Preferences */}
          <EditStartupPreferences />
          <EditStartupBackground />
          <EditStartupHistory />
          <EditStartupRatings />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <EditStartupConnectPanel />
          <EditAiToolInsights />
          <EditNotificationSettings />
        
          <EditStartupPrivacy />
        </div>

      </div>
    </div>
  );
}
