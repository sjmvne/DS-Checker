import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Emoji from './Emoji';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      className="language-selector glass" 
      onClick={toggleLanguage}
      aria-label="Switch Language"
      title={language === 'it' ? "Switch to English" : "Passa all'Italiano"}
    >
      {language === 'it' ? (
        <>
          <Emoji name="Flag: Italy" fallback="🇮🇹" /> 
          <span className="lang-desktop">Italiano</span>
          <span className="lang-mobile"> - Italia</span>
        </>
      ) : (
        <>
          <Emoji name="Flag: United States" fallback="🇺🇸" /> 
          <span className="lang-desktop">English</span>
          <span className="lang-mobile"> - English</span>
        </>
      )}
    </button>
  );
};

export default LanguageSelector;
