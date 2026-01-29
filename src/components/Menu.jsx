import React, { useState } from 'react';
import './Menu.css';

const Menu = ({ onNavigate, currentTheme, onThemeToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNav = (page) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <>
      <button 
        className={`menu-btn glass ${isOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <div className={`menu-overlay glass ${isOpen ? 'visible' : ''}`}>
        <div className="menu-header">
           <h3>Navigazione</h3>
        </div>
        
        <nav className="menu-nav">
          <button onClick={() => handleNav('home')}>
            <span className="icon">🏠</span> 
            <span className="label">Scanner Home</span>
          </button>
          <button onClick={() => handleNav('database')}>
            <span className="icon">🗄️</span>
            <span className="label">Database Completo</span>
          </button>
          <button onClick={() => handleNav('science')}>
            <span className="icon">🧬</span>
            <span className="label">Guida Scientifica</span>
          </button>
          <button onClick={() => handleNav('protocols')}>
             <span className="icon">🛠️</span>
             <span className="label">Protocolli Pratici</span>
          </button>
          <button onClick={() => handleNav('references')}>
             <span className="icon">📚</span>
             <span className="label">Fonti Scientifiche</span>
          </button>
          <button onClick={() => handleNav('dictionary')}>
             <span className="icon">📖</span>
             <span className="label">Dizionario DS</span>
          </button>
          <button onClick={() => handleNav('credits')}>
             <span className="icon">❤️</span>
             <span className="label">Crediti</span>
          </button>
        </nav>
        
        <div className="menu-footer">
          <button className="theme-toggle-btn" onClick={onThemeToggle}>
             {currentTheme === 'light' ? '🌙 Modalità Scura' : '☀️ Modalità Chiara'}
          </button>
          <p className="version">DS Checker v1.1</p>
        </div>
      </div>
    </>
  );
};

export default Menu;
