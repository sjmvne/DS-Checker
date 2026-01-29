/**
 * Calculates a safety score (0-100) based on analysis results.
 * 
 * Rules:
 * Start at 100.
 * -30 per DANGER item (Fatty Acids, Lipids).
 * -15 per WARNING item (Esters).
 * -5 per CAUTION item (Ferments).
 * Minimum score is 0.
 * 
 * Ranges:
 * 80-100: Safe (Green)
 * 50-79:  Caution (Yellow/Orange)
 * 0-49:   Danger (Red)
 */
export const calculateScore = (analysis) => {
  if (!analysis) return 0;

  const dangerCount = analysis.danger.length;
  const warningCount = (analysis.warning || []).length;
  const cautionCount = analysis.caution.length;

  // New weighting system
  const penalty = 
    (dangerCount * 30) + 
    (warningCount * 15) + 
    (cautionCount * 5);

  const rawScore = 100 - penalty;

  return Math.max(0, rawScore);
};
