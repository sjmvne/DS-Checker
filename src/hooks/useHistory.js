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

  return { history, addToHistory, clearHistory };
};
