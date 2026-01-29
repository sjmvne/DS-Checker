/**
 * Service to interact with OpenBeautyFacts API.
 */

const BASE_URL = 'https://world.openbeautyfacts.org/api/v0/product/';

/**
 * Fetches product details by barcode.
 * @param {string} barcode 
 * @returns {Promise<object>} Product data or error.
 */
export const fetchProductByBarcode = async (barcode) => {
  try {
    const response = await fetch(`${BASE_URL}${barcode}.json`);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 0) {
      throw new Error('Prodotto non trovato su OpenBeautyFacts');
    }

    return {
      productName: data.product.product_name || '',
      brands: data.product.brands || '',
      image: data.product.image_url || '',
      ingredientsText: data.product.ingredients_text || ''
    };

  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
