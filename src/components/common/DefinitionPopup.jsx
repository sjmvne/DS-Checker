import React from 'react';
import ReactDOM from 'react-dom';
import './DefinitionPopup.css';

const DefinitionPopup = ({ term, definition, category, onClose }) => {
  if (!term) return null;

  const content = (
    <div className="definition-popup-overlay" onClick={onClose} style={{zIndex: 10000}}>
      <div 
        className="definition-popup"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="definition-header">
          <h3>{term}</h3>
          {category && <span className={`term-badge badge-${category.toLowerCase().replace(/\s+/g, '-')}`}>{category}</span>}
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="definition-body">
          <p>{definition}</p>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
};

export default DefinitionPopup;
