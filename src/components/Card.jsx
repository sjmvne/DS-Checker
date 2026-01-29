import React from 'react';
import './Card.css';
import Emoji from './Emoji';

/**
 * Card Component
 * @glass @dark @vars @resp
 */
const Card = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`card glass glass-hover ${className}`}>
      {(title || icon) && (
        <div className="card-header">
          {icon && <span className="card-icon">{icon}</span>}
          {title && <h3 className="card-title">{title}</h3>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default Card;
