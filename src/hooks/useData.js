import { useLanguage } from '../context/LanguageContext';
import { getDatabase } from '../services/ingredientDatabase';
import { useMemo } from 'react';

/**
 * Hook to get the current database based on selected language.
 * Wraps the raw getDatabase() service with React context reactivity.
 */
export const useData = () => {
  const { language } = useLanguage();
  
  const database = useMemo(() => {
    // console.log('[useData] Loading database for language:', language);
    return getDatabase(language);
  }, [language]);

  return database;
};
