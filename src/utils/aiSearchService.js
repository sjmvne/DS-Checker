/**
 * aiSearchService.js
 * Service for interacting with the AI Backend (Perplexity Sonar)
 */

const API_BASE_URL = import.meta.env.VITE_AI_API_URL || 'http://localhost:3000'; // Default to local for dev



/**
 * Search for product ingredients using AI
 * @param {Object} params
 * @param {string} params.barcode
 * @param {string} params.productName
 * @param {string} params.brand
 * @param {string} params.country
 * @returns {Promise<Object>}
 */
export async function searchProductIngredients({ barcode, productName, brand, country = 'IT' }) {
  const endpoint = `${API_BASE_URL}/api/v1/ai/search-inci`;
  
  console.log('🤖 AI Search:', { barcode, productName, brand, country });

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        barcode: barcode || undefined,
        product_name: productName,
        brand: brand,
        country: country
      }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server Error: ${response.status}`);
    }

    const data = await response.json();
    return data; // Expected { status: 'success', data: {...}, confidence: 0.xx }

  } catch (error) {
    console.error('❌ AI Search Error:', error);
    // For development/demo purposes without a backend, we might want to simulate a response if configured
    if (import.meta.env.DEV && !import.meta.env.VITE_AI_API_URL) {
        console.warn('⚠️ No Backend API URL configured. Returning mock error.');
        throw new Error('Backend API not configured. Please set VITE_AI_API_URL.');
    }
    throw error;
  }
}
