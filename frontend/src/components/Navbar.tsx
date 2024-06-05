import React, { useEffect, useState } from 'react';
import './Navbar.css';
import '../styles/globals.css';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isOpen: boolean;
  toggleNavbar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, toggleNavbar }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
          <li>Landingpage</li>
          <li>This or That</li>
          <li>Watch List</li>
          <li>History</li>
          <li>Search</li>
          <li className="logout">Logout</li>
          </ul>
        </nav>
      </div>
    </>
  );
};

/**
           <ul>
          <li><Link to="/">Landingpage</Link></li>
          <li><Link to="/this-or-that">This or That</Link></li>
          <li><Link to="/watch-list">Watch List</Link></li>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li className="logout"><Link to="/logout">Logout</Link></li>
          </ul>
 */

export default Navbar;
