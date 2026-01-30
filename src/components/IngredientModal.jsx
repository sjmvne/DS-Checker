import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './IngredientModal.css';
import { useLanguage } from '../context/LanguageContext';
import { titleCase } from '../utils/formatters';
import { getRiskClass, getRiskLabelKey } from '../utils/riskUtils';
import Emoji from './Emoji';

const IngredientModal = ({ ingredient, onClose }) => {
  const { t } = useLanguage();

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

  // No longer needed to use hardcoded strings for badge labels, we can use translation keys if desired, 
  // or simply rely on the visual indicator + English text for now if the user wants strict translation of the badge logic.
  // However, the report said "modal-risk-badge risk-critical non tradotto".
  // So we need to translate the return value of getRiskLabel.
  
  // No longer needed to use hardcoded strings for badge labels, we can use translation keys if desired, 
  // or simply rely on the visual indicator + English text for now if the user wants strict translation of the badge logic.
  // However, the report said "modal-risk-badge risk-critical non tradotto".
  // So we need to translate the return value of getRiskLabel.
  
  // const { t } = useLanguage(); // DUPLICATE REMOVED

  // ... Wait checking top of file ...
  // IngredientModal.jsx imports React already. I need to add useLanguage import.
  // I will do that in a separate replacement chunk or handle it carefully.
  
  // Since I can't easily add the hook inside the component without adding the import first,
  // I will check if useLanguage is imported. It is NOT.
  // I will assume for this chunk I will modify the component to use `t`.
  
  const getRiskLabel = (riskLevel) => {
    if (!riskLevel) return '';
    const l = riskLevel.toUpperCase();
    // Simplified mapping to translation keys would be better
    if (l.includes('CRITICAL') || l.includes('CRITICO')) return t('results.status_badge.high_risk'); // "ALTO RISCHIO" / "HIGH RISK"
    if (l.includes('HIGH') || l.includes('ALTO')) return t('results.status_badge.high_risk');
    if (l.includes('LOW TO MODERATE')) return t('results.status_badge.medium');
    if (l.includes('MODERATO')) return t('results.status_badge.medium');
    if (l.includes('LOW') || l.includes('BASSO')) return t('results.status_badge.low_risk');
    if (l.includes('SAFE') || l.includes('SICURO')) return t('results.status_badge.safe');
    if (l.includes('WARNING') || l.includes('ATTENZIONE')) return t('results.status_badge.medium'); // Mapping warning to medium for badge text consistency
    return riskLevel;
  };



  const color = getRiskColor(ingredient.status);

  const modalContent = (
    <div className="modal-overlay glass" onClick={onClose}>
      <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          {ingredient.risk_level && (
            <span className={`db-risk-badge large ${getRiskClass(ingredient.risk_level)}`}>
              {t(getRiskLabelKey(ingredient.risk_level))}
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
                 <h3><Emoji name="File Folder" fallback="📂" /> {t('modal.profile_category', { 
                   category: ingredient.categoryKey 
                     ? t(`database.tabs.${ingredient.categoryKey}`, { defaultValue: ingredient.type || ingredient.category }) 
                     : (ingredient.type || ingredient.category)
                 })}</h3>
               </div>
               {ingredient.category_description && <p><strong>{t('modal.overview')}</strong> {ingredient.category_description}</p>}
               {ingredient.recommendation && <p><strong>{t('modal.recommendation')}</strong> {ingredient.recommendation}</p>}
               {ingredient.mechanism_explanation && <p><strong>{t('modal.mechanism')}</strong> {ingredient.mechanism_explanation}</p>}
               {ingredient.hydrolysis_rate && <p><strong>{t('modal.hydrolysis_rate')}</strong> {ingredient.hydrolysis_rate}</p>}
               {ingredient.cumulative_effect && <p><strong>{t('modal.cumulative_effect')}</strong> {ingredient.cumulative_effect}</p>}
            </div>
          )}

          
          {/* Tech Specs Section - Conditional */}
          {(ingredient.carbon_chain || ingredient.molecular_weight || ingredient.saturation || ingredient.ahr_activation_level || ingredient.malassezia_affinity || ingredient.hydrolysis_product) && (
            <div className="modal-section tech-specs">
               <h3><Emoji name="Microscope" fallback="🔬" /> {t('modal.scientific_profile')}</h3>
               <div className="tech-grid">
                 {ingredient.carbon_chain && (
                   <div className="tech-item">
                     <span className="tech-label">{t('modal.tech.chain_length')}</span>
                     <span className="tech-value">{ingredient.carbon_chain}</span>
                   </div>
                 )}
                 {ingredient.molecular_weight && (
                   <div className="tech-item">
                     <span className="tech-label">{t('modal.tech.mol_weight')}</span>
                     <span className="tech-value">{ingredient.molecular_weight}</span>
                   </div>
                 )}
                 {ingredient.saturation && (
                   <div className="tech-item">
                     <span className="tech-label">{t('modal.tech.saturation')}</span>
                     <span className="tech-value">{ingredient.saturation}</span>
                   </div>
                 )}
                 {ingredient.ahr_activation_level && (
                   <div className="tech-item full-width">
                     <span className="tech-label">{t('modal.tech.ahr_activation')}</span>
                     <span className="tech-value warning">{ingredient.ahr_activation_level}</span>
                   </div>
                 )}
                 {ingredient.malassezia_affinity && (
                   <div className="tech-item full-width">
                     <span className="tech-label">{t('modal.tech.malassezia_affinity')}</span>
                     <span className="tech-value warning">{ingredient.malassezia_affinity}</span>
                   </div>
                 )}
                 {ingredient.hydrolysis_product && (
                   <div className="tech-item full-width">
                     <span className="tech-label">{t('modal.tech.hydrolysis_byproduct')}</span>
                     <span className="tech-value">{ingredient.hydrolysis_product}</span>
                   </div>
                 )}
                 {ingredient.viscosity && (
                   <div className="tech-item full-width">
                     <span className="tech-label">{t('modal.tech.viscosity')}</span>
                     <span className="tech-value">{ingredient.viscosity}</span>
                   </div>
                 )}
               </div>
            </div>
          )}

          {/* Fatty Acid Composition Table (For Oils) */}
           {ingredient.fatty_acid_composition && (
            <div className="modal-section">
              <h3><Emoji name="Test Tube" fallback="🧪" /> {t('modal.tech.fatty_acid_profile')}</h3>
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
              <h3><Emoji name="Memo" fallback="📝" /> {t('modal.description')}</h3>
              <p className="modal-description">{ingredient.description}</p>
            </div>
          )}

          {/* Intelligent Deduplication of Reason/Mechanism */}
          {ingredient.reason && (
            <div className="modal-section">
              <h3><Emoji name="Warning" fallback="⚠️" /> {t('modal.why_problematic')}</h3>
              <p className="modal-reason">{ingredient.reason}</p>
            </div>
          )}

          {ingredient.marketing_deception && (
            <div className="modal-section warning-box">
              <h3><Emoji name="No Entry" fallback="🚫" /> {t('modal.marketing_warning')}</h3>
              <p>{ingredient.marketing_deception}</p>
            </div>
          )}

          {ingredient.mechanism && ingredient.mechanism !== ingredient.reason && (
            <div className="modal-section">
              <h3><Emoji name="DNA" fallback="🧬" /> {t('modal.mechanism')}</h3>
              <p className="modal-text">{ingredient.mechanism}</p>
            </div>
          )}

          {ingredient.products_containing && (
             <div className="modal-section">
               <h3><Emoji name="Lotion Bottle" fallback="🧴" /> {t('modal.common_sources')}</h3>
               <div className="tag-list">
                 {ingredient.products_containing.map(prod => (
                   <span key={prod} className="product-tag">{prod}</span>
                 ))}
               </div>
             </div>
          )}
          
          {ingredient.products_commonly_found && (
             <div className="modal-section">
               <h3><Emoji name="Lotion Bottle" fallback="🧴" /> {t('modal.commonly_found_in')}</h3>
               <p className="modal-text">{ingredient.products_commonly_found}</p>
             </div>
          )}

          {/* EXTENDED DATA MAPPING - CLINICAL CONTEXT */}
          {(ingredient.synergistic_effect || ingredient.sd_issue || ingredient.skin_reaction || ingredient.skin_effect || ingredient.concentration_risk || ingredient.oxidation_risk || ingredient.concentration_impact) && (
            <div className="modal-section warning-box">
               <h3><Emoji name="Warning" fallback="⚠️" /> {t('modal.clinical_context')}</h3>
               {ingredient.sd_issue && <p><strong>{t('modal.impact_ds')}</strong> {ingredient.sd_issue}</p>}
               {ingredient.synergistic_effect && <p><strong>{t('modal.synergistic_risk')}</strong> {ingredient.synergistic_effect}</p>}
               {ingredient.skin_reaction && <p><strong>{t('modal.reaction')}</strong> {ingredient.skin_reaction}</p>}
               {ingredient.skin_effect && <p><strong>{t('modal.skin_effect')}</strong> {ingredient.skin_effect}</p>}
               {ingredient.concentration_risk && <p><strong>{t('modal.risk_conc')}</strong> {ingredient.concentration_risk}</p>}
               {ingredient.concentration_impact && <p><strong>{t('modal.impact_conc')}</strong> {ingredient.concentration_impact}</p>}
               {ingredient.oxidation_risk && <p><strong>{t('modal.oxidation')}</strong> {ingredient.oxidation_risk}</p>}
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
               <h3><Emoji name="Alembic" fallback="⚗️" /> {t('modal.formulation_details')}</h3>
               <div className="tech-grid">
                 {ingredient.function && (
                   <div className="tech-item full-width">
                     <span className="tech-label">{t('modal.tech.function')}</span>
                     <span className="tech-value">{ingredient.function}</span>
                   </div>
                 )}
                 {ingredient.source && (
                   <div className="tech-item full-width">
                     <span className="tech-label">{t('modal.tech.source')}</span>
                     <span className="tech-value">{ingredient.source}</span>
                   </div>
                 )}
                  {ingredient.prevalence && (
                   <div className="tech-item full-width">
                     <span className="tech-label">{t('modal.tech.prevalence')}</span>
                     <span className="tech-value">{ingredient.prevalence}</span>
                   </div>
                 )}
                 {ingredient.concentration_typical && (
                   <div className="tech-item">
                     <span className="tech-label">{t('modal.tech.concentration_typical')}</span>
                     <span className="tech-value">{ingredient.concentration_typical}</span>
                   </div>
                 )}
                 {ingredient.concentration_limit && (
                   <div className="tech-item">
                     <span className="tech-label">{t('modal.tech.max_usage')}</span>
                     <span className="tech-value">{ingredient.concentration_limit}</span>
                   </div>
                 )}
               </div>
             </div>
          )}

          {/* KEY INSIGHTS / PARADOXES (New Section) */}
           {(ingredient.paradox || ingredient.unique_property || ingredient.dual_problem || ingredient.dual_risk || ingredient.research_citation) && (
             <div className="modal-section info-box" style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '15px' }}>
                <h3 style={{ color: '#60a5fa' }}><Emoji name="Light Bulb" fallback="💡" /> {t('modal.key_insights')}</h3>
                {ingredient.paradox && <p style={{marginBottom: '8px'}}><strong>{t('modal.paradox')}</strong> {ingredient.paradox}</p>}
                {ingredient.unique_property && <p style={{marginBottom: '8px'}}><strong>{t('modal.unique_property')}</strong> {ingredient.unique_property}</p>}
                {(ingredient.dual_problem || ingredient.dual_risk) && <p style={{marginBottom: '8px'}}><strong>{t('modal.dual_risk')}</strong> {ingredient.dual_problem || ingredient.dual_risk}</p>}
                {ingredient.research_citation && <p style={{fontSize: '0.85rem', fontStyle: 'italic', marginTop: '10px', opacity: 0.8}}>🎓 {t('modal.source_citation')} {ingredient.research_citation}</p>}
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
                <h3><Emoji name="Label" fallback="🏷️" /> {t('modal.also_known_as')}</h3>
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
              <h3><Emoji name="Check Mark Button" fallback="✅" /> {t('modal.safe_alternative')}</h3>
              <p className="modal-alternative">{ingredient.safe_alternative}</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="modal-btn" onClick={onClose}>{t('modal.close')}</button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default IngredientModal;
