import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import dictionaryEn from '../data/dictionary.json';
import dictionaryIt from '../data/it/dictionary_it.json';

export const useGlossary = () => {
  const { language } = useLanguage();
  const [dictionary, setDictionary] = useState([]);

  useEffect(() => {
    // Select the correct dictionary based on language
    const currentDict = language === 'it' ? dictionaryIt : dictionaryEn;
    // Flatten the categories to get a single list of terms if needed, 
    // but the current structure seems to have a 'terms' array (checking structure...)
    // Wait, the structure in the file 'dictionary.json' is:
    // { "terms": [ { "term": "...", "definition": "..." }, ... ] }
    
    if (currentDict && currentDict.terms) {
        setDictionary(currentDict.terms);
    } else {
        setDictionary([]);
    }
  }, [language]);

  // Create a Map for O(1) lookup
  const termMap = useMemo(() => {
    return new Map(dictionary.map(item => [item.term.toLowerCase(), item]));
  }, [dictionary]);

  // Create a sorted list of terms for regex (longest first to match specific phrases before general words)
  // e.g. "Fatty Acid" before "Acid"
  const sortedTerms = useMemo(() => {
    return dictionary
      .map(item => item.term)
      .sort((a, b) => b.length - a.length);
  }, [dictionary]);

  return { dictionary, termMap, sortedTerms };
};
