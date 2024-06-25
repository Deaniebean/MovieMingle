import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import '../styles/globals.css';
import { useLocation, useNavigate } from 'react-router-dom';

// Components
import MenuIcon from '@mui/icons-material/Menu';
import LogoImage from './innerComponents/Logo';

// Assets
import Logo from '../../public/logo.png'

// interface LogoProps {
//   src: string;
//   alt: string;
// }

// const Logo: React.FC<LogoProps> = ({ src, alt }) => (
//   // Max height and width added to image and object: contain
//   <img loading="lazy" src={src} alt={alt} className='w-14 h-14 object-contain'/>
// );

interface NavbarProps {
  isOpen: boolean;
  toggleNavbar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, toggleNavbar }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  
  const navbarRef = useRef<HTMLDivElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(window.innerWidth > 767 ? 60 : 0);

  useEffect(() => {
    console.log("navbar height:" + navbarHeight);
  }, [navbarHeight]);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    console.log(`Navbar height: ${navbarHeight}`);
  }, [navbarHeight]);
  
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, [navbarHeight]);
  
  const isLaptopScreen = screenWidth > 767; // Example threshold for laptops

  const handleNavigation = (path: string) => {
    navigate(path);
    toggleNavbar(); 
  };

  return (
    ['/login', '/'].includes(location.pathname) ? null :
    <>
      <div className="navbar">
        {isLaptopScreen ? (
          <div className="top-navbar" ref={navbarRef}>
            <div className="top-navbar-content">
              <div className="burger-menu" onClick={toggleNavbar}>
                
               <MenuIcon fontSize='large'/>
              </div>
              <h1 className="logo mt-3">MovieMingle</h1>
              <LogoImage src={Logo} alt="Logo" />  
            </div>
          </div>
        ) : (
          <div className="burger-menu text-white p-4 mb-3" onClick={toggleNavbar}>
              <MenuIcon fontSize='large'/>
          </div>
        )}
      </div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="close-sidebar" onClick={toggleNavbar}>
          X
        </div>
        <nav className="sidebar-nav">
          <ul>
          <li onClick={() => handleNavigation("/home")}>Landingpage</li>
              <li onClick={() => handleNavigation("/select")}>This or That</li>
              <li onClick={() => handleNavigation("/watchlist")}>Watch List</li>
              <li onClick={() => handleNavigation("/history")}>History</li>
          <li className="logout" onClick={() => navigate("/login")}>Logout</li>
          </ul>
        </nav>
      </div>
    </>
) 
};


export default Navbar;
