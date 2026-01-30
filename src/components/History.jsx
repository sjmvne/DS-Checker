import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Card from './Card';
import './History.css';
import Emoji from './Emoji';

const History = ({ items, onItemClick, onClear }) => {
  const { t } = useLanguage();

  return (
    <div className="history-section">
      <div className="history-header">
        <h3>📋 {t('history.title')}</h3>
        <button className="btn-text" onClick={onClear}>{t('history.clear_all')}</button>
      </div>

      <div className="history-grid">
        {items.map((item, index) => {
           const scoreColor = item.score >= 70 ? 'var(--color-success)' : item.score >= 40 ? 'var(--color-warning)' : 'var(--color-danger)';
           
           return (
            <div key={index} className="history-item glass glass-hover" onClick={() => onItemClick(item)}>
              {item.imageUrl && (
                <img src={item.imageUrl} alt="" className="history-thumb" />
              )}
              <div className="history-info">
                <div className="history-name" title={item.productName}>{item.productName}</div>
                <div className="history-meta">
                  <span className="history-date">{item.date}</span>
                  {item.totalIngredients > 0 && <span className="history-count"> • {item.totalIngredients} {t('results.total_ingredients').toLowerCase().slice(0, 4)}.</span>}
                </div>
              </div>
              <div className="history-badge" style={{ color: scoreColor, borderColor: scoreColor }}>
                {Math.round(item.score)}%
              </div>
            </div>
           );
        })}
        {items.length === 0 && (
           <div className="history-empty">
             <p>{t('history.empty')}</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default History;
