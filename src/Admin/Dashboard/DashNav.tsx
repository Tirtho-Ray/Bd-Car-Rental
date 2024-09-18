import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaCog, FaBars, FaTimes } from 'react-icons/fa';
import { getUserData } from '../../utils/stroage';

const DashNav = () => {
    const navigate = useNavigate();
    const tokenData = getUserData();
    const userRole = tokenData?.role || '';
  

    useEffect(() => {
        if (userRole !== 'SUPER_ADMIN' && userRole !== 'ADMIN') {
          navigate('/sign-up');
        }
      }, [userRole, navigate]);

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between h-16 bg-gray-900 px-4">
                        <h1 className="text-xl font-bold py-4">Admin Panel</h1>
                        {/* Close Button */}
                        <button
                            onClick={closeSidebar}
                            className="text-gray-400 md:hidden focus:outline-none"
                        >
                            <FaTimes className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Sidebar Navigation Links */}
                    <nav className="flex flex-col flex-1 p-4 space-y-4">
                        <Link
                            to="/admin-dashboard/home"
                            className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                            onClick={closeSidebar} // Close sidebar when clicking the link
                        >
                            <FaHome className="mr-3" /> Dashboard
                        </Link>
                        <Link
                            to="/admin-dashboard/product"
                            className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                            onClick={closeSidebar} // Close sidebar when clicking the link
                        >
                            <FaUser className="mr-3" /> Cars
                        </Link>
                        <Link
                            to="/admin-dashboard/bookings-data"
                            className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                            onClick={closeSidebar} // Close sidebar when clicking the link
                        >
                            <FaUser className="mr-3" /> Bookings
                        </Link>
                        <Link
                            to="/"
                            className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                            onClick={closeSidebar} // Close sidebar when clicking the link
                        >
                            <FaCog className="mr-3" /> Main Home
                        </Link>
                    </nav>

                    {/* Sidebar Logout */}
                    {/* <div className="p-4">
                        <Link
                            to="/logout"
                            className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                            onClick={closeSidebar} // Close sidebar when clicking the link
                        >
                            <FaSignOutAlt className="mr-3" /> Logout
                        </Link>
                    </div> */}
                </div>
            </div>

            {/* Overlay for closing sidebar on mobile */}
            {isOpen && (
                <div
                    onClick={closeSidebar}
                    className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
                ></div>
            )}

            {/* Main Content Area */}
            <div className="flex ">
                {/* Mobile Toggle Button */}
                <header className="bg-white p-4 shadow-md md:hidden">
                    <button onClick={toggleSidebar} className="text-gray-700">
                        <FaBars className="w-6 h-6" />
                    </button>
                </header>

                {/* Main Content */}
               
            </div>
        </div>
    );
};

export default DashNav;
