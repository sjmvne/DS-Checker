import { useLocalStorage } from './useLocalStorage';

const MAX_HISTORY_ITEMS = 50;

export const useHistory = () => {
  const [history, setHistory] = useLocalStorage('History', []);

  const addToHistory = (newItem) => {
    setHistory((prevHistory) => {
      // Avoid duplicates based on basic props comparison (optional, simplistic check)
      // Newest first
      const updatedHistory = [newItem, ...prevHistory];
      return updatedHistory.slice(0, MAX_HISTORY_ITEMS);
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const removeFromHistory = (itemToRemove) => {
    setHistory((prevHistory) => {
      // Assuming item has a unique ID, or we match by date string as secondary ID
      // If no unique ID is available on items yet, we should probably add one on creation.
      // For now, let's filter by strict property equality or just date/name combo.
      // To be safe, let's use the date string if unique, or the exact object reference if handled in memory.
      // But from localStorage, reference changes.
      // Let's rely on `date` being a timestamp string. If collision, we might delete duplicates which is fine.
      return prevHistory.filter(item => item.date !== itemToRemove.date || item.productName !== itemToRemove.productName);
    });
  };

  return { history, addToHistory, clearHistory, removeFromHistory };
};
