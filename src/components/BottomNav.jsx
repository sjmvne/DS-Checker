import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './BottomNav.css';
import Emoji from './Emoji';

const BottomNav = ({ activePage, onNavigate }) => {
  const { t } = useLanguage();
  
  const navItems = [
    { id: 'home', icon: '🏠', label: t('bottom_nav.scanner') },
    { id: 'database', icon: '🗄️', label: t('bottom_nav.database') },
    { id: 'protocols', icon: '🛠️', label: t('bottom_nav.guide') },
    { id: 'science', icon: '🧬', label: t('bottom_nav.science') }
  ];

  return (
    <div className="bottom-nav glass">
      {navItems.map(item => (
        <button 
          key={item.id}
          className={`nav-item ${activePage === item.id ? 'active' : ''}`}
          onClick={() => {
            // Haptic feedback if available
            if (navigator.vibrate) navigator.vibrate(10);
            onNavigate(item.id);
          }}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
