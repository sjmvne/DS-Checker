import React from 'react';
import Emoji from './Emoji';
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
          <span className="logo-icon">
            <Emoji name="Lotion Bottle" fallback="🧴" size="3rem" />
          </span>
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
