import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/AdminDashboard";
import StartupVerification from "./pages/StartupVerification";
import ContentModeration from "./pages/ContentModeration";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Admin Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Startup Verification */}
        <Route
          path="/startup-verification"
          element={<StartupVerification />}
        />

        {/* Content Moderation */}
        <Route
          path="/content-moderation"
          element={<ContentModeration />}
        />
      </Routes>
    </BrowserRouter>
  );
}
