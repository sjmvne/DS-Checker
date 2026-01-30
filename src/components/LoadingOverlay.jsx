import React from 'react';
import ReactDOM from 'react-dom';
import { useLanguage } from '../context/LanguageContext';
import './LoadingOverlay.css';

const LoadingOverlay = ({ isVisible, icon, text }) => {
  const { t } = useLanguage();
  const displayText = text || t('loading_overlay.analyzing');

  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div className="loading-overlay fade-in">
      <div className="spinner-container">
        <div className="spinner"></div>
        {icon && <div className="spinner-icon">{icon}</div>}
      </div>
      <p>{displayText}</p>
    </div>,
    document.body
  );
};

export default LoadingOverlay;