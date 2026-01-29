import React, { useState } from 'react';
import Card from './Card';
import OCRReader from './OCRReader';
import './Search.css';

const Search = ({ onAnalyze }) => {
  const [productName, setProductName] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');

  const handleAnalyze = () => {
    if (!ingredientsText.trim()) return;
    onAnalyze(productName.trim(), ingredientsText);
  };

  const handleClear = () => {
    setProductName('');
    setIngredientsText('');
  };

  return (
    <Card title="Ricerca Manuale" icon="🔍" className="search-card">
      <div className="search-form">
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
            placeholder="Incolla qui la lista ingredienti o usa la fotocamera..."
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
    </Card>
  );
};

export default Search;
