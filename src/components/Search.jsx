import React, { useState } from 'react';
import Card from './Card';
import OCRReader from './OCRReader';
import Emoji from './Emoji';
import { searchProductIngredients } from '../utils/aiSearchService';
import './Search.css';

const Search = ({ onAnalyze }) => {
  // Manual Mode State
  const [productName, setProductName] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  
  // AI Mode State
  const [aiMode, setAiMode] = useState(false);
  const [aiForm, setAiForm] = useState({ productName: '', brand: '', country: 'IT', barcode: '' });
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiError, setAiError] = useState(null);

  // Manual Handlers
  const handleAnalyze = () => {
    if (!ingredientsText.trim()) return;
    onAnalyze(productName.trim(), ingredientsText);
  };

  const handleClear = () => {
    setProductName('');
    setIngredientsText('');
    setAiResult(null);
    setAiError(null);
  };

  // AI Handlers
  const handleAiSearch = async () => {
    if (!aiForm.productName || !aiForm.brand) {
      alert('Inserisci almeno Nome Prodotto e Marca');
      return;
    }

    setAiLoading(true);
    setAiError(null);
    setAiResult(null);

    try {
      const result = await searchProductIngredients({
        productName: aiForm.productName,
        brand: aiForm.brand,
        country: aiForm.country,
        barcode: aiForm.barcode
      });

      if (result.status === 'success') {
        setAiResult(result);
      } else {
        setAiError(result.error || 'Nessun risultato trovato.');
      }
    } catch (err) {
      setAiError(err.message || 'Errore di connessione');
    } finally {
      setAiLoading(false);
    }
  };

  const handleAcceptAiResult = () => {
    if (!aiResult || !aiResult.data) return;
    // Pass raw ingredients list (array) directly to analyzer
    // Pass raw ingredients list (array) directly to analyzer, plus metadata
    onAnalyze(aiResult.data.product_name, aiResult.data.ingredients_list, {
      imageUrl: aiResult.data.product_image_url,
      sources: aiResult.data.sources,
      barcode: aiResult.data.barcode,
      confidence: aiResult.confidence
    });
    // Optional: Reset AI search after accept? Or keep it visible? 
    // Let's reset to show results below (handled by parent App scrolling)
  };

  return (
    <Card 
      title={aiMode ? "Ricerca AI Intelligente" : "Ricerca Manuale"} 
      icon={aiMode ? "🤖" : "🔍"} 
      className="search-card"
    >
      {/* Mode Toggle */}
      <div className="search-mode-toggle">
        <button 
          className={`mode-btn ${!aiMode ? 'active' : ''}`}
          onClick={() => setAiMode(false)}
        >
          <Emoji name="Pencil" fallback="✏️" /> Manuale
        </button>
        <button 
          className={`mode-btn ${aiMode ? 'active' : ''}`}
          onClick={() => setAiMode(true)}
        >
          <Emoji name="Sparkles" fallback="✨" /> AI Search
        </button>
      </div>

      {/* MANUAL MODE */}
      {!aiMode && (
        <div className="search-form fade-in">
          <label className="form-label">
            Nome Prodotto (Opzionale)
            <input 
              type="text" 
              className="input-field" 
              placeholder="Es. Shampoo Neutro"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </label>

          <label className="form-label">
            Ingredienti (Copia/Incolla o Scansiona)
            <OCRReader onScanComplete={(text) => setIngredientsText(prev => prev + (prev ? '\n' : '') + text)} />
            <textarea 
              className="textarea-field"
              placeholder="Incolla qui la lista ingredienti..."
              rows={8}
              value={ingredientsText}
              onChange={(e) => setIngredientsText(e.target.value)}
            />
          </label>

          <div className="button-group">
            <button 
              className="btn btn-primary" 
              onClick={handleAnalyze}
              disabled={!ingredientsText.trim()}
            >
              Analizza
            </button>
            <button className="btn btn-secondary" onClick={handleClear}>
              Pulisci
            </button>
          </div>
        </div>
      )}

      {/* AI MODE */}
      {aiMode && (
        <div className="search-form fade-in">
           {!aiResult ? (
             <>
               <label className="form-label">
                 Nome Prodotto *
                 <input 
                   type="text" 
                   className="input-field" 
                   placeholder="Es. Effaclar Gel"
                   value={aiForm.productName}
                   onChange={(e) => setAiForm({...aiForm, productName: e.target.value})}
                 />
               </label>
               
               <div className="form-row">
                 <label className="form-label flex-1">
                   Marca *
                   <input 
                     type="text" 
                     className="input-field" 
                     placeholder="Es. La Roche-Posay"
                     value={aiForm.brand}
                     onChange={(e) => setAiForm({...aiForm, brand: e.target.value})}
                   />
                 </label>
                 
                 <label className="form-label flex-0">
                   Paese
                   <select 
                      className="input-field"
                      value={aiForm.country}
                      onChange={(e) => setAiForm({...aiForm, country: e.target.value})}
                   >
                     <option value="IT">🇮🇹</option>
                     <option value="US">🇺🇸</option>
                     <option value="FR">🇫🇷</option>
                     <option value="DE">🇩🇪</option>
                   </select>
                 </label>
               </div>
               
               <label className="form-label">
                 Barcode (Opzionale)
                 <input 
                   type="text" 
                   className="input-field" 
                   placeholder="EAN-13"
                   value={aiForm.barcode}
                   onChange={(e) => setAiForm({...aiForm, barcode: e.target.value})}
                 />
               </label>

               <div className="button-group">
                 <button 
                   className="btn btn-ai" 
                   onClick={handleAiSearch}
                   disabled={aiLoading || !aiForm.productName || !aiForm.brand}
                 >
                   {aiLoading ? '🤖 Ricerca in corso...' : '🔮 Cerca con Perplexity'}
                 </button>
               </div>
               
               {aiError && (
                 <div className="ai-error glass-panel">
                   <p>❌ {aiError}</p>
                   <p className="hint">Prova a verificare il nome o la marca.</p>
                 </div>
               )}
             </>
           ) : (
             /* AI RESULT PREVIEW */
             <div className="ai-result-preview glass-panel fade-in">
                <div className="ai-header">
                  {aiResult.data.product_image_url && (
                    <img src={aiResult.data.product_image_url} alt="Product" className="ai-product-img" />
                  )}
                  <div className="ai-meta">
                    <h4>{aiResult.data.product_name}</h4>
                    <p className="ai-brand">{aiResult.data.brand}</p>
                    <div className="confidence-badge">
                      Confidence: {Math.round(aiResult.confidence * 100)}%
                    </div>
                  </div>
                </div>

                <div className="ai-ingredients-preview">
                  <h5>Ingredienti trovati ({aiResult.data.ingredients_list.length})</h5>
                  <p className="ing-snippet">
                    {aiResult.data.ingredients_list.slice(0, 5).join(', ')}...
                  </p>
                </div>
                
                <div className="ai-actions">
                  <button className="btn btn-success" onClick={handleAcceptAiResult}>
                    ✅ Accetta & Analizza
                  </button>
                  <button className="btn btn-danger" onClick={() => setAiResult(null)}>
                    ❌ Rifiuta
                  </button>
                </div>
                
                {aiResult.data.sources && aiResult.data.sources.length > 0 && (
                   <p className="ai-source">Fonte: {new URL(aiResult.data.sources[0]).hostname}</p>
                )}
             </div>
           )}
        </div>
      )}
    </Card>
  );
};

export default Search;
