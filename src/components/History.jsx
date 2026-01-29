import React from 'react';
import Card from './Card';
import './History.css';
import Emoji from './Emoji';

const History = ({ items, onItemClick, onClear }) => {
  return (
    <div className="history-section">
      <div className="history-header">
        <h3>📋 Cronologia Scansioni</h3>
        <button className="btn-text" onClick={onClear}>Cancella Tutto</button>
      </div>

      <div className="history-grid">
        {items.map((item, index) => {
           const scoreColor = item.score >= 70 ? 'var(--color-success)' : item.score >= 40 ? 'var(--color-warning)' : 'var(--color-danger)';
           
           return (
            <div key={index} className="history-item glass glass-hover" onClick={() => onItemClick(item)}>
              <div className="history-info">
                <div className="history-name">{item.productName}</div>
                <div className="history-date">{item.date}</div>
              </div>
              <div className="history-badge" style={{ color: scoreColor, borderColor: scoreColor }}>
                {Math.round(item.score)}%
              </div>
            </div>
           );
        })}
      </div>
    </div>
  );
};

export default History;
