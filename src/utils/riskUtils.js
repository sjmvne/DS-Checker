
/**
 * Standardized Risk Classification Logic
 * Used by DatabaseViewer, IngredientModal, and Scanner Results to ensure consistency.
 */

export const getRiskClass = (level) => {
  if (!level) return 'risk-caution';
  const l = level.toLowerCase();
  
  // SAFE -> Blue
  if (l.includes('safe') || l.includes('sicuro') || l.includes('sure')) return 'risk-safe';

  // LOW -> Green
  if (l.includes('low') || l.includes('basso')) return 'risk-low';
  
  // MODERATE -> Yellow (Caution)
  if (l.includes('moderate') || l.includes('moderato') || l.includes('caution') || l.includes('attenzione')) return 'risk-caution';
  
  // HIGH -> Red (High/Critical) - Aligned with analyzer.js
  if (l.includes('high') || l.includes('alto')) return 'risk-high';
  
  // WARNING -> Orange - Specific for "Warning" label if distinct
  if (l.includes('warning')) return 'risk-warning';
  
  // CRITICAL -> Red (Critical)
  if (l.includes('critical') || l.includes('critico') || l.includes('danger') || l.includes('pericolo')) return 'risk-critical';
  
  // Fallback
  return 'risk-caution';
};

export const getRiskLabelKey = (level) => {
  if (!level) return 'database.legend.moderate.label'; // Default key
  const l = level.toLowerCase();

  if (l.includes('safe') || l.includes('sicuro')) return 'database.legend.safe.label';
  if (l.includes('low') || l.includes('basso')) return 'database.legend.low.label';
  if (l.includes('moderate') || l.includes('moderato') || l.includes('caution')) return 'database.legend.moderate.label';
  
  // Warning -> High Label (Orange)
  if (l.includes('warning')) return 'database.legend.high.label';
  
  // High/Critical -> Critical Label (Red)
  if (l.includes('high') || l.includes('alto') || l.includes('critical') || l.includes('critico') || l.includes('danger')) return 'database.legend.critical.label';
  
  return 'database.legend.moderate.label';
};
