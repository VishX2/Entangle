import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import HomeLayout from './layouts/HomeLayout';
import EntangleLogin from './pages/Login';
import Home from './pages/Home';
import FeedbackAndRisk from './pages/FeedbackAndRisk';
import StartupDashboard from "./pages/Startups/startupDashboard";
import Messages from "./pages/Startups/startupChat";
import StartupProfile from "./pages/Startups/startupProfile";
import EditStartupProfile from "./pages/Startups/editStartupProfile";
import StartupConnectionRequests from "./pages/Startups/startupConnectionRequests";
import InvestorRecommendations from "./pages/Investors/investorRecommendations";
import InvestorProfileView from "./pages/Startups/investorProfileView";

import Dashboard from "./pages/Entrepreneurs/EntrepreneurDashboard";
import EntrepreneurProfile from "./pages/Entrepreneurs/EntrepreneurProfilePage";
import EditEntrepreneurProfile from "./pages/Entrepreneurs/EditEntrepreneurProfilePage";
import StartupCollaborationOpportunitiesPage from "./pages/Startups/StartupCollaborationOpportunitiesPage";
import EntrepreneurConnections from "./pages/Entrepreneurs/EntrepreneurConnectionRequestsPage";
import EntrepreneurMessages from "./pages/Entrepreneurs/EntrepreneurMessagingPage";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Error403 from "./pages/errors/Error403";
import Error404 from "./pages/errors/Error404";
import Error500 from "./pages/errors/Error500";
import Loading from "./pages/Loading";
import Maintenance from "./pages/Maintenance";
import FeedbackAlertRules from "./pages/FeedbackAlertRules";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME (NO SIDEBAR) */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<EntangleLogin />} />
          <Route path="/feedbackAndRisk" element={<FeedbackAndRisk />} />

        </Route>

         {/* STARTUP WITH SIDEBAR */}
        <Route element={<AppLayout />}>
          <Route path="/startup/dashboard" element={<StartupDashboard />} />
          <Route path="/startup/messages" element={<Messages />} />
          <Route path="/startup/profile" element={<StartupProfile  />} />
          <Route path="/startup/editProfile" element={<EditStartupProfile  />} />
          <Route path="/startup/requests" element={<StartupConnectionRequests  />} />
          <Route path="/investor/recommendations" element={<InvestorRecommendations  />} />
          <Route path="/startup/investorProfileView" element={<InvestorProfileView  />} />
        </Route>


        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>


        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<EntrepreneurProfile />} />
          <Route path="/profile/edit" element={<EditEntrepreneurProfile />} />
          <Route path="/collaborations" element={<StartupCollaborationOpportunitiesPage />} />
          <Route path="/connections" element={<EntrepreneurConnections />} />
          <Route path="/messages" element={<EntrepreneurMessages />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/feedback-rules" element={<FeedbackAlertRules />} />
        </Route>

        {/* ERROR PAGES */}
        <Route path="/error/403" element={<Error403 />} />
        <Route path="/error/404" element={<Error404 />} />
        <Route path="/error/500" element={<Error500 />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="*" element={<Error404 />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;