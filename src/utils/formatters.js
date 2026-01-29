/**
 * Formats a date object to Italian locale string (DD/MM/YYYY).
 */
export const formatDate = (dateStringOrObject) => {
  if (!dateStringOrObject) return '';
  const date = new Date(dateStringOrObject);
  return date.toLocaleDateString('it-IT');
};

/**
 * Captializes the first letter of each word.
 */
export const titleCase = (str) => {
  if (!str) return '';
  return str.toLowerCase().split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
};
