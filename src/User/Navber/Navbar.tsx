import { useState, useEffect, useRef } from 'react';
import { FaBars, FaCartPlus, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navbarRef = useRef<HTMLElement>(null);
    const location = useLocation();

    

    const toggleNavbar = (): void => {
        setIsOpen(!isOpen);

        if (!isOpen) {
            document.body.classList.add('overflow-hidden'); // Prevent background scroll
            gsap.to(menuRef.current, { x: 0, duration: 0.5, ease: 'power3.inOut' });
        } else {
            document.body.classList.remove('overflow-hidden'); // Allow background scroll
            gsap.to(menuRef.current, { x: '-100%', duration: 0.5, ease: 'power3.inOut' });
        }
    };
    console.log('Menu isOpen:', isOpen);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
                gsap.to(navbarRef.current, { y: 0, duration: 0.5, ease: 'power3.inOut' });
            } else {
                setScrolled(false);
                gsap.to(navbarRef.current, { y: 0, duration: 0.5, ease: 'power3.inOut' });
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                document.body.classList.remove('overflow-hidden'); // Allow background scroll
                gsap.to(menuRef.current, { x: '-100%', duration: 0.5, ease: 'power3.inOut' });
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 500) {
                setIsOpen(false); // Close menu when resizing to larger than 500px
                document.body.classList.remove('overflow-hidden'); // Allow background scroll
                gsap.to(menuRef.current, { x: '-100%', duration: 0.5, ease: 'power3.inOut' });
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLinkClick = (): void => {
        toggleNavbar();
    };

    const navLinkStyles = (path: string): string => {
        const isActive = location.pathname === path;
        return `hover:text-black transition-colors duration-300 ${isActive ? 'text-black' : ''}`;
    };

    return (
        <nav
            ref={navbarRef}
            className={`fixed w-full top-0 left-0 z-50 p-4 py-6 px-12 flex items-center justify-between transition-all duration-500 ${
                scrolled || isOpen ? 'bg-white text-black shadow-md' : 'bg-transparent text-white'
            }`}
        >
            <div className="md:hidden flex items-center">
                <FaBars onClick={toggleNavbar} className="text-2xl cursor-pointer" />
            </div>

            {/* for md and lg devices */}
            <div className="text-lg font-bold ml-auto md:ml-0 ">
                <Link to="/">Logo</Link>
            </div>
            <div className="md:flex hidden space-x-6">
                <Link to="/" className={navLinkStyles('/')}>Home</Link>
                <Link to="/all-cars" className={navLinkStyles('/vehicles')}>Vehicles</Link>
                <Link to="/go-bd" className={navLinkStyles('/go-bd')}>Go BD</Link>
                <Link to="/explore-bd" className={navLinkStyles('/explore-bd')}>Explore BD</Link>
                <Link to="/about" className={navLinkStyles('/about')}>About Us</Link>
            </div>

            {/* for small devices */}
            <div
               ref={menuRef}
               className={`nav-menu lg:hidden fixed top-0 left-0 w-3/4 h-full bg-blue-600 text-white flex flex-col py-10 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {isOpen && (
                    <FaTimes onClick={toggleNavbar} className="text-2xl cursor-pointer self-end fixed top-4 right-4" />
                )}
                <Link to="/" className={navLinkStyles('/')} onClick={handleLinkClick} ><p className='bg-blue-600 py-2 px-6 '>Home</p></Link>
                <Link to="/all-cars" className={navLinkStyles('/vehicles')} onClick={handleLinkClick}><p className='bg-blue-600 py-2 px-6 '>Vehicles</p></Link>
                <Link to="/go-bd" className={navLinkStyles('/go-bd')} onClick={handleLinkClick}><p className='bg-blue-600 py-2 px-6 '>Go BD</p></Link>
                <Link to="/explore-bd" className={navLinkStyles('/explore-bd')} onClick={handleLinkClick}><p className='bg-blue-600 py-2 px-6 '>Explore BD</p></Link>
                <Link to="/about" className={navLinkStyles('/about')} onClick={handleLinkClick}><p className='bg-blue-600 py-2 px-6 '>About</p></Link>

                        <p className='bg-blue-600 py-16 px-6 '></p>
            </div>
            <div>
                <FaCartPlus />
            </div>
        </nav>
    );
};

export default Navbar;
