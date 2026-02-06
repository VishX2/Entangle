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

         {/* WITH SIDEBAR */}
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
        </Route>




        

      </Routes>
    </BrowserRouter>
  );
}

export default App;