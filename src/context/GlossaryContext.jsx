import React, { createContext, useContext, useState, useCallback } from 'react';
import { useGlossary } from '../hooks/useGlossary';

const GlossaryContext = createContext();

export const useGlossaryContext = () => {
  const context = useContext(GlossaryContext);
  if (!context) {
    throw new Error('useGlossaryContext must be used within a GlossaryProvider');
  }
  return context;
};

export const GlossaryProvider = ({ children }) => {
  const [selectedTerm, setSelectedTerm] = useState(null);
  // We can expose the glossary data/regex here if needed, or keeping it inside SmartText is fine.
  // Actually, for performance, passing the checkTerm function or regex from here might be better,
  // but SmartText uses it for rendering. Let's keep SmartText self-contained for parsing, 
  // but use context for the Action (opening the modal).

  const openTerm = useCallback((termData) => {
    setSelectedTerm(termData);
  }, []);

  const closeTerm = useCallback(() => {
    setSelectedTerm(null);
  }, []);

  return (
    <GlossaryContext.Provider value={{ selectedTerm, openTerm, closeTerm }}>
      {children}
    </GlossaryContext.Provider>
  );
};
