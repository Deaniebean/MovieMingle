import React, { useEffect, useState } from 'react';
import './Navbar.css';
import '../styles/globals.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  isOpen: boolean;
  toggleNavbar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, toggleNavbar }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isLaptopScreen = screenWidth > 1024; // Example threshold for laptops

  return (
    ['/login', '/'].includes(location.pathname) ? null :
    <>
      <div className="navbar">
        <div className={`burger-menu ${isLaptopScreen ? 'hidden' : ''}`} onClick={toggleNavbar}>
          <div className="burger-bar"></div>
          <div className="burger-bar"></div>
          <div className="burger-bar"></div>
        </div>
        {isLaptopScreen && (
          <div className="top-navbar">
            <div className="top-navbar-content">
          
              <div className="burger-menu" onClick={toggleNavbar}>
                <div className="burger-bar"></div>
                <div className="burger-bar"></div>
                <div className="burger-bar"></div>
              </div>
            </div>
          </div>
        )}

      </div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="close-sidebar" onClick={toggleNavbar}>
          X
        </div>
        <nav className="sidebar-nav">
          <ul>
          <li onClick={() => navigate("/home")}>Landingpage</li>
          <li onClick={() => navigate("/select")}>This or That</li>
          <li onClick={() => navigate("/watchlist")}>Watch List</li>
          <li onClick={() => navigate("/history")}>History</li>
          <li className="logout" onClick={() => navigate("/login")}>Logout</li>
          </ul>
        </nav>
      </div>
    </>
  );
};


export default Navbar;
