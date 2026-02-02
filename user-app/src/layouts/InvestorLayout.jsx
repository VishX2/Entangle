import { Outlet, useLocation } from "react-router-dom";
import InvestorSidebar from "../components/InvestorSidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const InvestorLayout = () => {
  const location = useLocation();

  const activeMap = {
    "/investor/dashboard": "dashboard",
    "/investor/search": "search",
    "/investor/ai-matches": "ai-matches",
    "/investor/profile": "profile",
    "/investor/ranking": "ranking",
    "/investor/trending": "trending",
    "/investor/messages": "messages",
    "/investor/verification": "verification",
    "/investor/settings": "settings",
  };

  return (
    <div className="flex min-h-screen bg-[#FAF6EE]">
      {/* Sidebar */}
      <InvestorSidebar activePage={activeMap[location.pathname]} />

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

export default InvestorLayout;
