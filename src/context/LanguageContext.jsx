import React, { createContext, useState, useContext, useEffect } from 'react';
import itTranslations from '../locales/it.json';
import enTranslations from '../locales/en.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('seziaLanguage') || 'it';
  });

  useEffect(() => {
    localStorage.setItem('seziaLanguage', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'it' ? 'en' : 'it'));
  };

  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = language === 'it' ? itTranslations : enTranslations;
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key; // Fallback to key if not found
      }
    }

    // Handle string interpolation
    if (typeof value === 'string' && Object.keys(params).length > 0) {
      return value.replace(/{(\w+)}/g, (_, key) => {
        return params[key] !== undefined ? params[key] : `{${key}}`;
      });
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
