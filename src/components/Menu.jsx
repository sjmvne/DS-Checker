import React, { useState } from 'react';
import './Menu.css';
import Emoji from './Emoji';

const Menu = ({ onNavigate, currentTheme, onThemeToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContributeDialog, setShowContributeDialog] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNav = (page) => {
    onNavigate(page);
    setIsOpen(false);
  };

  // ... (existing toggleMenu and handleNav)

  const handleBugReport = () => {
    window.location.href = "mailto:simonepepemail@gmail.com?subject=Segnalazione Bug DS Checker";
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
            <span className="icon"><Emoji name="Camera with Flash" fallback="📸" /></span> 
            <span className="label">Scanner</span>
          </button>
          <button onClick={() => handleNav('database')}>
            <span className="icon"><Emoji name="File Cabinet" fallback="🗄️" /></span>
            <span className="label">Database Completo</span>
          </button>
          <button onClick={() => handleNav('science')}>
            <span className="icon"><Emoji name="DNA" fallback="🧬" /></span>
            <span className="label">Guida Scientifica</span>
          </button>
          <button onClick={() => handleNav('protocols')}>
             <span className="icon"><Emoji name="Hammer and Wrench" fallback="🛠️" /></span>
             <span className="label">Protocolli Pratici</span>
          </button>
          <button onClick={() => handleNav('references')}>
             <span className="icon"><Emoji name="Books" fallback="📚" /></span>
             <span className="label">Fonti Scientifiche</span>
          </button>
          <button onClick={() => handleNav('dictionary')}>
             <span className="icon"><Emoji name="Open Book" fallback="📖" /></span>
             <span className="label">Dizionario DS</span>
          </button>
          <button onClick={() => handleNav('credits')}>
             <span className="icon"><Emoji name="Purple Heart" fallback="💜" /></span>
             <span className="label">Crediti</span>
          </button>
          
          <div className="menu-divider"></div>
          
          <button onClick={handleBugReport} className="action-btn">
             <span className="icon"><Emoji name="Ant" fallback="🐛" /></span>
             <span className="label">Segnala un Bug</span>
          </button>
          <button onClick={() => setShowContributeDialog(true)} className="action-btn">
             <span className="icon"><Emoji name="Handshake" fallback="🤝" /></span>
             <span className="label">Contribuisci</span>
          </button>
        </nav>
        
        {/* Contribute Dialog Overlay */}
        {showContributeDialog && (
          <div className="dialog-overlay fade-in" onClick={() => setShowContributeDialog(false)}>
            <div className="dialog-box glass" onClick={e => e.stopPropagation()}>
               <h3><Emoji name="Handshake" fallback="🤝" /> Contribuisci</h3>
               <p>Vuoi aiutare a migliorare DS Checker?</p>
               <div className="dialog-actions">
                  <a href="mailto:simonepepemail@gmail.com?subject=Collaborazione DS Checker" className="dialog-btn email">
                    <Emoji name="Envelope" fallback="✉️" /> Scrivimi una Email
                  </a>
                  <a href="https://github.com/simonepepe/ds-checker" target="_blank" rel="noopener noreferrer" className="dialog-btn github">
                    <Emoji name="Laptop" fallback="💻" /> Vai alla Repository
                  </a>
               </div>
               <button className="close-dialog" onClick={() => setShowContributeDialog(false)}>Chiudi</button>
            </div>
          </div>
        )}
        
        <div className="menu-footer">
          <button className="theme-toggle-btn" onClick={onThemeToggle}>
             {currentTheme === 'light' ? <><Emoji name="First Quarter Moon Face" fallback="🌙" /> Modalità Dark</> : <><Emoji name="Sun" fallback="☀️" /> Modalità Light</>}
          </button>
          
          <div className="creator-badge glass">
             <span className="creator-icon"><Emoji name="Artist Light Skin Tone" fallback="🧑🏻‍🎨" /></span>
             <div className="creator-info">
               <span className="made-by">Creato con passione da</span>
               <span className="creator-name">Simone Pepe</span>
             </div>
          </div>
          
          <p className="version">DS Checker v1.1.2</p>
        </div>
      </div>
    </>
  );
};

export default Menu;
