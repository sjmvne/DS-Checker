/**
 * 🧴 SEZIA SCANNER PRO - COMPLETE INGREDIENT DATABASE
 * Estratto da sezia.co - Fonte ufficiale per dermatite seborroica
 * 
 * Database hardcoded completo con:
 * - Acidi grassi C11-24 (problematici)
 * - Lipidi problematici (oli e burri)
 * - Esteri problematici
 * - Fermentati/Lieviti (alta sensibilità)
 * - Ingredienti benefici (safe)
 */

export const ingredientDatabase = {
  // ====== ACIDI GRASSI PERICOLOSI (C11-24) ======
  // Fonte: https://sezia.co/ingredients/fatty-acids
  dangerousFattyAcids: [
    // C11
    'undecylenic acid', 'undecylenicacid', 'undecanoic acid',
    // C12
    'lauric acid', 'lauricacid', 'dodecanoic acid',
    // C13
    'tridecylic acid', 'tridecylicacid', 'tridecanoic acid',
    // C14
    'myristic acid', 'myristicacid', 'tetradecanoic acid',
    // C15
    'pentadecylic acid', 'pentadecylicacid', 'pentadecanoic acid',
    // C16
    'palmitic acid', 'palmiticacid', 'hexadecanoic acid',
    'palmitoleic acid', 'palmitolleicacid', '9-hexadecenoic acid',
    // C17
    'margaric acid', 'margaricacid', 'heptadecanoic acid',
    // C18
    'stearic acid', 'stearicacid', 'octadecanoic acid',
    'vaccenic acid', 'vaccenicacid', '11-octadecenoic acid',
    'oleic acid', 'oleicacid', '9-octadecenoic acid',
    'elaidic acid', 'elaidicacid',
    'linoleic acid', 'linoleicacid', '9,12-octadecadienoic acid',
    'linolelaidic acid', 'linolelaidicacid',
    'alpha-linolenic acid', 'alphalinolenicacid', '9,12,15-octadecatrienoic acid',
    'gamma-linolenic acid', 'gammalinolenicacid', '6,9,12-octadecatrienoic acid',
    'stearidonic acid', 'stearindicacid', '6,9,12,15-octadecatetraenoic acid',
    // C19
    'nonadecylic acid', 'nonadecylicacid', 'nonadecanoic acid',
    // C20
    'arachidic acid', 'arachidicacid', 'eicosanoic acid',
    'gondoic acid', 'gondoicacid', '11-eicosenoic acid',
    'dihomo-y-linolenic acid', 'dihomolinolenicacid', '8,11,14-eicosatrienoic acid',
    'mead acid', 'meadacid', '5,8,11-eicosatrienoic acid',
    'arachidonic acid', 'arachidonicacid', '5,8,11,14-eicosatetraenoic acid',
    'eicosapentaenoic acid', 'eicosapentaenoicacid', '5,8,11,14,17-eicosapentaenoic acid',
    // C21
    'heneicosylic acid', 'heneicosylicacid', 'heneicosanoic acid',
    // C22
    'behenic acid', 'behenicacid', 'docosanoic acid',
    'erucic acid', 'erucicacid', '13-docosenoic acid',
    'docosatetraenoic acid', 'docosatetraenoicacid', '7,10,13,16-docosatetraenoic acid',
    'docosahexaenoic acid', 'docosahexaenoicacid', '4,7,10,13,16,19-docosahexaenoic acid',
    // C23
    'tricosylic acid', 'tricosylicacid', 'tricosanoic acid',
    // C24
    'lignoceric acid', 'lignoceracid', 'tetracosanoic acid',
    'nervonic acid', 'nervonicacid', '15-tetracosenoic acid',
  ],

  // ====== LIPIDI PERICOLOSI (Oli e Burri) ======
  // Fonte: https://sezia.co/ingredients/lipids
  // Sezia checks for over 200 complex lipids containing C11-24 acids
  dangerousLipids: [
    // A
    'acai', 'acai oil', 'euterpe oleracea',
    'sweet almond', 'sweet almond oil', 'prunus amygdalus dulcis',
    'andiroba', 'andiroba oil', 'carapa guaianensis',
    'apple', 'apple oil', 'pyrus malus',
    'apricot', 'apricot oil', 'prunus armeniaca',
    'argan', 'argan oil', 'argania spinosa',
    'avocado', 'avocado oil', 'avocado butter', 'persea americana',

    // B
    'baobab', 'baobab oil', 'baobab butter', 'adansonia digitata',
    'babassu', 'babassu oil', 'orbignya oleifera',
    'barbary fig', 'barbary fig oil', 'opuntia ficus-indica',
    'beefsteak', 'beefsteak oil', 'perilla ocymoides',
    'blackberry', 'blackberry oil', 'rubus fruticosus',
    'blueberry', 'blueberry oil', 'vaccinium myrtillus', 'european blueberry',
    'borage', 'borage oil', 'borago officinalis',
    'brazil nut', 'brazil nut oil', 'bertholletia excelsa',
    'broccoli', 'broccoli oil', 'brassica oleracea italica',
    'buriti', 'buriti oil', 'mauritia flexuosa',

    // C
    'cacay', 'cacay oil', 'caryodendron orinocense',
    'candelilla', 'candelilla wax', 'euphorbia cerifera',
    'carnauba', 'carnauba wax', 'copernicia prunifera',
    'carrot', 'carrot oil', 'daucus carota sativa',
    'castor', 'castor oil', 'castor wax', 'ricinus communis',
    'celery', 'celery oil', 'apium archangelica',
    'wild celery', 'wild celery oil', 'angelica archangelica',
    'bitter cherry', 'cherry oil', 'prunus cerasus',
    'sweet cherry', 'sweet cherry oil', 'prunus avium',
    'chia', 'chia oil', 'salvia hispanica',
    'chinaberry', 'chinaberry oil', 'melia azadirachta',
    'cloudberry', 'cloudberry oil', 'rubus chamaemorus',
    'cocoa', 'cocoa oil', 'cocoa butter', 'theobroma cacao',
    'coconut', 'coconut oil', 'coconut butter', 'coconut wax', 'coconut milk', 'cocos nucifera',
    'coffee', 'coffee oil', 'coffee butter', 'coffee wax', 'coffea arabica',
    'cotton', 'cotton oil', 'gossypium herbaceum',
    'corn', 'corn oil', 'zea mays',
    'crambe', 'crambe oil', 'crambe abyssinica',
    'cranberry', 'cranberry oil', 'vaccinium macrocarpon',
    'cucumber', 'cucumber oil', 'cucumis sativus',
    'cumin', 'cumin oil', 'cuminum cyminum',
    'black cumin', 'black cumin oil', 'nigella sativa',
    'cupuacu', 'cupuacu butter', 'theobroma grandiflorum',
    'black currant', 'black currant oil', 'ribes nigrum',

    // E
    'egg', 'egg oil', 'ovum',
    'evening primrose', 'evening primrose oil', 'oenothera biennis',

    // G
    'galip', 'galip oil', 'canarium indicum',
    'ginseng', 'ginseng oil', 'panax ginseng',
    'goji', 'goji oil', 'lycium barbarum',
    'grapeseed', 'grapeseed oil', 'vitis vinifera',

    // H
    'hazelnut', 'hazelnut oil', 'corylus americana',
    'chilean hazelnut', 'chilean hazelnut oil', 'gevuina avellana',
    'harakeke', 'harakeke oil', 'phormium tenax',
    'hemp', 'hemp oil', 'cannabis sativa',

    // I
    'illipe', 'illipe oil', 'illipe butter', 'shorea stenoptera',

    // J
    'jojoba', 'jojoba oil', 'jojoba wax', 'simmondsia chinensis',

    // K
    'kiwi', 'kiwi oil', 'actinidia chinensis',
    'karanja', 'karanja oil', 'pongamia glabra',
    'kukui', 'kukui oil', 'aleurites moluccanus',

    // L
    'lingonberry', 'lingonberry oil', 'vaccinium vitis-idaea',
    'linseed', 'linseed oil', 'linum usitatissimum',
    'lanolin', 'lanolin wax',

    // M
    'mushroom', 'mushroom oil', 'agaricus bisporus',
    'macadamia', 'macadamia oil', 'macadamia integrifolia',
    'mango', 'mango oil', 'mango butter', 'mangifera indica',
    'marula', 'marula oil', 'sclerocarya birrea',
    'meadowfoam', 'meadowfoam oil', 'limnanthes alba',
    'mongongo', 'mongongo oil', 'ricinodendron rautenenii',
    'moringa', 'moringa oil', 'moringa oleifera',
    'musk mallow', 'musk mallow oil', 'hibiscus abelmoschus',
    'mustard', 'mustard oil', 'brassica juncea',

    // N
    'neem', 'neem oil', 'azadirachta indica',

    // O
    'olive', 'olive oil', 'olive butter', 'olea europaea',
    'tsubaki', 'tsubaki oil', 'camellia japonica',

    // P
    'palm', 'palm oil', 'palm butter', 'palm wax', 'palm olein', 'elaeis guineensis',
    'brazillian palm', 'brazillian palm oil', 'brazillian palm butter', 'astrocaryum vulgare',
    'south american palm', 'south american palm oil', 'south american palm butter', 'astrocaryum tucuma',
    'papaya', 'papaya oil', 'carica papaya',
    'passion fruit', 'passion fruit oil', 'passiflora edulis',
    'passion flower', 'passion flower oil', 'passiflora incarnata',
    'pataua', 'pataua oil', 'oenocarpus bataua',
    'peach', 'peach oil', 'prunus persica',
    'peanut', 'peanut oil', 'arachis hypogeae',
    'pecan', 'pecan oil', 'carya illinoinensis',
    'black pepper', 'black pepper oil', 'piper nigrum',
    'pequi', 'pequi oil', 'caryocar brasiliense',
    'japanese pine', 'japanese pine oil', 'pinus parviflora',
    'korean pine', 'korean pine oil', 'pinus koraiensis',
    'siberian pine', 'siberian pine oil', 'pinus sibirica',
    'pistachio', 'pistachio oil', 'pistacia vera',
    'common plum', 'common plum oil', 'prunus domestica',
    'hog plum', 'hog plum oil', 'ximenia americana',
    'pomegranate', 'pomegranate oil', 'punica granatum',
    'pongamia', 'pongamia oil', 'pongamia pinnata',
    'poppy', 'poppy oil', 'papaver orientale',
    'opium poppy', 'opium poppy oil', 'papaver somniferum',
    'pracaxi', 'pracaxi oil', 'pentaclethra macroloba',
    'pumpkin', 'pumpkin oil', 'cucurbita pepo',
    'purple viper\'s bugloss', 'purple viper\'s bugloss oil', 'echium plantagineum',

    // R
    'radish', 'radish oil', 'raphanus sativus',
    'rapeseed', 'rapeseed oil', 'brassica capestris',
    'raspberry', 'raspberry oil', 'rubus idaeus',
    'rice', 'rice oil', 'oryza sativa',
    'dog rose', 'dog rose oil', 'rosa canina',
    'musk rose', 'musk rose oil', 'rosa moschata',
    'rosehip', 'rosehip oil', 'rosa rubiginosa',
    'rose', 'rose oil', 'rosa mosqueta',

    // S
    'safflower', 'safflower oil', 'carthamus tinctorius',
    'seabuckthorn', 'seabuckthorn oil', 'hippophae rhamnoides',
    'sesame', 'sesame oil', 'sesamum indicum',
    'shea', 'shea oil', 'shea butter', 'butyrospermum parkii',
    'shorea', 'shorea oil', 'shorea butter', 'shorea robusta',
    'east african shea', 'east african shea oil', 'east african shea butter', 'vitellaria nilotica',
    'soybean', 'soybean oil', 'glycine soja',
    'sponge gourd', 'sponge gourd oil', 'luffa cylindrica',
    'sunflower', 'sunflower oil', 'helianthus annuus',
    'sweet brier', 'sweet brier oil', 'rosa eglentaria',

    // T
    'tamanu', 'tamanu oil', 'callophyllum inophyllum',
    'tomato', 'tomato oil', 'solanum lycopersicum',

    // W
    'watermelon', 'watermelon oil', 'citrullus lanatus',
    'wheat', 'wheat oil', 'triticum vulgare',
    'white lupin', 'white lupin oil', 'lupinus albus',
  ],

  // ====== ESTERI PROBLEMATICI ======
  // Fonte: https://sezia.co/ingredients/esters
  dangerousEsters: [
    'polysorbate', 'polysorbate 20', 'polysorbate 40', 'polysorbate 60', 'polysorbate 80',
    'sorbitan', 'sorbitan monooleate', 'sorbitan monopalmitate', 'sorbitan monostearate',
    'glyceryl', 'glyceride', 'triglyceride', 'diglyceride', 'monoglyceride',
    'cetyl', 'cetyl esters', 'cetyl alcohol',
    'stearyl', 'stearyl alcohol', 'stearyl esters',
    'cetearyl', 'cetearyl alcohol', 'cetearyl esters',
    'isocetyl', 'isocetyl alcohol', 'isocetyl esters',
    'isostearyl', 'isostearyl alcohol', 'isostearyl esters',
    'cocoyl', 'cocoyl esters', 'cocoyl methyl taurate',
    'lauroyl', 'lauroyl esters', 'lauroyl sarcosinate',
    'myristoyl', 'myristoyl esters',
    'palmitoyl', 'palmitoyl esters', 'palmitoyl methyl taurate',
    'stearoyl', 'stearoyl esters',
    'oleoyl', 'oleoyl esters',
    'linoleoyl', 'linoleoyl esters',
    'linolenoyl', 'linolenoyl esters',
    'undecylenoyl', 'undecylenoyl esters',
  ],

  // ====== FERMENTATI & LIEVITI (ALTA SENSIBILITÀ) ======
  // Fonte: https://sezia.co/ingredients/high-sensitivity
  highSensitivity: [
    // Fermented molds
    'aspergillus ferment', 'aspergillus/rice ferment filtrate',

    // Fermented bacteria
    'bacillus ferment', 'bacillus/soybean ferment',
    'alteromonas ferment', 'alteromonas ferment extract',
    'lactococcus ferment', 'lactococcus ferment lysate',
    'pseudoalteromonas', 'pseudoalteromonas ferment', 'pseudoalteromonas ferment extract',
    'pseudoalteromonas exopolysaccharides',
    'thermus thermophillus', 'thermus thermophillus ferment',
    'leuconostoc', 'leuconostoc ferment',

    // Fermented botanicals
    'leuconostoc/radish root ferment filtrate',
    'rice ferment', 'rice ferment filtrate', 'rice filtrate ferment',
    'rice ferment filtrate (sake)', 'sake ferment',
    'kombucha', 'saccharomyces xylinum kombucha', 'saccharomyces xylinum black tea ferment',
    'saccharomyces/camellia sinensis leaf ferment',
    'saccharomyces/rice ferment', 'saccharomyces/rice ferment filtrate',
    'saccharomyces/xylinum/black tea ferment',

    // Yeasts
    'yeast', 'yeast extract', 'faex', 'hydrolyzed yeast', 'hydrolyzed yeast extract',
    'saccharomyces', 'saccharomyces cerevisiae', 'saccharomyces cerevisiae extract',
    'saccharomyces ferment', 'saccharomyces ferments', 'saccharomyces ferment filtrate',
    'saccharomyces/copper ferment', 'saccharomyces/iron ferment',
    'saccharomyces/magnesium ferment', 'saccharomyces/silicon ferment',
    'saccharomyces/zinc ferment',
    'saccharomyces (lysate, copper, zinc) ferment',
    'saccharomyces lysate ferment',

    // Other fermented botanicals
    'lactobacillus ferment', 'lactobacillus/pumpkin ferment',
    'lactobacillus/rice ferment filtrate', 'lactobacillus/tomato ferment',
    'lactobacillus/wasabia ferment', 'lactobacillus/water hyacinth ferment',
  ],

  // ====== INGREDIENTI BENEFICI (SAFE) ======
  // Fonte: https://sezia.co/ingredients/galactomyces (+ altri)
  beneficial: [
    // Galactomyces derivatives
    'galactomyces', 'galactomyces ferment', 'galactomyces ferment filtrate',

    // Vitamin B & derivatives
    'niacinamide', 'nicotinamide', 'vitamin b3', 'vitamin b5',
    'panthenol', 'pantothenic acid', 'dexpanthenol',

    // Moisturizers & hydrators
    'glycerin', 'hyaluronic acid', 'sodium hyaluronate',
    'allantoin', 'sorbitol',

    // Oat & calming
    'colloidal oatmeal', 'oat kernel extract', 'avena sativa',

    // Ceramides & lipids (these are beneficial unlike oils)
    'ceramide', 'ceramide np', 'ceramide eo', 'ceramide ap',
    'cholesterol', 'phytosphingosine',

    // Antifungal & treating agents
    'azelaic acid', 'azelaia', 'azelaic',
    'salicylic acid', 'salicylate',
    'benzoyl peroxide', 'benzene peroxide',
    'ketoconazole', 'ketoconazol',
    'zinc pyrithione', 'zinc pyrithione',
    'coal tar', 'tar extract',
    'selenium sulfide', 'selenium disulfide',

    // Anti-inflammatory
    'zinc', 'zinc pca', 'zinc gluconate',
    'copper', 'copper peptide',
    'sulfur', 'sulphur',

    // Soothing & antioxidant
    'centella asiatica', 'cica', 'madecassoside',
    'aloe vera', 'aloe barbadensis',
    'green tea', 'camellia sinensis',
    'vitamin e', 'tocopherol',
    'vitamin c', 'ascorbic acid',
    'resveratrol',

    // Oils with beneficial properties (specific safe ones)
    'jojoba', 'jojoba oil',  // Despite being lipid, has unique properties
    'squalane', 'squalene',  // Skin-mimicking lipid

    // Others
    'probiotics', 'probiotic',
    'beta-glucan',
    'xanthan gum',  // Not food for malassezia
    'chamomile', 'chamomile extract',
    'lavender', 'lavender oil', 'lavandula angustifolia',
    'licorice', 'licorice extract', 'glycyrrhiza glabra',
    'neem', 'neem leaf',  // When used for antifungal properties
  ],
};

/**
 * Helper function to check if ingredient matches database
 */
export function normalizeForMatching(ingredient) {
  return ingredient
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, '');
}

/**
 * Get all ingredients flattened for checking
 */
export function getAllIngredients() {
  return {
    danger: [
      ...ingredientDatabase.dangerousFattyAcids,
      ...ingredientDatabase.dangerousLipids,
      ...ingredientDatabase.dangerousEsters,
    ],
    caution: ingredientDatabase.highSensitivity,
    safe: ingredientDatabase.beneficial,
  };
}
