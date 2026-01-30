import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Emoji from './Emoji';
import dictionaryEn from '../data/dictionary.json';
import dictionaryIt from '../data/it/dictionary_it.json';
import './Dictionary.css';

const Dictionary = () => {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  // Select dataset based on language
  const dictionaryData = language === 'it' ? dictionaryIt : dictionaryEn;

  const filteredTerms = dictionaryData && dictionaryData.terms ? dictionaryData.terms.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="page-container fade-in">
      <div className="dict-header">
        <h1><Emoji name="Open Book" fallback="📖" /> {t('menu.dictionary')}</h1>
        <p>{language === 'it' 
          ? "Glossario dei termini tecnici, chimici e biologici" 
          : "Glossary of technical, chemical, and biological terms"}</p>
        
        <input 
          type="text" 
          placeholder={language === 'it' ? "🔍 Cerca termine..." : "🔍 Search term..."}
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
             <p>{language === 'it' ? "Nessun termine trovato." : "No terms found."}</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default Dictionary;
