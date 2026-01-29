import React from 'react';
import './LoadingOverlay.css';
import Emoji from './Emoji';

const LoadingOverlay = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <p>Analisi in corso...</p>
    </div>
  );
};

export default LoadingOverlay;
