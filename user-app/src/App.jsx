import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import HomeLayout from './layouts/HomeLayout';
import EntangleLogin from './pages/Login';
import Home from './pages/Home';
import StartupDashboard from "./pages/Startups/startupDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME (NO SIDEBAR) */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<EntangleLogin />} />
        </Route>

         {/* WITH SIDEBAR */}
        <Route element={<AppLayout />}>
          <Route path="/startup/dashboard" element={<StartupDashboard />} />
        </Route>



        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
