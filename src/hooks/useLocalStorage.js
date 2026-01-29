import { useState, useEffect } from 'react';

/**
 * Custom hook for persisting state to localStorage.
 * Automatically prefixes keys with 'sezia'.
 * 
 * @param {string} key - The storage key (will be prefixed).
 * @param {any} initialValue - Default value if nothing in storage.
 */
export const useLocalStorage = (key, initialValue) => {
  const prefixedKey = `sezia${key.charAt(0).toUpperCase() + key.slice(1)}`;

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(prefixedKey);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(prefixedKey, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
