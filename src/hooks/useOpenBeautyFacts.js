import { useState, useCallback } from 'react';
import { fetchProductByBarcode } from '../services/openBeautyFacts';

export const useOpenBeautyFacts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchProduct = useCallback(async (barcode) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProductByBarcode(barcode);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  }, []);

  return { searchProduct, loading, error };
};
