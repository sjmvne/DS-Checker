import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './IngredientModal.css';
import { titleCase } from '../utils/formatters';
import Emoji from './Emoji';

const IngredientModal = ({ ingredient, onClose }) => {
  if (!ingredient) return null;

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent scrolling on background
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const getRiskColor = (status) => {
    if (status === 'danger') return 'var(--color-danger)';
    if (status === 'warning') return 'var(--color-warning)';
    if (status === 'caution') return 'var(--color-caution)';
    return 'var(--color-success)';
  };

  const getRiskLabel = (riskLevel) => {
    if (!riskLevel) return '';
    const l = riskLevel.toUpperCase();
    if (l.includes('CRITICAL')) return 'CRITICO';
    if (l.includes('HIGH')) return 'ALTO';
    if (l.includes('LOW TO MODERATE')) return 'BASSO-MODERATO';
    if (l.includes('MODERATE')) return 'MODERATO';
    if (l.includes('LOW')) return 'BASSO';
    if (l.includes('SAFE')) return 'SICURO';
    if (l.includes('WARNING')) return 'ATTENZIONE';
    return riskLevel;
  };

  const getBadgeClass = (riskLevel) => {
    if (!riskLevel) return '';
    const level = riskLevel.toLowerCase();
    if (level.includes('low to moderate')) return 'risk-caution';
    if (level.includes('safe') || level.includes('low')) return 'risk-safe';
    if (level.includes('caution')) return 'risk-caution';
    if (level.includes('warning') || level.includes('medium')) return 'risk-warning';
    if (level.includes('high') || level.includes('critical') || level.includes('danger')) return 'risk-critical';
    return 'risk-warning'; // Default fallback
  };

  const color = getRiskColor(ingredient.status);

  const modalContent = (
    <div className="modal-overlay glass" onClick={onClose}>
      <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          {ingredient.risk_level && (
            <span className={`modal-risk-badge ${getBadgeClass(ingredient.risk_level)}`}>
              {getRiskLabel(ingredient.risk_level)}
            </span>
          )}
          <h2 className="modal-title">{titleCase(ingredient.name)}</h2>
          {/* True INCI Name Display */}
          {ingredient.inci && (
            <div className="modal-inci-box">
              <span className="inci-label">INCI:</span>
              <span className="inci-value">{ingredient.inci}</span>
            </div>
          )}
        </div>

        <div className="modal-body">
          {/* Category Context (Inherited) */}
          {(ingredient.category_description || ingredient.recommendation) && (
            <div className="modal-section category-context">
               <div className="context-header">
                 <h3><Emoji name="File Folder" fallback="📂" /> Profilo Categoria: {ingredient.type || ingredient.category}</h3>
               </div>
               {ingredient.category_description && <p><strong>Panoramica:</strong> {ingredient.category_description}</p>}
               {ingredient.recommendation && <p><strong>Raccomandazione:</strong> {ingredient.recommendation}</p>}
               {ingredient.mechanism_explanation && <p><strong>Meccanismo:</strong> {ingredient.mechanism_explanation}</p>}
               {ingredient.hydrolysis_rate && <p><strong>Tasso Idrolisi:</strong> {ingredient.hydrolysis_rate}</p>}
               {ingredient.cumulative_effect && <p><strong>Effetto Cumulativo:</strong> {ingredient.cumulative_effect}</p>}
            </div>
          )}

          {/* Tech Specs Section - Conditional */}
          {(ingredient.carbon_chain || ingredient.molecular_weight || ingredient.saturation || ingredient.ahr_activation_level || ingredient.malassezia_affinity || ingredient.hydrolysis_product) && (
            <div className="modal-section tech-specs">
               <h3><Emoji name="Microscope" fallback="🔬" /> Profilo Scientifico</h3>
               <div className="tech-grid">
                 {ingredient.carbon_chain && (
                   <div className="tech-item">
                     <span className="tech-label">Lungh. Catena</span>
                     <span className="tech-value">{ingredient.carbon_chain}</span>
                   </div>
                 )}
                 {ingredient.molecular_weight && (
                   <div className="tech-item">
                     <span className="tech-label">Peso Mol.</span>
                     <span className="tech-value">{ingredient.molecular_weight}</span>
                   </div>
                 )}
                 {ingredient.saturation && (
                   <div className="tech-item">
                     <span className="tech-label">Saturazione</span>
                     <span className="tech-value">{ingredient.saturation}</span>
                   </div>
                 )}
                 {ingredient.ahr_activation_level && (
                   <div className="tech-item full-width">
                     <span className="tech-label">Attivazione AhR (Infiammazione)</span>
                     <span className="tech-value warning">{ingredient.ahr_activation_level}</span>
                   </div>
                 )}
                 {ingredient.malassezia_affinity && (
                   <div className="tech-item full-width">
                     <span className="tech-label">Affinità Malassezia</span>
                     <span className="tech-value warning">{ingredient.malassezia_affinity}</span>
                   </div>
                 )}
                 {ingredient.hydrolysis_product && (
                   <div className="tech-item full-width">
                     <span className="tech-label">Sottoprodotto Idrolisi</span>
                     <span className="tech-value">{ingredient.hydrolysis_product}</span>
                   </div>
                 )}
                 {ingredient.viscosity && (
                   <div className="tech-item full-width">
                     <span className="tech-label">Viscosità</span>
                     <span className="tech-value">{ingredient.viscosity}</span>
                   </div>
                 )}
               </div>
            </div>
          )}

          {/* Fatty Acid Composition Table (For Oils) */}
          {ingredient.fatty_acid_composition && (
            <div className="modal-section">
              <h3><Emoji name="Test Tube" fallback="🧪" /> Profilo Acidi Grassi</h3>
              <div className="composition-grid">
                {Object.entries(ingredient.fatty_acid_composition).map(([key, value]) => (
                  <div key={key} className="composition-row">
                    <span>{key.replace(/_/g, ' ')}</span>
                    <span className="composition-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {ingredient.description && (
            <div className="modal-section">
              <h3><Emoji name="Memo" fallback="📝" /> Descrizione</h3>
              <p className="modal-description">{ingredient.description}</p>
            </div>
          )}

          {/* Intelligent Deduplication of Reason/Mechanism */}
          {ingredient.reason && (
            <div className="modal-section">
              <h3><Emoji name="Warning" fallback="⚠️" /> Perché Problematico</h3>
              <p className="modal-reason">{ingredient.reason}</p>
            </div>
          )}

          {ingredient.marketing_deception && (
            <div className="modal-section warning-box">
              <h3><Emoji name="No Entry" fallback="🚫" /> Avviso Marketing</h3>
              <p>{ingredient.marketing_deception}</p>
            </div>
          )}

          {ingredient.mechanism && ingredient.mechanism !== ingredient.reason && (
            <div className="modal-section">
              <h3><Emoji name="DNA" fallback="🧬" /> Meccanismo</h3>
              <p className="modal-text">{ingredient.mechanism}</p>
            </div>
          )}

          {ingredient.products_containing && (
             <div className="modal-section">
               <h3><Emoji name="Lotion Bottle" fallback="🧴" /> Fonti Comuni</h3>
               <div className="tag-list">
                 {ingredient.products_containing.map(prod => (
                   <span key={prod} className="product-tag">{prod}</span>
                 ))}
               </div>
             </div>
          )}
          
          {ingredient.products_commonly_found && (
             <div className="modal-section">
               <h3><Emoji name="Lotion Bottle" fallback="🧴" /> Comunemente Trovato In</h3>
               <p className="modal-text">{ingredient.products_commonly_found}</p>
             </div>
          )}

          {/* EXTENDED DATA MAPPING - CLINICAL CONTEXT */}
          {(ingredient.synergistic_effect || ingredient.sd_issue || ingredient.skin_reaction || ingredient.skin_effect || ingredient.concentration_risk || ingredient.oxidation_risk || ingredient.concentration_impact) && (
            <div className="modal-section warning-box">
               <h3><Emoji name="Warning" fallback="⚠️" /> Contesto Clinico</h3>
               {ingredient.sd_issue && <p><strong>Impatto DS:</strong> {ingredient.sd_issue}</p>}
               {ingredient.synergistic_effect && <p><strong>Rischio Sinergico:</strong> {ingredient.synergistic_effect}</p>}
               {ingredient.skin_reaction && <p><strong>Reazione:</strong> {ingredient.skin_reaction}</p>}
               {ingredient.skin_effect && <p><strong>Effetto Pelle:</strong> {ingredient.skin_effect}</p>}
               {ingredient.concentration_risk && <p><strong>Rischio Conc.:</strong> {ingredient.concentration_risk}</p>}
               {ingredient.concentration_impact && <p><strong>Impatto Conc.:</strong> {ingredient.concentration_impact}</p>}
               {ingredient.oxidation_risk && <p><strong>Ossidazione:</strong> {ingredient.oxidation_risk}</p>}
            </div>
          )}

          {/* DERMATOLOGICAL IMPACT (New Section) */}
          {(ingredient.skin_barrier_effect || ingredient.barrier_function_impact || ingredient.skin_penetration) && (
             <div className="modal-section">
               <h3><Emoji name="Shield" fallback="🛡️" /> Barriera & Penetrazione</h3>
               {ingredient.skin_barrier_effect && <p><strong>Effetto Barriera:</strong> {ingredient.skin_barrier_effect}</p>}
               {ingredient.barrier_function_impact && <p><strong>Impatto Funzione:</strong> {ingredient.barrier_function_impact}</p>}
               {ingredient.skin_penetration && <p><strong>Penetrazione:</strong> {ingredient.skin_penetration}</p>}
             </div>
          )}

          {/* EXTENDED DATA MAPPING - FORMULATION DETAILS */}
          {(ingredient.concentration_limit || ingredient.concentration_typical || ingredient.function || ingredient.source || ingredient.prevalence) && (
             <div className="modal-section">
               <h3><Emoji name="Alembic" fallback="⚗️" /> Dettagli Formulazione</h3>
               <div className="tech-grid">
                 {ingredient.function && (
                   <div className="tech-item full-width">
                     <span className="tech-label">Funzione</span>
                     <span className="tech-value">{ingredient.function}</span>
                   </div>
                 )}
                 {ingredient.source && (
                   <div className="tech-item full-width">
                     <span className="tech-label">Fonte</span>
                     <span className="tech-value">{ingredient.source}</span>
                   </div>
                 )}
                  {ingredient.prevalence && (
                   <div className="tech-item full-width">
                     <span className="tech-label">Prevalenza</span>
                     <span className="tech-value">{ingredient.prevalence}</span>
                   </div>
                 )}
                 {ingredient.concentration_typical && (
                   <div className="tech-item">
                     <span className="tech-label">Conc. Tipica</span>
                     <span className="tech-value">{ingredient.concentration_typical}</span>
                   </div>
                 )}
                 {ingredient.concentration_limit && (
                   <div className="tech-item">
                     <span className="tech-label">Max Uso</span>
                     <span className="tech-value">{ingredient.concentration_limit}</span>
                   </div>
                 )}
               </div>
             </div>
          )}

          {/* KEY INSIGHTS / PARADOXES (New Section) */}
          {(ingredient.paradox || ingredient.unique_property || ingredient.dual_problem || ingredient.dual_risk || ingredient.research_citation) && (
             <div className="modal-section info-box" style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '15px' }}>
                <h3 style={{ color: '#60a5fa' }}><Emoji name="Light Bulb" fallback="💡" /> Punti Chiave</h3>
                {ingredient.paradox && <p style={{marginBottom: '8px'}}><strong>Il Paradosso:</strong> {ingredient.paradox}</p>}
                {ingredient.unique_property && <p style={{marginBottom: '8px'}}><strong>Proprietà Unica:</strong> {ingredient.unique_property}</p>}
                {(ingredient.dual_problem || ingredient.dual_risk) && <p style={{marginBottom: '8px'}}><strong>Doppio Rischio:</strong> {ingredient.dual_problem || ingredient.dual_risk}</p>}
                {ingredient.research_citation && <p style={{fontSize: '0.85rem', fontStyle: 'italic', marginTop: '10px', opacity: 0.8}}>🎓 Fonte: {ingredient.research_citation}</p>}
             </div>
          )}

          {/* BENEFITS (For Safe Ingredients) */}
          {ingredient.benefits && (
             <div className="modal-section safe-box" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '15px' }}>
                <h3 style={{ color: '#34d399' }}><Emoji name="Sparkles" fallback="✨" /> Benefici</h3>
                <p>{ingredient.benefits}</p>
             </div>
          )}

          {/* COMMON NAMES */}
          {(ingredient.common_names || ingredient.also_listed_as) && (
             <div className="modal-section">
                <h3><Emoji name="Label" fallback="🏷️" /> Conosciuto Anche Come</h3>
                <p className="modal-text italic">
                  {Array.isArray(ingredient.common_names) ? ingredient.common_names.join(', ') : ingredient.common_names}
                  {Array.isArray(ingredient.also_listed_as) ? ingredient.also_listed_as.join(', ') : ingredient.also_listed_as}
                </p>
             </div>
          )}

          {/* CONSOLIDATED SOURCES SECTION */}
          {(ingredient.products_containing || ingredient.common_sources || ingredient.found_in_products || ingredient.sources || ingredient.products) && (
             <div className="modal-section">
               <h3><Emoji name="Lotion Bottle" fallback="🧴" /> Fonti Comuni</h3>
               <div className="tag-list">
                 {/* Helper to merge and render all source arrays/strings */}
                 {[
                    ingredient.products_containing,
                    ingredient.common_sources,
                    ingredient.found_in_products,
                    ingredient.sources,
                     ingredient.products
                 ].flat().filter(Boolean).map((src, idx) => {
                    // Split strings if they contain commas and aren't already fragmented
                    if (typeof src === 'string' && src.includes(',')) {
                        return src.split(',').map(s => <span key={idx+s} className="product-tag">{s.trim()}</span>);
                    }
                    return <span key={idx} className="product-tag">{src}</span>;
                 })}
               </div>
             </div>
          )}

          {ingredient.safe_alternative && (
            <div className="modal-section">
              <h3><Emoji name="Check Mark Button" fallback="✅" /> Alternativa Sicura</h3>
              <p className="modal-alternative">{ingredient.safe_alternative}</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="modal-btn" onClick={onClose}>Chiudi</button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default IngredientModal;
