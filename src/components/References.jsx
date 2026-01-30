import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../hooks/useData';
import Card from './Card';
import './References.css';
import Emoji from './Emoji';

const usefulLinks = [
  { title: "Sezia Ingredient Database", url: "https://sezia.co/ingredients", desc: "Original database for checking ingredient safety." },
  { title: "Sezia Fatty Acids Guide", url: "https://sezia.co/ingredients/fatty-acids", desc: "In-depth guide on fatty acids." },
  { title: "Sezia Ingredient Ratings", url: "https://sezia.co/ingredients/ratings", desc: "Ingredient rating system." }
];

const References = () => {
  const { t } = useLanguage();
  const { references } = useData(); // Get dynamic references

  if (!references) return <div className="loading">Loading references...</div>;

  return (
    <div className="page-container fade-in">
      <div className="ref-header">
        <h2><Emoji name="Books" fallback="📚" /> {t('references.title')}</h2>
        <p>
          {t('references.subtitle')}
        </p>
      </div>

      <div className="ref-content glass">
        {Object.entries(references).map(([category, refs]) => (
          <div key={category} className="ref-section">
            <h3 className="ref-category-title">{category.replace(/_/g, ' ').toUpperCase()}</h3>
            <ul className="ref-list-styled">
              {refs.map((ref, i) => (
                <li key={i} className="ref-item">
                  <span className="ref-marker"><Emoji name="Page Facing Up" fallback="📄" /></span>
                  <div className="ref-details">
                    <strong className="ref-title">{ref.title}</strong>
                    <span className="ref-journal">{ref.journal}, {ref.year}</span>
                    <p className="ref-snippet">{ref.key_finding}</p>
                    
                    {ref.url && (
                      <a href={ref.url} target="_blank" rel="noopener noreferrer" className="ref-link-pill">
                        <Emoji name="Link" fallback="🔗" size="1em" /> {t('references.read_study')}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="ref-section useful-links-section">
           <h3 className="ref-category-title"><Emoji name="Globe with Meridians" fallback="🌐" /> {t('references.useful_resources')}</h3>
           <div className="links-grid">
              {usefulLinks.map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="useful-link-card glass glass-hover">
                   <h4><Emoji name="Link" fallback="🔗" /> {link.title}</h4>
                   <p>{link.desc}</p>
                </a>
              ))}
           </div>
        </div>
        
        <div style={{marginTop: '3rem', fontSize: '0.8rem', opacity: 0.7, borderTop: '1px solid var(--color-border)', paddingTop: '1rem', textAlign: 'center'}}>
          <p>Database Version: 1.1 | References verified: 2026-01-29</p>
        </div>
      </div>
    </div>
  );
};

export default References;
