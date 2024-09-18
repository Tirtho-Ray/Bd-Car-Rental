import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Fetures/loginSlice";
import { TbBrandBooking } from "react-icons/tb";
import { getUserData } from "../../utils/stroage";
import Swal from "sweetalert2";


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenData = getUserData();
    if (tokenData) {
      setUserRole(tokenData.role || null);
      setIsAuthenticated(true);
    } else {
      setUserRole(null);
      setIsAuthenticated(false);
    }
  }, [location.pathname]); // Re-check on route change

  const toggleNavbar = (): void => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("overflow-hidden", !isOpen);
    gsap.to(menuRef.current, {
      x: isOpen ? "-100%" : 0,
      duration: 0.5,
      ease: "power3.inOut",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      gsap.to(navbarRef.current, {
        y: window.scrollY > 50 ? 0 : 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        toggleNavbar();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 500) {
        setIsOpen(false);
        document.body.classList.remove("overflow-hidden");
        gsap.to(menuRef.current, {
          x: "-100%",
          duration: 0.5,
          ease: "power3.inOut",
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = (): void => {
    toggleNavbar();
  };

  const navLinkStyles = (path: string): string => {
    const isActive = location.pathname === path;
    return `hover:text-black transition-colors duration-300 ${isActive ? "text-black" : ""}`;
  };

  const handleLogout = async () => {
    try {
      await Swal.fire({
        title: 'Success!',
        text: 'You have been logged out.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      dispatch(logout());
      localStorage.clear();
      setIsAuthenticated(false); // Update authentication status
      navigate("/");

    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav
      ref={navbarRef}
      className={`fixed w-full top-0 left-0 z-50 p-4 py-6 px-12 flex items-center justify-between transition-all duration-500 ${
        scrolled || isOpen
          ? "bg-white text-black shadow-md"
          : "bg-transparent text-white"
      }`}
    >
      <div className="md:hidden flex items-center">
        <FaBars onClick={toggleNavbar} className="text-2xl cursor-pointer" />
      </div>

      <div className="text-lg font-bold ml-auto md:ml-0">
        <Link to="/">Logo</Link>
      </div>
      <div className="md:flex hidden space-x-6">
        <Link to="/" className={navLinkStyles("/")}>
          <p className="font-serif">Home</p>
        </Link>
        <Link to="/all-cars" className={navLinkStyles("/all-cars")}>
          Vehicles
        </Link>
        <Link to="/go-bangladesh" className={navLinkStyles("/go-bangladesh")}>
          Go BD
        </Link>
        <Link to="/about" className={navLinkStyles("/about")}>
          About Us
        </Link>
        {/* <Link to="/payment-book" className={navLinkStyles("/payment-book")}>
          payment  
        </Link> */}
        {(userRole === "SUPER_ADMIN" || userRole === "ADMIN") && (
          <Link
            to="/admin-dashboard/home"
            className={navLinkStyles("/admin-dashboard/home")}
          >
            Admin Dashboard
          </Link>
        )}
        {isAuthenticated && (
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      <div
        ref={menuRef}
        className={`nav-menu lg:hidden fixed top-0 left-0 w-3/4 h-full bg-blue-600 text-white flex flex-col py-10 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {isOpen && (
          <FaTimes
            onClick={toggleNavbar}
            className="text-2xl cursor-pointer self-end fixed top-4 right-4"
          />
        )}
        <Link to="/" className={navLinkStyles("/")} onClick={handleLinkClick}>
          <p className="bg-blue-600 py-2 px-6">Home</p>
        </Link>
        <Link
          to="/all-cars"
          className={navLinkStyles("/all-cars")}
          onClick={handleLinkClick}
        >
          <p className="bg-blue-600 py-2 px-6">Vehicles</p>
        </Link>
        <Link
          to="/go-bangladesh"
          className={navLinkStyles("/go-bangladesh")}
          onClick={handleLinkClick}
        >
          <p className="bg-blue-600 py-2 px-6">Go BD</p>
        </Link>
        {/* <Link
          to="/explore-bd"
          className={navLinkStyles("/explore-bd")}
          onClick={handleLinkClick}
        >
          <p className="bg-blue-600 py-2 px-6">Explore BD</p>
        </Link> */}
        <Link
          to="/about"
          className={navLinkStyles("/about")}
          onClick={handleLinkClick}
        >
          <p className="bg-blue-600 py-2 px-6">About</p>
        </Link>
        {(userRole === "SUPER_ADMIN" || userRole === "ADMIN") && (
          <Link
            to="/admin-dashboard/home"
            className={navLinkStyles("/admin-dashboard/home")}
            onClick={handleLinkClick}
          >
            <p className="bg-blue-600 py-2 px-6">Dashboard</p>
          </Link>
        )}
        {isAuthenticated && (
          <p className="bg-blue-600 py-16 px-6">Logout</p>
        )}
      </div>
      <div className="flex items-center cursor-pointer gap-3 text-sm">
        <Link to="/my-bookings">
          <p className="text-[20px]">
            <TbBrandBooking />
          </p>
        </Link>
        <Link to="/sign-in">
          <FaUser />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
