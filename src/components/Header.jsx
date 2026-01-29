import React from 'react';
import './Header.css';

/**
 * Header Component
 * Purpose: Display company logo, app title, and dynamic tagline with Glassmorphism influence.
 */
const Header = () => {
  return (
    <header className="header glass">
      <div className="header-content">
        <div className="logo-container">
          <span className="logo-icon">🧴</span>
          <h1 className="title">
            Sezia<span className="accent">Scanner</span> Pro
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
