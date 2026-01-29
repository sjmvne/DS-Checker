import { fullDatabase } from './ingredientDatabase';
import { normalizeIngredient } from '../utils/normalizeIngredient';

/**
 * Analyzes a single ingredient against the expanded database.
 */
export const analyzeIngredient = (ingredient) => {
  const normalizedInput = normalizeIngredient(ingredient);
  
  if (!normalizedInput || normalizedInput.length < 2) {
    return { status: 'unknown', reason: '', name: ingredient };
  }

  // 1. BROAD CATEGORY LOOKUP via Catalog (01-ingredient-catalog.json)
  const catalog = fullDatabase.catalog;
  
  // Helper to check a category section
  const checkCategory = (catKey, defaultStatus, detectedCategoryName) => {
     if (!catalog[catKey]) return null;
     // FIX: New JSON uses 'ingredients' array
     const items = catalog[catKey].ingredients || [];
     
     for (const item of items) {
       const normalizedItemName = normalizeIngredient(item.name);
       const normalizedInci = normalizeIngredient(item.inci);
       
       if (normalizedInput.includes(normalizedItemName) || (normalizedInci && normalizedInput.includes(normalizedInci))) {
         // Determine status dynamically from item risk_level if present
         let finalStatus = defaultStatus;
         if (item.risk_level) {
            finalStatus = getStatusFromRisk(item.risk_level);
         }

         return {
           ...item, // SPREAD ALL PROPERTIES (Fixes missing tech specs)
           status: finalStatus,
           reason: item.mechanism || item.reason || `${detectedCategoryName} problematico`,
           name: item.name,
           category: detectedCategoryName,
           link: generateSeziaLink(item.name),
           // Explicitly attach category metadata
           category_description: catalog[catKey]?.category_description,
           recommendation: catalog[catKey]?.recommendation,
           mechanism_explanation: catalog[catKey]?.mechanism_explanation,
           hydrolysis_rate: catalog[catKey]?.hydrolysis_rate,
           research_basis: catalog[catKey]?.research_basis
         };
       }
     }
     return null;
  };

  // Check Categories in priority order
  
  // CRITICAL / DANGER
  const fatty = checkCategory('fatty_acids', 'danger', 'Fatty Acids');
  if (fatty) return fatty;

  const lipid = checkCategory('lipids_and_oils', 'danger', 'Lipids & Oils');
  if (lipid) return lipid;

  const poly = checkCategory('polysorbates_expanded', 'danger', 'Polysorbates');
  if (poly) return poly;

  const ferm = checkCategory('galactomyces_ferments_expanded', 'danger', 'Ferments'); // Some are caution, but many are high risk
  if (ferm) return ferm;

  // HIGH / WARNING
  const sens = checkCategory('high_sensitivity_ingredients_expanded', 'warning', 'High Sensitivity / Irritants');
  if (sens) return sens;

  const est = checkCategory('esters_comprehensive', 'warning', 'Esters');
  if (est) return est;
  
  // SAFE ALTERNATIVES CHECK
  const safeSection = catalog['safe_alternatives_comprehensive'];
  if (safeSection) {
      const safeTypes = [
         'fatty_acids_safe', 'oils_safe', 'esters_safe', 'alcohols_safe', 
         'sugars_humectants_safe', 'cleansers_safe', 'humectants_safe', 
         'preservatives_safe', 'ph_buffers_safe'
       ];
      
      for (const subKey of safeTypes) {
          const items = safeSection[subKey] || [];
          for (const item of items) {
             const normalizedItemName = normalizeIngredient(item.name);
             const normalizedInci = normalizeIngredient(item.inci);
             
             if (normalizedInput.includes(normalizedItemName) || (normalizedInci && normalizedInput.includes(normalizedInci))) {
                 return {
                   ...item,
                   status: 'safe',
                   reason: item.benefits || 'Ingrediente sicuro',
                   name: item.name,
                   category: 'Safe Alternative',
                   category_description: safeSection.category_description
                 };
             }
          }
      }
  }

  // Fallback Safe List (for items not yet in JSON but known safe)
  const legacySafeList = ['water', 'aqua', 'glycerin', 'niacinamide', 'squalane', 'caprylic/capric triglyceride', 'mct oil', 'zinc pyrithione', 'ketoconazole', 'salicylic acid', 'panthenol', 'ceramide'];
  for (const safe of legacySafeList) {
     if (normalizedInput.includes(safe)) {
        return { status: 'safe', reason: 'Ingrediente sicuro', name: ingredient, category: 'Beneficial' };
     }
  }

  return { status: 'unknown', reason: 'Non presente nei database di rischio', name: ingredient };
};

const getStatusFromRisk = (riskLevel) => {
  if (riskLevel.includes('CRITICAL') || riskLevel.includes('HIGH')) return 'danger';
  if (riskLevel.includes('WARNING') || riskLevel.includes('MODERATE')) return 'warning';
  if (riskLevel.includes('CAUTION')) return 'caution';
  return 'unknown';
};

const generateSeziaLink = (name) => {
  // Simple slugify
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `https://sezia.co/ingredients/${slug}`; // Best guess linking
};

export const analyzeProduct = (ingredientsInput) => {
  let ingredients = [];
  
  if (Array.isArray(ingredientsInput)) {
    ingredients = ingredientsInput;
  } else if (typeof ingredientsInput === 'string') {
    // Clean up common prefixes
    let cleanText = ingredientsInput.replace(/^ingredients[:\s]*/i, '');
    
    // Robust splitting: commas, newlines, bullets, pipes, tabs
    ingredients = cleanText
      .split(/[,|\n\r•*;\t]/) 
      .map(i => i.trim())
      .filter(i => i.length > 0 && i.length < 100); // Filter empty or suspiciously long noise lines
  }

  const result = {
    safe: [],
    caution: [], 
    warning: [], 
    danger: [],  
    unknown: [],
    total: ingredients.length
  };

  ingredients.forEach(ing => {
    const analysis = analyzeIngredient(ing);
    if (result[analysis.status]) {
      result[analysis.status].push(analysis);
    } else {
      // Default fallback
      if(analysis.status === 'safe') result.safe.push(analysis);
      else result.unknown.push(analysis);
    }
  });

  return result;
};
