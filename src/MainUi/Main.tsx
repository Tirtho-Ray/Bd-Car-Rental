import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../User/Navber/Navbar";
import Footer from "../Footer/Footer";

const Main = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top of the page on route change
    }, [location]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow"> {/* Allows the main content to expand and push the footer down */}
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;
