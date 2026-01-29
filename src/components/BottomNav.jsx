import React from 'react';
import './BottomNav.css';
import Emoji from './Emoji';

const BottomNav = ({ activePage, onNavigate }) => {
  const navItems = [
    { id: 'home', icon: '🏠', label: 'Scanner' },
    { id: 'database', icon: '🗄️', label: 'Database' },
    { id: 'protocols', icon: '🛠️', label: 'Guide' },
    { id: 'science', icon: '🧬', label: 'Scienza' }
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
