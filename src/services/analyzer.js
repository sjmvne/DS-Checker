import { fullDatabase as staticDatabase, englishCatalog } from './ingredientDatabase.js';
import { normalizeIngredient } from '../utils/normalizeIngredient.js';

/**
 * Internal logic to find an item in a specific catalog
 */
const findInCatalog = (catalog, normalizedInput) => {
   // Iterate all category keys in the catalog
   const keys = [
     'fatty_acids', 
     'lipids_and_oils', 
     'polysorbates_expanded', 
     'galactomyces_ferments_expanded',
     'high_sensitivity_ingredients_expanded',
     'esters_comprehensive',
     'safe_alternatives_comprehensive'
   ];

   for (const catKey of keys) {
      if (!catalog[catKey]) continue;
      
      const items = catalog[catKey].ingredients || [];
      const safeSection = catalog['safe_alternatives_comprehensive']; // for metadata linking if needed
      
      for (const item of items) {
         // Normalize DB fields
         const separators = /[\/(),]+/;
         const nameParts = item.name ? item.name.split(separators) : [];
         const inciParts = item.inci ? item.inci.split(separators) : [];
         const allAliases = [...nameParts, ...inciParts];

         // Check normalized exact fields first
         const normName = normalizeIngredient(item.name);
         const normInci = normalizeIngredient(item.inci);
         
         if (normalizedInput.includes(normName) || (normInci && normalizedInput.includes(normInci))) {
             return { item, catKey, categoryDesc: catalog[catKey].category_description };
         }

         // Check parts
         for (const part of allAliases) {
            const normPart = normalizeIngredient(part);
            if (!normPart || normPart.length < 2) continue;
            
            if (normalizedInput.includes(normPart) || normPart.includes(normalizedInput)) {
               if (normPart.length < 4 || normalizedInput.length < 4) {
                 if (normalizedInput === normPart) return { item, catKey, categoryDesc: catalog[catKey].category_description };
               } else {
                 return { item, catKey, categoryDesc: catalog[catKey].category_description };
               }
            }
         }
      }
   }
   return null; 
};

/**
 * Analyzes a single ingredient against the expanded database.
 * @param {string} ingredient 
 * @param {object} [database] - Optional dynamic database (for i18n)
 */
export const analyzeIngredient = (ingredient, database = staticDatabase) => {
  const normalizedInput = normalizeIngredient(ingredient);
  
  if (!normalizedInput || normalizedInput.length < 2) {
    return { status: 'unknown', reason: '', name: ingredient };
  }

  const catalog = database.catalog;

  // 1. Try finding in the CURRENT database (e.g., Italian)
  let match = findInCatalog(catalog, normalizedInput);

  // 2. If not found, try finding in the ENGLISH catalog (Fallback for detection)
  if (!match && englishCatalog && catalog !== englishCatalog) {
     const enMatch = findInCatalog(englishCatalog, normalizedInput);
     
     if (enMatch) {
       // Found in English! 
       // Case A: Input was "Coconut Oil" (EN Name)
       // Matched EN Item: { name: "Coconut Oil", inci: "Cocos Nucifera Oil" }
       
       // Try to find the equivalent item in IT catalog using the INCI from the EN match
       const commonInci = enMatch.item.inci;
       if (commonInci) {
         const normalizedInci = normalizeIngredient(commonInci);
         // Search IT catalog using the INCI found in EN catalog
         match = findInCatalog(catalog, normalizedInci);
       }
       
       // If still no match in IT catalog (rare), return the English item directly
       if (!match) {
         match = enMatch;
       }
     }
  }

  if (match) {
    const { item, catKey } = match;
    const catDesc = catalog[catKey]?.category_description || match.categoryDesc;

    // Detect Category Name for display
    let detectedCategoryName = catKey.replace(/_/g, ' '); 
    if (catKey === 'fatty_acids') detectedCategoryName = 'Fatty Acids';
    else if (catKey === 'lipids_and_oils') detectedCategoryName = 'Lipids & Oils';
    else if (catKey === 'esters_comprehensive') detectedCategoryName = 'Esters';
    else if (catKey === 'polysorbates_expanded') detectedCategoryName = 'Polysorbates';
    else if (catKey === 'safe_alternatives_comprehensive') detectedCategoryName = 'Safe Alternative';

    let finalStatus = 'unknown';
    
    // Determine status
    if (item.risk_level) {
      finalStatus = getStatusFromRisk(item.risk_level);
    } else {
       // Fallback status based on category if item lacks risk_level
       if (catKey.includes('safe')) finalStatus = 'safe';
       else if (catKey.includes('danger') || catKey.includes('fatty') || catKey.includes('lipid')) finalStatus = 'danger';
       else finalStatus = 'warning';
    }

    // Force Safe override if in safe section
    if (catKey === 'safe_alternatives_comprehensive') {
        finalStatus = 'safe';
        // Ensure reason is positive
        if (!item.reason) item.reason = item.benefits || 'Safe ingredient';
    }

    return {
      ...item, 
      status: finalStatus,
      reason: item.mechanism || item.reason || `${detectedCategoryName} problematico`,
      name: item.name,
      category: detectedCategoryName,
      categoryKey: catKey, // For translation
      link: generateSeziaLink(item.name),
      // Explicitly attach category metadata
      category_description: catDesc,
      recommendation: catalog[catKey]?.recommendation,
      mechanism_explanation: catalog[catKey]?.mechanism_explanation,
      hydrolysis_rate: catalog[catKey]?.hydrolysis_rate,
      research_basis: catalog[catKey]?.research_basis
    };
  }

  // Fallback Safe List (for items not yet in JSON but known safe)
  const legacySafeList = ['water', 'aqua', 'glycerin', 'niacinamide', 'squalane', 'caprylic/capric triglyceride', 'mct oil', 'zinc pyrithione', 'ketoconazole', 'salicylic acid', 'panthenol', 'ceramide'];
  for (const safe of legacySafeList) {
     if (normalizedInput.includes(safe)) {
        return { status: 'safe', reason: 'Safe ingredient', name: ingredient, category: 'Beneficial', categoryKey: 'beneficial' };
     }
  }

  return { status: 'unknown', reason: 'Not in database', name: ingredient, categoryKey: 'unknown' };
};

const getStatusFromRisk = (riskLevel) => {
  if (!riskLevel) return 'unknown';
  const r = riskLevel.toUpperCase();
  
  // Danger/High Risk
  if (r.includes('CRITICAL') || r.includes('CRITICO') || 
      r.includes('HIGH') || r.includes('ALTO') || 
      r.includes('EXTREME') || r.includes('ESTREMAMENTE')) {
    return 'danger';
  }
  
  // Warning/Moderate Risk
  if (r.includes('WARNING') || r.includes('ATTENZIONE') || 
      r.includes('MODERATE') || r.includes('MODERATO') || 
      r.includes('MEDIUM') || r.includes('MEDIO') ||
      r.includes('CAUTION') || r.includes('CAUTELA')) {
    return 'warning';
  }
  
  // Safe/Low Risk
  if (r.includes('SAFE') || r.includes('SICURO') || 
      r.includes('LOW') || r.includes('BASSO')) {
    return 'safe';
  }
  
  return 'unknown';
};

const generateSeziaLink = (name) => {
  // Simple slugify
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `https://sezia.co/ingredients/${slug}`; // Best guess linking
};

export const analyzeProduct = (ingredientsInput, database = staticDatabase) => {
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
      .filter(i => i.length > 0 && i.length < 100); 
  }

  const result = {
    safe: [],
    caution: [], 
    warning: [], 
    danger: [],  
    unknown: [],
    total: ingredients.length
  };

  const seenIngredients = new Set();

  ingredients.forEach(ing => {
    // PASS THE DYNAMIC DATABASE DOWN
    const analysis = analyzeIngredient(ing, database);
    
    // Deduplication logic: check if the CANONICAL name has already been pushed
    // If it's unknown, allow it (as user string might differ). If matched, use normalized name.
    const uniqueKey = analysis.status !== 'unknown' ? analysis.name.toLowerCase() : ing.toLowerCase();

    if (seenIngredients.has(uniqueKey)) {
        return; // Skip duplicate
    }
    seenIngredients.add(uniqueKey);

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
