import { UserSidebar, Header, Footer } from '../components/organisms/layout';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { selectCurrentUser } from '../store/authSlice';

const DASHBOARDS = { investor: '/investor/dashboard', startup: '/startup/dashboard', entrepreneur: '/entrepreneur/dashboard' };
const TYPE_LABELS = { investor: 'Investor', startup: 'Startup', entrepreneur: 'Entrepreneur' };

const AppLayout = () => {
  const location = useLocation();
  const user = useSelector(selectCurrentUser);
  const userType = user?.user_type;

  const path = location.pathname;
  const isTypeSpecific = path.startsWith('/investor') || path.startsWith('/startup') || path.startsWith('/entrepreneur');
  const isAdmin = Number(user?.role_id) === 1;
  if (isTypeSpecific && !isAdmin) {
    if (!userType) {
      toast('Please complete your profile to continue.', { icon: '👤' });
      return <Navigate to="/select-type" replace />;
    }
    const wrongType =
      (path.startsWith('/investor') && userType !== 'investor') ||
      (path.startsWith('/startup') && userType !== 'startup') ||
      (path.startsWith('/entrepreneur') && userType !== 'entrepreneur');
    if (wrongType) {
      const correct = DASHBOARDS[userType];
      if (correct) {
        const label = TYPE_LABELS[userType] || userType;
        toast(`You're signed in as ${label}. Redirecting to your dashboard.`, { icon: '↪️' });
        return <Navigate to={correct} replace />;
      }
    }
  }

  return (
    <div className="flex min-h-screen bg-[#F5F0DD]">
      <UserSidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
