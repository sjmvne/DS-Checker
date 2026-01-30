import { useState, useCallback } from 'react';
import { analyzeProduct } from '../services/analyzer';
import { useData } from '../hooks/useData';

export const useAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const db = useData();

  const analyzeIngredients = useCallback((ingredientsText) => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const result = analyzeProduct(ingredientsText, db);
      setIsAnalyzing(false);
      return result;
    } catch (err) {
      setError(err);
      setIsAnalyzing(false);
      return null;
    }
  }, [db]);

  return { analyzeIngredients, isAnalyzing, error };
};
