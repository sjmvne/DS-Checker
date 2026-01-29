import { useState, useCallback } from 'react';
import { analyzeProduct } from '../services/analyzer';

export const useAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const analyzeIngredients = useCallback((ingredientsText) => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const result = analyzeProduct(ingredientsText);
      setIsAnalyzing(false);
      return result;
    } catch (err) {
      setError(err);
      setIsAnalyzing(false);
      return null;
    }
  }, []);

  return { analyzeIngredients, isAnalyzing, error };
};
