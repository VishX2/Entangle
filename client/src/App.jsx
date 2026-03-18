import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './layouts/AppLayout';
import HomeLayout from './layouts/HomeLayout';
import EntangleLogin from './pages/Login';
import Home from './pages/Home';
import UserTypeSelectionPage from './pages/UserTypeSelectionPage';
import InvestorRegistrationPage from './pages/Investors/InvestorRegistrationPage';
import EntrepreneurRegistrationPage from './pages/Entrepreneurs/EntrepreneurRegistrationPage';
import StartupRegistrationPage from './pages/Startups/StartupRegistrationPage';
import VerificationPage from './pages/VerificationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

// Investor
import InvestorProfile from './pages/Investors/InvestorProfile';
import EditInvestorProfile from "./pages/Investors/EditInvestorProfile";
import InvestorRecommendations from "./pages/Investors/investorRecommendations";
import StartupProfileGate from "./pages/Startups/StartupProfileGate";
import InvestorMessages from "./pages/Investors/InvestorMessages";
import InvestorDashboard from "./pages/Investors/InvestorDashboard";
import InvestorConnectionRequest from "./pages/Investors/InvestorConnectionRequests";




// Startup
import StartupDashboard from "./pages/Startups/startupDashboard";
import Messages from "./pages/Startups/startupChat";
import StartupProfile from "./pages/Startups/startupProfile";
import EditStartupProfile from "./pages/Startups/editStartupProfile";
import StartupConnectionRequests from "./pages/Startups/startupConnectionRequests";
import InvestorProfileGate from "./pages/Investors/InvestorProfileGate"; 
import StartupCollaborations from "./pages/Startups/StartupCollaborationOpportunitiesPage";

// Entrepreneur
import Dashboard from "./pages/Entrepreneurs/entrepreneurDashboard";
import EntrepreneurProfile from "./pages/Entrepreneurs/EntrepreneurProfilePage";
import EditEntrepreneurProfile from "./pages/Entrepreneurs/EditEntrepreneurProfilePage";
import EntrepreneurConnections from "./pages/Entrepreneurs/EntrepreneurConnectionRequestsPage";
import EntrepreneurMessages from "./pages/Entrepreneurs/EntrepreneurMessagingPage";

// Other
import FeedbackAndRisk from './pages/FeedbackAndRisk';

// Startup Discovery & AI Matchmaking
import StartupDiscovery from "./pages/StartupDiscovery";
import AiMatchmaking from "./pages/AiMatchmaking";
import CompanyProfile from "./pages/CompanyProfile";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Routes>

        {/* HOME */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<EntangleLogin />} />
          <Route path="/select-type" element={<UserTypeSelectionPage />} />
          <Route path="/register/investor" element={<InvestorRegistrationPage />} />
          <Route path="/register/entrepreneur" element={<EntrepreneurRegistrationPage />} />
          <Route path="/register/startup" element={<StartupRegistrationPage />} />
          <Route path="/verify" element={<VerificationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/feedbackAndRisk" element={<FeedbackAndRisk />} />
        </Route>

        {/* STARTUP (protected) */}
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/startup/dashboard" element={<StartupDashboard />} />
          <Route path="/startup/messages" element={<Messages />} />
          <Route path="/startup/profile" element={<StartupProfile />} />
          <Route path="/startup/editProfile" element={<EditStartupProfile />} />
          <Route path="/startup/requests" element={<StartupConnectionRequests />} />
          <Route path="/startup/investorProfileView" element={<InvestorProfileGate />} />
          <Route path="/startup/startupCollaborations" element={<StartupCollaborations />} />
          <Route path="/startup/ai-matchmaking" element={<AiMatchmaking />} />
          <Route path="/startup/company/:id" element={<CompanyProfile />} />
        </Route>

        {/* INVESTOR (protected) */}
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="/investor/dashboard" element={<InvestorDashboard />} />
          <Route path="/investor/profile" element={<InvestorProfile />} />
          <Route path="/investor/edit-profile" element={<EditInvestorProfile />} />
          <Route path="/investor/recommendations" element={<InvestorRecommendations />} />
          <Route path="/investor/AiMatchmaking" element={<StartupDiscovery />} />
          <Route path="/investor/ai-matchmaking" element={<AiMatchmaking />} />
          <Route path="/investor/company/:id" element={<CompanyProfile />} />
          <Route path="/investor/startupProfileView" element={<StartupProfileGate />} />
          <Route path="/investor/messages" element={<InvestorMessages />} />
          <Route path="/investor/requests" element={<InvestorConnectionRequest />} />

          

        </Route>

        {/* ENTREPRENEUR (protected) */}
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/entrepreneur/dashboard" element={<Dashboard />} />
          <Route path="/entrepreneur/profile" element={<EntrepreneurProfile />} />
          <Route path="/entrepreneur/profile/edit" element={<EditEntrepreneurProfile />} />
          <Route path="/entrepreneur/connections" element={<EntrepreneurConnections />} />
          <Route path="/entrepreneur/messages" element={<InvestorMessages />} />
          <Route path="/entrepreneur/ai-matchmaking" element={<AiMatchmaking />} />
          <Route path="/entrepreneur/company/:id" element={<CompanyProfile />} />
        </Route>

        {/* 404 - catch all unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
