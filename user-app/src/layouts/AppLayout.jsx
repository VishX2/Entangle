import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet, useLocation } from 'react-router-dom';

const AppLayout = () => {
  const location = useLocation();

  // Map routes to sidebar active states
  const activeMap = {
    '/startup/dashboard': 'dashboard',
    '/startup/profile': 'profile',
    '/startup/messages': 'messages',
    '/startup/create': 'create-post',
    '/startup/analytics': 'analytics',
    '/startup/rankings': 'rankings',
    '/startup/trending': 'trending',
    '/startup/verification': 'verification',
    '/settings': 'settings',
    '/notifications': 'notifications',
    '/feedback-rules': 'feedback-rules',
    '/dashboard': 'dashboard',
    '/profile': 'profile',
    '/messages': 'messages',
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activePage={activeMap[location.pathname]} />

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
