import React, { useState } from 'react';
import Card from './Card';
import dictionaryData from '../data/dictionary.json';
import './Dictionary.css';

const Dictionary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sort terms alphabetically
  const sortedTerms = [...dictionaryData.terms].sort((a, b) => 
    a.term.localeCompare(b.term)
  );

  const filteredTerms = sortedTerms.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container fade-in">
      <div className="dict-header">
        <h1>📖 Dizionario DS</h1>
        <p>Glossario dei termini tecnici, chimici e biologici</p>
        
        <input 
          type="text" 
          placeholder="🔍 Cerca termine..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="dict-search glass"
        />
      </div>

      <div className="dict-grid">
        {filteredTerms.map((item, idx) => (
          <div key={idx} className="dict-item glass">
            <div className="dict-item-header">
              <h3>{item.term}</h3>
              <span className="dict-category">{item.category}</span>
            </div>
            <p className="dict-definition">{item.definition}</p>
          </div>
        ))}
        
        {filteredTerms.length === 0 && (
           <div className="dict-empty">
             <p>Nessun termine trovato.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default Dictionary;
