import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import HomeLayout from './layouts/HomeLayout';
import EntangleLogin from './pages/Login';
import Home from './pages/Home';

import Dashboard from "./pages/Entrepreneurs/EntrepreneurDashboard";
import EntrepreneurProfile from "./pages/Entrepreneurs/EntrepreneurProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME (NO SIDEBAR) */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<EntangleLogin />} />
        </Route>


        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>


        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<EntrepreneurProfile />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
