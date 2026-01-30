import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Emoji from './Emoji';
import './Menu.css';

const Menu = ({ onNavigate, currentTheme, onThemeToggle }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showContributeDialog, setShowContributeDialog] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNav = (page) => {
    onNavigate(page);
    setIsOpen(false);
  };

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
           <h3>{t('menu.navigation')}</h3>
        </div>
        
        <nav className="menu-nav">
          <button onClick={() => handleNav('home')}>
            <span className="icon"><Emoji name="Camera with Flash" fallback="📸" /></span> 
            <span className="label">{t('menu.home')}</span>
          </button>
          <button onClick={() => handleNav('database')}>
            <span className="icon"><Emoji name="File Cabinet" fallback="🗄️" /></span>
            <span className="label">{t('menu.database')}</span>
          </button>
          <button onClick={() => handleNav('education')}>
            <span className="icon"><Emoji name="Brain" fallback="🧠" /></span>
            <span className="label">SD Intelligence</span>
          </button>
          <button onClick={() => handleNav('science')}>
            <span className="icon"><Emoji name="DNA" fallback="🧬" /></span>
            <span className="label">{t('menu.science_guide')}</span>
          </button>
          <button onClick={() => handleNav('protocols')}>
             <span className="icon"><Emoji name="Hammer and Wrench" fallback="🛠️" /></span>
             <span className="label">{t('menu.protocols')}</span>
          </button>
          <button onClick={() => handleNav('references')}>
             <span className="icon"><Emoji name="Books" fallback="📚" /></span>
             <span className="label">{t('menu.references')}</span>
          </button>
          <button onClick={() => handleNav('dictionary')}>
             <span className="icon"><Emoji name="Open Book" fallback="📖" /></span>
             <span className="label">{t('menu.dictionary')}</span>
          </button>
          <button onClick={() => handleNav('credits')}>
             <span className="icon"><Emoji name="Purple Heart" fallback="💜" /></span>
             <span className="label">{t('menu.credits')}</span>
          </button>
          
          <div className="menu-divider"></div>
          
          <button onClick={handleBugReport} className="action-btn">
             <span className="icon"><Emoji name="Ant" fallback="🐛" /></span>
             <span className="label">{t('menu.bug_report')}</span>
          </button>
          <button onClick={() => setShowContributeDialog(true)} className="action-btn">
             <span className="icon"><Emoji name="Handshake" fallback="🤝" /></span>
             <span className="label">{t('menu.contribute')}</span>
          </button>
        </nav>
        
        {/* Contribute Dialog Overlay */}
        {showContributeDialog && (
          <div className="dialog-overlay fade-in" onClick={() => setShowContributeDialog(false)}>
            <div className="dialog-box glass" onClick={e => e.stopPropagation()}>
               <h3><Emoji name="Handshake" fallback="🤝" /> {t('menu.contribute_dialog.title')}</h3>
               <p>{t('menu.contribute_dialog.text')}</p>
               <div className="dialog-actions">
                  <a href="mailto:simonepepemail@gmail.com?subject=Collaborazione DS Checker" className="dialog-btn email">
                    <Emoji name="Envelope" fallback="✉️" /> {t('menu.contribute_dialog.email')}
                  </a>
                  <a href="https://github.com/simonepepe/ds-checker" target="_blank" rel="noopener noreferrer" className="dialog-btn github">
                    <Emoji name="Laptop" fallback="💻" /> {t('menu.contribute_dialog.github')}
                  </a>
               </div>
               <button className="close-dialog" onClick={() => setShowContributeDialog(false)}>{t('menu.contribute_dialog.close')}</button>
            </div>
          </div>
        )}
        
        <div className="menu-footer">
          <button className="theme-toggle-btn" onClick={onThemeToggle}>
             {currentTheme === 'light' ? <><Emoji name="First Quarter Moon Face" fallback="🌙" /> {t('menu.theme.dark')}</> : <><Emoji name="Sun" fallback="☀️" /> {t('menu.theme.light')}</>}
          </button>
          
          <div className="creator-badge glass">
             <span className="creator-icon"><Emoji name="Artist Light Skin Tone" fallback="🧑🏻‍🎨" /></span>
             <div className="creator-info">
               <span className="made-by">{t('menu.footer.made_by')}</span>
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
