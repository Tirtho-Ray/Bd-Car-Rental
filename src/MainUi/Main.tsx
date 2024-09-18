import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../User/Navber/Navbar";
import Footer from "../Footer/Footer";
import { ThemeProvider } from "../utils/Them";

const Main = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on route change
  }, [location]);

  const isDashboardPage = location.pathname.startsWith("/admin-dashboard");

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        {!isDashboardPage && <Navbar />}
        <div className="flex-grow">
          <Outlet />
        </div>
        {!isDashboardPage && <Footer />}
      </div>
    </ThemeProvider>
  );
};

export default Main;
