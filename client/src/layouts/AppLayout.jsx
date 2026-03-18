import InvestorSidebar from '../components/InvestorSidebar';
import StartupSidebar from '../components/StartupSidebar';
import EntrepreneurSidebar from '../components/EntrepreneurSidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet, useLocation } from 'react-router-dom';

const AppLayout = () => {
  const location = useLocation();

  // Determine which sidebar to show based on route
  const getSidebar = () => {
    if (location.pathname.startsWith('/investor')) {
      return <InvestorSidebar />;
    } else if (location.pathname.startsWith('/startup')) {
      return <StartupSidebar />;
    } else if (location.pathname.startsWith('/entrepreneur')) {
      return <EntrepreneurSidebar />;
    }
    // Default to Entrepreneur sidebar for legacy routes
    return <EntrepreneurSidebar />;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      {getSidebar()}

      {/* Main Content */}
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
