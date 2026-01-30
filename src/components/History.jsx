import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Card from './Card';
import './History.css';
import Emoji from './Emoji';

const SwipeableHistoryItem = ({ item, onClick, onRemove }) => {
  const [startX, setStartX] = React.useState(null);
  const [currentX, setCurrentX] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const itemRef = React.useRef(null);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (startX === null) return;
    const x = e.touches[0].clientX;
    const diff = x - startX;
    
    // Only allow swiping left (negative diff)
    // Limit swipe to -100px
    if (diff < 0 && diff > -120) {
      setCurrentX(diff);
    }
  };

  const handleTouchEnd = () => {
    if (currentX < -80) {
      // Trigger delete confirmation or simple delete
      handleDelete();
    } else {
      // Snap back
      setCurrentX(0);
    }
    setStartX(null);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    // Wait for animation
    setTimeout(() => {
      onRemove(item);
    }, 300);
  };

  const scoreColor = item.score >= 70 ? 'var(--color-success)' : item.score >= 40 ? 'var(--color-warning)' : 'var(--color-danger)';

  // if (isDeleting) return null; // Logic moved to className for animation

  return (
    <div 
      className={`swipe-container ${isDeleting ? 'deleting' : ''}`} 
      style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px' }}
    >
      
      {/* Background Trash Layer */}
      {/* Background Trash Layer */}
      <div 
        className="swipe-action-bg"
        style={{ opacity: currentX < 0 ? 1 : 0, transition: 'opacity 0.2s' }}
      >
        <span className="trash-icon">🗑️</span>
      </div>

      {/* Foreground Card */}
      <div 
        className="history-item glass glass-hover" 
        onClick={() => onClick(item)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ 
          transform: `translateX(${currentX}px)`, 
          transition: startX !== null ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
          position: 'relative',
          zIndex: 2,
          background: 'var(--color-surface)', // Ensure opacity to hide trash
        }}
      >
        {item.imageUrl && (
          <img src={item.imageUrl} alt="" className="history-thumb" />
        )}
        <div className="history-info">
          <div className="history-name" title={item.productName}>{item.productName}</div>
          <div className="history-meta">
            <span className="history-date">{item.date}</span>
            {item.totalIngredients > 0 && <span className="history-count"> • {item.totalIngredients} Ingred.</span>}
          </div>
        </div>
        <div className="history-badge" style={{ color: scoreColor, borderColor: scoreColor }}>
          {Math.round(item.score)}%
        </div>
      </div>
    </div>
  );
};

const History = ({ items, onItemClick, onClear, onRemoveItem }) => {
  const { t } = useLanguage();

  return (
    <div className="history-section">
      <div className="history-header">
        <h3>📋 {t('history.title')}</h3>
        <button className="btn-text" onClick={onClear}>{t('history.clear_all')}</button>
      </div>

      <div className="history-grid">
        {items.map((item, index) => (
           <SwipeableHistoryItem 
             key={index} // Ideally use unique ID
             item={item} 
             onClick={onItemClick} 
             onRemove={onRemoveItem} 
           />
        ))}
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
