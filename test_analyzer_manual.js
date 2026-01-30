
import { analyzeIngredient, analyzeProduct } from './src/services/analyzer.js';
import { fullDatabase, getDatabase } from './src/services/ingredientDatabase.js';

// Mock the environment if needed or just run with node
const runTest = () => {
  console.log("--- STARTING ANALYZER TEST ---");

  // Simulate IT Mode
  const itDb = getDatabase('it');
  
  // Test Case 1: "Sodium Laureth Sulfate (sles)"
  // This is known to work in EN, fail in IT (User report)
  const input = "Sodium Laureth Sulfate (sles)";
  
  console.log(`Testing input: "${input}" in IT mode...`);
  const result = analyzeIngredient(input, itDb);
  
  console.log("Result Status:", result.status);
  console.log("Result Name:", result.name);
  console.log("Result Category:", result.category);
  
  if (result.status === 'unknown') {
      console.error("FAIL: Should have matched SLES!");
  } else {
      console.log("SUCCESS: Matched SLES.");
  }

  // Test Case 2: Fallback Logic via English Catalog
  // "Coconut Oil" (Common EN Name) vs "Olio di Cocco" (IT Name)
  // Both share INCI "Cocos Nucifera Oil"
  const input2 = "Coconut Oil";
  console.log(`\nTesting input: "${input2}" in IT mode...`);
  const result2 = analyzeIngredient(input2, itDb);
  
  console.log("Result Status:", result2.status);
  console.log("Result Name:", result2.name); // Should ideally be IT name if cross-ref worked
  
  if (result2.status === 'unknown') {
      console.error("FAIL: Cross-reference fallback failed for Coconut Oil");
  } else {
      console.log("SUCCESS: Matched Coconut Oil via fallback.");
      if (result2.name === "Olio di Cocco") {
          console.log("PERFECT: Retrieved localized IT entry.");
      } else {
          console.log("PARTIAL: Retrieved EN entry (fallback direct return). Name:", result2.name);
      }
  }
};

runTest();
