import React from 'react';
import './Navbar.css';
import '../styles/globals.css';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isOpen: boolean;
  toggleNavbar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, toggleNavbar }) => {
  return (
    <>
    <div className="navebar">
      <div className="burger-menu" onClick={toggleNavbar}>
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
      </div>
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
          </ul>
        </nav>
      </div>
    </>
  );
};

/* <li><Link to='/landingpage'>Landingpage</Link></li> */
export default Navbar; 

