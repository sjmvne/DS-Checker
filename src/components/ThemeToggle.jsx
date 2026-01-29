import React from 'react';
import './ThemeToggle.css';

const ThemeToggle = ({ onToggle, currentTheme }) => {
  return (
    <button 
      className="theme-toggle glass glass-hover" 
      onClick={onToggle}
      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      {currentTheme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;
