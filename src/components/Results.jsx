import React, { useState, useEffect } from 'react';
import Card from './Card';
import IngredientModal from './IngredientModal';
import { titleCase } from '../utils/formatters';
import './Results.css';
import Emoji from './Emoji';

const Results = ({ data }) => {
  const { productName, date, analysis, score, totalIngredients } = data;
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [showAllIngredients, setShowAllIngredients] = useState(false);
  
  // Animation State
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = score;
    const duration = 5000; // 5 seconds
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      
      const current = start + (end - start) * ease;
      setAnimatedScore(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
    
    // Clean up not strictly needed for raf but good practice
  }, [score]);

  // Badge color based on score (use final score for color consistency, or animated? usually final color is better, or transition color)
  // Let's use final score for color determination to avoid flashing red -> green.
  const getScoreColor = (s) => {
    if (s >= 80) return 'var(--color-success)';
    if (s >= 50) return 'var(--color-warning)';
    return 'var(--color-danger)';
  };

  const getScoreLabel = (s) => {
    if (s >= 80) return 'Prodotto Sicuro';
    if (s >= 50) return 'Usa con Prudenza';
    return 'Non Sicuro';
  };

  const scoreColor = getScoreColor(score);

  const circleStyle = {
    background: `conic-gradient(${scoreColor} ${animatedScore}%, transparent 0)`,
    borderColor: 'transparent',
    color: scoreColor
  };

  // ... (rest of component)
  
  // Update the displayed number:
  // <span className="score-number">{Math.round(animatedScore)}%</span>

  // Helper component for list item
  const IngredientRow = ({ item, status }) => (
    <div 
      className={`ingredient-row row-${status}`} 
      onClick={() => setSelectedIngredient(item)}
      role="button"
      tabIndex={0}
    >
      <div className="row-content">
        <span className="row-name">{titleCase(item.name)}</span>
        {item.category && <span className="row-category">{item.category}</span>}
      </div>
      <div className="row-badge">
        <span className={`status-pill pill-${status}`}>
          {status === 'danger' && 'ALTO RISCHIO'}
          {status === 'warning' && 'MEDIO'}
          {status === 'caution' && 'BASSO RISCHIO'}
          {status === 'safe' && 'SICURO'}
          {status === 'unknown' && 'SCONOSCIUTO'}
        </span>
        <span className="info-icon"><Emoji name="Information" fallback="ℹ️" size="1em" /></span>
      </div>
    </div>
  );

  const hasIssues = analysis.danger.length > 0 || (analysis.warning && analysis.warning.length > 0) || analysis.caution.length > 0;

  // Flatten all for "Show All" view
  const allIngredientsList = [
    ...analysis.danger,
    ...(analysis.warning || []),
    ...analysis.caution,
    ...analysis.safe,
    ...analysis.unknown
  ];

  return (
    <div className="results-container">
      {/* Header Card */}
      <Card className="results-header-card">
        <div className="results-header-content">
          <div className="product-info">
            <h2 className="product-name">{productName}</h2>
            <div className="meta-info">
              <span><Emoji name="Calendar" fallback="📅" /> {date}</span>
              <span><Emoji name="Test Tube" fallback="🧪" /> {totalIngredients} ingredienti</span>
            </div>
          </div>
          
          <div className="score-badge-container">
             <div className="score-badge" style={circleStyle}>
               <div className="score-inner">
                 <span className="score-number">{Math.round(animatedScore)}%</span>
               </div>
             </div>
             <div className="score-icon-large">
               {score >= 80 
                 ? <Emoji name="Check Mark Button" fallback="✅" size="2em" /> 
                 : score >= 50 
                   ? <Emoji name="Warning" fallback="⚠️" size="2em" /> 
                   : <Emoji name="Cross Mark" fallback="❌" size="2em" />
               }
             </div>
          </div>
        </div>
        <p className="score-verdict" style={{ color: scoreColor }}>
          {getScoreLabel(score)}
        </p>
      </Card>

      {/* Problematic Ingredients List (Vertical) */}
      <div className="issues-list">
        {analysis.danger.map((item, idx) => (
          <IngredientRow key={idx} item={item} status="danger" />
        ))}
        {analysis.warning && analysis.warning.map((item, idx) => (
          <IngredientRow key={idx} item={item} status="warning" />
        ))}
        {analysis.caution.map((item, idx) => (
          <IngredientRow key={idx} item={item} status="caution" />
        ))}
      </div>

      {/* Safe Message if clean */}
      {!hasIssues && (
         <Card className="section-safe">
           <div className="all-clear-message">
             <h3>✅ Nessun ingrediente problematico trovato!</h3>
             <p>Questo prodotto sembra sicuro per la Dermatite Seborroica basandosi sul nostro database.</p>
           </div>
         </Card>
      )}

      {/* Show All Toggle */}
      <div className="show-all-container">
        <button 
          className="btn-toggle-all"
          onClick={() => setShowAllIngredients(!showAllIngredients)}
        >
          {showAllIngredients ? 'Nascondi Lista Ingredienti' : 'Mostra Lista Ingredienti'}
        </button>
      </div>

      {/* Full List */}
      {showAllIngredients && (
        <Card title="📄 Analisi Completa Ingredienti" className="full-list-card">
          <div className="full-list-grid">
            {allIngredientsList.map((item, idx) => (
              <IngredientRow key={`all-${idx}`} item={item} status={item.status} />
            ))}
          </div>
        </Card>
      )}

      {/* Modal */}
      {selectedIngredient && (
        <IngredientModal 
          ingredient={selectedIngredient} 
          onClose={() => setSelectedIngredient(null)} 
        />
      )}
    </div>
  );
};

export default Results;
