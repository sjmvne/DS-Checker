/**
 * Normalizes an ingredient string for comparison.
 * Removes non-alphanumeric characters (except hyphens), trims whitespace, and converts to lowercase.
 * 
 * @param {string} ingredient - The ingredient to normalize.
 * @return {string} - The normalized ingredient string.
 */
export const normalizeIngredient = (ingredient) => {
  if (!ingredient) return '';
  return ingredient
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, ''); // Keep hyphens as they can be significant (e.g., polyglyceryl-3)
};
