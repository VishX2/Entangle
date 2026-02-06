import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import HomeLayout from './layouts/HomeLayout';
import EntangleLogin from './pages/Login';
import Home from './pages/Home';
import InvestorProfile from './pages/Investors/InvestorProfile'; // ✅ NEW

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

        {/* APP (WITH SIDEBAR / DASHBOARD) */}
        <Route element={<AppLayout />}>
          <Route path="/investor/profile" element={<InvestorProfile />} />
        </Route>



        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
