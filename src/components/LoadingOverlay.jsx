import React from 'react';
import './LoadingOverlay.css';
import Emoji from './Emoji';

const LoadingOverlay = ({ isVisible, icon, text = "Analisi in corso..." }) => {
  if (!isVisible) return null;

  return (
    <div className="loading-overlay fade-in">
      <div className="spinner-container">
        <div className="spinner"></div>
        {icon && <div className="spinner-icon">{icon}</div>}
      </div>
      <p>{text}</p>
    </div>
  );
};

export default LoadingOverlay;
