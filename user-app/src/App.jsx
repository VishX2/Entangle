import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import HomeLayout from './layouts/HomeLayout';
import EntangleLogin from './pages/Login';
import Home from './pages/Home';
import InvestorProfile from './pages/Investors/InvestorProfile';
import EditInvestorProfile from "./pages/Investors/EditInvestorProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME (NO SIDEBAR) */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<EntangleLogin />} />
        </Route>

        {/* APP (WITH SIDEBAR / DASHBOARD) */}
        <Route element={<AppLayout />}>
          <Route path="/investor/profile" element={<InvestorProfile />} />

          {/* EDIT INVESTOR PROFILE */}
          <Route
            path="/investor/edit-profile"
            element={<EditInvestorProfile />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
