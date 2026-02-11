import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

// Startup
import StartupDashboard from "./pages/Startups/startupDashboard";
import Messages from "./pages/Startups/startupChat";
import StartupProfile from "./pages/Startups/startupProfile";
import EditStartupProfile from "./pages/Startups/editStartupProfile";
import StartupConnectionRequests from "./pages/Startups/startupConnectionRequests";
import InvestorProfileView from "./pages/Startups/investorProfileView";

// Entrepreneur
import Dashboard from "./pages/Entrepreneurs/EntrepreneurDashboard";
import EntrepreneurProfile from "./pages/Entrepreneurs/EntrepreneurProfilePage";
import EditEntrepreneurProfile from "./pages/Entrepreneurs/EditEntrepreneurProfilePage";
import EntrepreneurConnections from "./pages/Entrepreneurs/EntrepreneurConnectionRequestsPage";
import EntrepreneurMessages from "./pages/Entrepreneurs/EntrepreneurMessagingPage";

// Other
import FeedbackAndRisk from './pages/FeedbackAndRisk';

function App() {
  return (
    <BrowserRouter>
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

        {/* STARTUP */}
        <Route element={<AppLayout />}>
          <Route path="/startup/dashboard" element={<StartupDashboard />} />
          <Route path="/startup/messages" element={<Messages />} />
          <Route path="/startup/profile" element={<StartupProfile />} />
          <Route path="/startup/editProfile" element={<EditStartupProfile />} />
          <Route path="/startup/requests" element={<StartupConnectionRequests />} />
          <Route path="/startup/investorProfileView" element={<InvestorProfileView />} />
        </Route>

        {/* INVESTOR */}
        <Route element={<AppLayout />}>
          <Route path="/investor/profile" element={<InvestorProfile />} />
          <Route path="/investor/edit-profile" element={<EditInvestorProfile />} />
          <Route path="/investor/recommendations" element={<InvestorRecommendations />} />
        </Route>

        {/* ENTREPRENEUR */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<EntrepreneurProfile />} />
          <Route path="/profile/edit" element={<EditEntrepreneurProfile />} />
          <Route path="/connections" element={<EntrepreneurConnections />} />
          <Route path="/messages" element={<EntrepreneurMessages />} />
        </Route>

      </Routes>

      </BrowserRouter>
  );
}

export default App;

