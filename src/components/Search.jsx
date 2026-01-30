import React, { useState, useEffect, Suspense } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LoadingOverlay from './LoadingOverlay';
import Card from './Card';
// import OCRReader from './OCRReader'; // Removed static import
import Emoji from './Emoji';
import { searchProductIngredients } from '../utils/aiSearchService';
import perplexityLogo from '../assets/perplexity.svg';
import './Search.css';

// Lazy load OCRReader (heavy dependency: tesseract.js)
const OCRReader = React.lazy(() => import('./OCRReader'));

const Search = ({ onAnalyze, aiRequest }) => {
  const { t } = useLanguage();
  
  // Manual Mode State
  const [productName, setProductName] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  
  // AI Mode State
  const [aiMode, setAiMode] = useState(false);
  const [aiForm, setAiForm] = useState({ productName: '', brand: '', country: 'IT', barcode: '' });
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiError, setAiError] = useState(null);

  // Handle incoming AI requests (e.g. from Scanner)
  useEffect(() => {
    if (aiRequest && aiRequest.barcode) {
      setAiMode(true);
      setAiForm(prev => ({ ...prev, barcode: aiRequest.barcode }));
      // Optional: Auto-focus or scroll?
    }
  }, [aiRequest]);

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
      alert(t('search.product_name_required') + ' & ' + t('search.brand_required')); // Simple alert translation fallback
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
    
    // 1. Send data to App for analysis/display
    onAnalyze(aiResult.data.product_name, aiResult.data.ingredients_list, {
      imageUrl: aiResult.data.product_image_url,
      sources: aiResult.data.sources,
      barcode: aiResult.data.barcode,
      confidence: aiResult.confidence
    });

    // 2. Reset Search Card completely
    handleClear(); 
    setAiMode(false);
  };

  return (
    <Card 
      title={aiMode ? t('search.ai_mode') : t('search.manual_mode')} 
      icon={aiMode ? <Emoji name="Robot" fallback="🤖" /> : <Emoji name="Magnifying Glass Tilted Left" fallback="🔍" />} 
      className="search-card"
    >
      {/* Mode Toggle */}
      <div className="search-mode-toggle">
        <button 
          className={`mode-btn ${!aiMode ? 'active' : ''}`}
          onClick={() => setAiMode(false)}
        >
          <Emoji name="Pencil" fallback="✏️" /> {t('search.manual_btn')}
        </button>
        <button 
          className={`mode-btn ${aiMode ? 'active' : ''}`}
          onClick={() => setAiMode(true)}
        >
          <Emoji name="Sparkles" fallback="✨" /> {t('search.ai_btn')}
        </button>
      </div>

      {/* MANUAL MODE */}
      {!aiMode && (
        <div className="search-form fade-in">
          <label className="form-label">
            {t('search.product_name')}
            <input 
              type="text" 
              className="input-field" 
              placeholder={t('search.product_placeholder')}
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </label>

          <label className="form-label">
            {t('search.ingredients_label')}
            <Suspense fallback={<div className="ocr-loading">{t('search.loading_ocr')}</div>}>
               <OCRReader onScanComplete={(text) => setIngredientsText(prev => prev + (prev ? '\n' : '') + text)} />
            </Suspense>
            <textarea 
              className="textarea-field"
              placeholder={t('search.paste_placeholder')}
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
              {t('search.analyze_btn')}
            </button>
            <button className="btn btn-secondary" onClick={handleClear}>
              {t('search.clear_btn')}
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
                 {t('search.product_name_required')}
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
                   {t('search.brand_required')}
                   <input 
                     type="text" 
                     className="input-field" 
                     placeholder="Es. La Roche-Posay"
                     value={aiForm.brand}
                     onChange={(e) => setAiForm({...aiForm, brand: e.target.value})}
                   />
                 </label>
                 
                 <label className="form-label flex-0">
                   {t('search.country')}
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
                 {t('search.barcode')}
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
                   {aiLoading ? (
                     '🤖 ...'
                   ) : (
                     <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <img src={perplexityLogo} alt="Perplexity" className="perplexity-icon" />
                        {t('search.ai_search_btn')}
                     </span>
                   )}
                 </button>
               </div>
               
               {/* Global Loader for AI Search */}
               <LoadingOverlay 
                 isVisible={aiLoading} 
                 icon={<img src={perplexityLogo} alt="AI" />} 
                 text="Analisi AI in corso..."
               />
               
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
                    <div className="confidence-badge" title={aiResult.data.confidence_reason}>
                      {Math.round(aiResult.confidence * 100)}% Match
                    </div>
                  </div>
                  {aiResult.data.product_type && <span className="ai-type-tag">{aiResult.data.product_type}</span>}
                  {aiResult.data.confidence_reason && (
                    <p className="ai-confidence-reason"><small>{aiResult.data.confidence_reason}</small></p>
                  )}
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
