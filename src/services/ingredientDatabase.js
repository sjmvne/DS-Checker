/**
 * DS Checker - Ingredient Database Service
 * Aggregates data from JSON files.
 */

// Import raw JSON data (Default: IT)
// Import raw JSON data (Default: IT)
import catalog from '../data/it/01-ingredient-catalog.json';
import mechanisms from '../data/it/02-mechanism-analysis.json';
import protocols from '../data/it/03-practical-protocols.json';
import references from '../data/it/04-references.json';
import safeAlternatives from '../data/it/04-safe-alternatives.json'; // Keep for modal logic
import harmfulIndex from '../data/it/05-harmful-database.json'; // Keep for fast lookup
import synergyMatrix from '../data/it/06-synergy-matrix.json'; // Keep for logic
import severityContext from '../data/it/07-severity-context.json'; // Keep for context

// English imports for dynamic loading
import catalog_en from '../data/en/01-ingredient-catalog.json';
import mechanisms_en from '../data/en/02-mechanism-analysis.json';
import protocols_en from '../data/en/03-practical-protocols.json';
import references_en from '../data/en/04-references.json';

// Helper to extract simple string lists for legacy compatibility or quick iteration
const extractItems = (categoryKey) => {
  const category = catalog[categoryKey];
  if (!category || !category.ingredients) return [];
  return category.ingredients.map(item => item.name); // Returns names
};

// Export raw data for analyzer (Default IT)
export const fullDatabase = {
  catalog,
  mechanisms,
  protocols,
  references,
  safeAlternatives,
  harmfulIndex,
  synergyMatrix,
  severityContext
};

export const englishCatalog = catalog_en;

/**
 * Returns database content based on language.
 * Currently supports 'en' for ScienceGuide, Protocols and References content.
 * Fallbacks to 'it' for others.
 */
export const getDatabase = (lang = 'it') => {
  if (lang === 'en') {
    return {
      ...fullDatabase,
      catalog: catalog_en,
      mechanisms: mechanisms_en,
      protocols: protocols_en,
      references: references_en
    };
  }
  return fullDatabase;
};

// Legacy-style exports (mapped to new data) used by existing logic if needed
export const ingredientDatabase = {
  dangerousFattyAcids: extractItems('fatty_acids'),
  dangerousLipids: extractItems('lipids_and_oils'),
  dangerousEsters: extractItems('esters_comprehensive'),
  highSensitivity: extractItems('galactomyces_ferments_expanded'),
  preservatives: extractItems('preservatives_problematic'),
  surfactants: extractItems('high_sensitivity_ingredients_expanded'),
  silicones: extractItems('silicones_film_formers'),
  botanicals: [],
  beneficial: ['water', 'niacinamide', 'glycerin', 'squalane', 'caprylic/capric triglyceride', 'ketoconazole', 'zinc pyrithione', 'salicylic acid']
};
