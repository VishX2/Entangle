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


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME (NO SIDEBAR) */}
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
        </Route>

        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
