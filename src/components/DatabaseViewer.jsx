import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../hooks/useData';
import Card from './Card';
import Emoji from './Emoji';
import IngredientModal from './IngredientModal';
import IngredientRow from './IngredientRow';
import './DatabaseViewer.css';
import { titleCase } from '../utils/formatters';
import { getRiskClass, getRiskLabelKey } from '../utils/riskUtils';

const DatabaseViewer = () => {
  const { t } = useLanguage();
  const fullDatabase = useData();
  const [filter, setFilter] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [showLegend, setShowLegend] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  
  // Aggregate all items with metadata
  const getAllItems = () => {
    if (!fullDatabase || !fullDatabase.catalog) return [];
    
    // Direct array accumulation for performance
    const list = [];
    const addCategory = (catKey, type, defaultRisk) => {
      const category = fullDatabase.catalog[catKey];
      const items = category?.ingredients || [];
      items.forEach(item => {
        list.push({ 
          ...item, 
          type,
          categoryKey: catKey, 
          risk_level: item.risk_level || defaultRisk, 
          categoryDesc: category?.category_description 
        });
      });
    };

    addCategory('fatty_acids', 'Fatty Acid', 'CRITICAL');
    addCategory('lipids_and_oils', 'Oil/Lipid', 'CRITICAL');
    addCategory('esters_comprehensive', 'Ester', 'WARNING');
    addCategory('galactomyces_ferments_expanded', 'Ferment', 'CRITICAL');
    addCategory('high_sensitivity_ingredients_expanded', 'Irritant', 'HIGH');
    addCategory('polysorbates_expanded', 'Polysorbate', 'CRITICAL');
    
    const safeSection = fullDatabase.catalog['safe_alternatives_comprehensive'];
    if (safeSection) {
       const safeTypes = ['fatty_acids_safe', 'oils_safe', 'esters_safe', 'alcohols_safe', 'sugars_humectants_safe', 'cleansers_safe', 'humectants_safe', 'preservatives_safe', 'ph_buffers_safe'];
       safeTypes.forEach(subKey => {
          (safeSection[subKey] || []).forEach(item => {
             list.push({ 
               ...item, 
               type: 'Safe Alternative', 
               categoryKey: 'safe_alternative',
               risk_level: 'SAFE', 
               categoryDesc: safeSection.category_description 
             });
          });
       });
    }
    return list;
  };

  const allItems = getAllItems();

  const filtered = allItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(filter.toLowerCase()) || 
                          (item.inci && item.inci.toLowerCase().includes(filter.toLowerCase()));
    
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    
    let matchesRisk = true;
    if (riskFilter !== 'all') {
      const riskClass = getRiskClass(item.risk_level);
      if (riskFilter === 'safe') matchesRisk = riskClass === 'risk-safe' || riskClass === 'risk-low';
      if (riskFilter === 'caution') matchesRisk = riskClass === 'risk-caution';
      // High (warning) and Critical (critical) both go to Danger/Avoid
      if (riskFilter === 'danger') matchesRisk = riskClass === 'risk-critical' || riskClass === 'risk-warning' || riskClass === 'risk-high';
    }

    return matchesSearch && matchesTab && matchesRisk;
  });

  const categories = ['Fatty Acid', 'Oil/Lipid', 'Ester', 'Ferment', 'Irritant', 'Polysorbate', 'Safe Alternative'];
  
  // Use translations for category mapping if needed, or stick to hardcoded mapping logic but mapped to t() keys
  const categoryLabels = {
    'Fatty Acid': t('database.tabs.fatty_acid'),
    'Oil/Lipid': t('database.tabs.oil_lipid'),
    'Ester': t('database.tabs.ester'),
    'Ferment': t('database.tabs.ferment'),
    'Irritant': t('database.tabs.irritant'),
    'Polysorbate': t('database.tabs.polysorbate'),
    'Safe Alternative': t('database.tabs.safe_alternative')
  };

  return (
    <div className="page-container fade-in">
       <div className="db-header-section">
         <h2><Emoji name="File Cabinet" fallback="🗄️" /> {t('database.title')}</h2>
         <p>{t('database.subtitle').replace('{count}', allItems.length)}</p>
         
         <div className="search-bar-wrapper" style={{position: 'relative', display: 'flex', alignItems: 'center', gap: '10px', width: '100%', maxWidth: '700px'}}>
             <div style={{position: 'relative', flex: 1}}>
                 <span style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 1}}>
                    <Emoji name="Magnifying Glass Tilted Left" fallback="🔍" size="1.2em" />
                 </span>
                 <input 
                   type="text" 
                   placeholder={t('database.search_placeholder')}
                   value={filter}
                   onChange={(e) => setFilter(e.target.value)}
                   className="db-search glass"
                   style={{paddingLeft: '40px', fontSize: '1em', width: '100%', maxWidth: 'none'}}
                 />
             </div>
             
             <select 
                className="risk-filter-select glass"
                value={riskFilter} 
                onChange={(e) => setRiskFilter(e.target.value)}
                style={{minWidth: '100px'}}
             >
               <option value="all">{t('database.risk_filter.all')}</option>
               <option value="safe">{t('database.risk_filter.safe')}</option>
               <option value="caution">{t('database.risk_filter.caution')}</option>
               <option value="danger">{t('database.risk_filter.danger')}</option>
             </select>
         </div>

         <div className="db-controls">
           <div className="db-tabs">
             <button className={`db-tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>{t('database.tabs.all')}</button>
             {categories.map(cat => (
               <button key={cat} className={`db-tab ${activeTab === cat ? 'active' : ''}`} onClick={() => setActiveTab(cat)}>{categoryLabels[cat] || cat}</button>
             ))}
           </div>
         </div>
       </div>

       {showLegend && ReactDOM.createPortal(
         <div className="modal-overlay glass" onClick={() => setShowLegend(false)} style={{zIndex: 99999}}>
            <div className="modal-content glass" onClick={e => e.stopPropagation()} style={{maxWidth: '500px', maxHeight: '80vh', overflowY: 'auto'}}>
               <div className="modal-header">
                  <h3 className="modal-title" style={{fontSize: '1.4rem'}}><Emoji name="Bar Chart" fallback="📊" /> {t('database.legend.title')}</h3>
                  <button className="modal-close" onClick={() => setShowLegend(false)}>&times;</button>
               </div>
               
               <div className="modal-body" style={{paddingTop: '10px'}}>
                  <div className="legend-timeline">
                  <div className="timeline-track"></div>
                  
                  {/* SAFE (Blue) */}
                  <div className="timeline-item">
                     <span className="timeline-point safe"></span>
                     <div className="timeline-content risk-safe-bg">
                        <div className="timeline-header">
                           <span className="timeline-badge" style={{color: '#38bdf8', background: 'rgba(56, 189, 248, 0.15)'}}>{t('database.legend.safe.label')}</span>
                        </div>
                        <p className="timeline-desc">{t('database.legend.safe.desc')}</p>
                     </div>
                  </div>

                  {/* LOW (Green) */}
                  <div className="timeline-item">
                     <span className="timeline-point low"></span>
                     <div className="timeline-content risk-low-bg">
                        <div className="timeline-header">
                           <span className="timeline-badge" style={{color: '#34d399', background: 'rgba(52, 211, 153, 0.15)'}}>{t('database.legend.low.label')}</span>
                        </div>
                        <p className="timeline-desc">{t('database.legend.low.desc')}</p>
                     </div>
                  </div>

                  {/* MODERATE (Yellow) */}
                  <div className="timeline-item">
                     <span className="timeline-point caution"></span>
                     <div className="timeline-content risk-caution-bg">
                        <div className="timeline-header">
                           <span className="timeline-badge" style={{color: '#facc15', background: 'rgba(250, 204, 21, 0.15)'}}>{t('database.legend.moderate.label')}</span>
                        </div>
                        <p className="timeline-desc">{t('database.legend.moderate.desc')}</p>
                     </div>
                  </div>

                  {/* HIGH (Orange) */}
                  <div className="timeline-item">
                     <span className="timeline-point warning"></span>
                     <div className="timeline-content risk-warning-bg">
                        <div className="timeline-header">
                           <span className="timeline-badge" style={{color: '#fb923c', background: 'rgba(251, 146, 60, 0.15)'}}>{t('database.legend.high.label')}</span>
                        </div>
                        <p className="timeline-desc">{t('database.legend.high.desc')}</p>
                     </div>
                  </div>

                  {/* CRITICAL (Red) */}
                  <div className="timeline-item">
                     <span className="timeline-point critical"></span>
                     <div className="timeline-content risk-critical-bg">
                        <div className="timeline-header">
                           <span className="timeline-badge" style={{color: '#f87171', background: 'rgba(248, 113, 113, 0.15)'}}>{t('database.legend.critical.label')}</span>
                        </div>
                        <p className="timeline-desc">{t('database.legend.critical.desc')}</p>
                     </div>
                  </div>
               </div>
               </div>
               
               <div className="modal-footer">
                  <button className="modal-btn" onClick={() => setShowLegend(false)}>{t('modal.close')}</button>
               </div>
            </div>
         </div>,
         document.body
       )}

       <div className="db-stats" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '15px'}}>
          <span>{t('database.results_found').replace('{count}', filtered.length)}</span>
           <button 
             className="info-btn glass" 
             onClick={() => setShowLegend(true)}
             aria-label="Risk Legend"
             style={{padding: '5px 10px', width: 'auto', height: 'auto', borderRadius: '12px', fontSize: '0.8rem'}}
           >
             <Emoji name="Information" fallback="ℹ️" />
           </button>
       </div>

       <div className="db-grid">
         {filtered.map((item, idx) => {
           const riskClass = getRiskClass(item.risk_level);
           const isSafe = riskClass === 'risk-safe';
           const isCritical = riskClass === 'risk-critical';
           
            return (
             <IngredientRow 
               key={idx}
               item={item}
               status={
                 riskClass === 'risk-critical' ? 'critical' : 
                 riskClass === 'risk-high' ? 'high' :
                 riskClass === 'risk-warning' ? 'warning' : 
                 riskClass === 'risk-caution' ? 'caution' : 
                 riskClass === 'risk-safe' ? 'safe' : 
                 riskClass === 'risk-low' ? 'low' :
                 'low' // Default fallback
               }
               onClick={() => setSelectedIngredient(item)}
             />
            );
         })}
       </div>
       
       {filtered.length === 0 && (
         <div className="db-empty">
           <p>{t('database.empty')}</p>
         </div>
       )}

       {/* Ingredient Detail Modal */}
       {selectedIngredient && (
           <IngredientModal 
               ingredient={selectedIngredient} 
               onClose={() => setSelectedIngredient(null)} 
           />
       )}
    </div>
  );
};

export default DatabaseViewer;
