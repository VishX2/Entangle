import { Outlet, useLocation } from "react-router-dom";
import EntrepreneurSidebar from "../components/EntrepreneurSidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const EntrepreneurLayout = () => {
  const location = useLocation();

  const activeMap = {
    "/entrepreneur/dashboard": "dashboard",
    "/entrepreneur/profile": "profile",
    "/entrepreneur/create-post": "create-post",
    "/entrepreneur/analytics": "analytics",
    "/entrepreneur/rankings": "rankings",
    "/entrepreneur/trending": "trending",
    "/entrepreneur/messages": "messages",
    "/entrepreneur/verification": "verification",
    "/entrepreneur/settings": "settings",
  };

  return (
    <div className="flex min-h-screen bg-[#FAF6EE]">
      {/* Sidebar */}
      <EntrepreneurSidebar activePage={activeMap[location.pathname]} />

      {/* Main */}
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

export default EntrepreneurLayout;
