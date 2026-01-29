import React from 'react';
import Emoji from './Emoji';
import logo from '../assets/logo.webp';
import './Header.css';

/**
 * Header Component
 * Purpose: Display company logo, app title, and dynamic tagline with Glassmorphism influence.
 */
const Header = () => {
  return (
    <header className="header glass fade-in">
      <div className="header-content">
        <div className="logo-container">
          <img src={logo} alt="DS Checker Logo" className="logo-img" />
          <h1 className="title">
            DS<span className="accent">Checker</span>
          </h1>
        </div>
        <p className="tagline">
          Analisi intelligente ingredienti per la <span className="highlight">Dermatite Seborroica</span>
        </p>
      </div>
    </header>
  );
};

export default Header;
