import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import Dashboard from "./pages/AdminDashboard";
import InvestorVerification from "./pages/InvestorVerification";
import ContentModeration from "./pages/ContentModeration";
import CompanyDetail from "./pages/CompanyDetail";
import ReportsAndComplaints from "./pages/ReportsAndComplaints";
import UserManagement from "./pages/UserManagement";
import ConnectionRequests from "./pages/ConnectionRequests";
import AIMatchmaking from "./pages/AIMatchmaking";
import { selectToken, selectIsAdmin } from "./store/authSlice";

// Redirect root path depending on authentication state
function RootRedirect() {
  const token = useSelector(selectToken);
  const isAdmin = useSelector(selectIsAdmin);
  return <Navigate to={token && isAdmin ? "/dashboard" : "/login"} replace />;
}

// Prevent logged-in admins from accessing login page
function LoginOrRedirect() {
  const token = useSelector(selectToken);
  const isAdmin = useSelector(selectIsAdmin);
  if (token && isAdmin) return <Navigate to="/dashboard" replace />;
  return <AdminLogin />;
}

// Prevent logged-in admins from accessing register page
function RegisterOrRedirect() {
  const token = useSelector(selectToken);
  const isAdmin = useSelector(selectIsAdmin);
  if (token && isAdmin) return <Navigate to="/dashboard" replace />;
  return <AdminRegister />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/login" element={<LoginOrRedirect />} />
        <Route path="/register" element={<RegisterOrRedirect />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
        <Route path="/connection-requests" element={<ProtectedRoute><ConnectionRequests /></ProtectedRoute>} />
        <Route path="/investor-verification" element={<ProtectedRoute><InvestorVerification /></ProtectedRoute>} />
        <Route path="/content-moderation" element={<ProtectedRoute><ContentModeration /></ProtectedRoute>} />
        <Route path="/content-moderation/company/:id" element={<ProtectedRoute><CompanyDetail /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><ReportsAndComplaints /></ProtectedRoute>} />
        <Route path="/ai-matchmaking" element={<ProtectedRoute><AIMatchmaking /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
