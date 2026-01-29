import React from 'react';
import Emoji from './Emoji';
import './ThemeToggle.css';

const ThemeToggle = ({ onToggle, currentTheme }) => {
  return (
    <button 
      className="theme-toggle glass glass-hover" 
      onClick={onToggle}
      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      {currentTheme === 'light' ? <Emoji name="First Quarter Moon Face" fallback="🌙" size="1.4em" /> : <Emoji name="Sun" fallback="☀️" size="1.4em" />}
    </button>
  );
};

export default ThemeToggle;
