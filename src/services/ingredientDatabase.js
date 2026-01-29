/**
 * DS Checker - Ingredient Database Service
 * Aggregates data from JSON files.
 */

// Import raw JSON data
import catalog from '../data/01-ingredient-catalog.json';
import mechanisms from '../data/02-mechanism-analysis.json';
import protocols from '../data/03-practical-protocols.json';
import safeAlternatives from '../data/04-safe-alternatives.json'; // Keep for modal logic
import harmfulIndex from '../data/05-harmful-database.json'; // Keep for fast lookup
import synergyMatrix from '../data/06-synergy-matrix.json'; // Keep for logic
import severityContext from '../data/07-severity-context.json'; // Keep for context

// Helper to extract simple string lists for legacy compatibility or quick iteration
const extractItems = (categoryKey) => {
  const category = catalog[categoryKey];
  // FIX: New JSON uses 'ingredients', not 'items'
  if (!category || !category.ingredients) return [];
  return category.ingredients.map(item => item.name); // Returns names
};

// Export raw data for analyzer
export const fullDatabase = {
  catalog,
  mechanisms,
  protocols,
  safeAlternatives,
  harmfulIndex,
  synergyMatrix,
  severityContext
};

// Legacy-style exports (mapped to new data) used by existing logic if needed
// We will mainly use the fullDatabase in the new analyzer
export const ingredientDatabase = {
  dangerousFattyAcids: extractItems('fatty_acids'),
  dangerousLipids: extractItems('lipids_and_oils'), // Updated key
  dangerousEsters: extractItems('esters_comprehensive'), // Updated key
  highSensitivity: extractItems('galactomyces_ferments_expanded'), // Updated key (ferments)
  preservatives: extractItems('preservatives_problematic'), // (check if this exists in new json, otherwise might be empty)
  surfactants: extractItems('high_sensitivity_ingredients_expanded'), // Using high sensitivity as catch-all for now or specific
  silicones: extractItems('silicones_film_formers'), // check key
  botanicals: [], // Not present in Part 1 extensively yet
  beneficial: ['water', 'niacinamide', 'glycerin', 'squalane', 'caprylic/capric triglyceride', 'ketoconazole', 'zinc pyrithione', 'salicylic acid'] // beneficial list from old db or new logic
};
