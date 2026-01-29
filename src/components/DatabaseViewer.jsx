import React, { useState } from 'react';
import Card from './Card';
import Emoji from './Emoji';
import './DatabaseViewer.css';
import { fullDatabase } from '../services/ingredientDatabase';
import { titleCase } from '../utils/formatters';

const DatabaseViewer = () => {
  const [filter, setFilter] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  
  // Aggregate all items with metadata
  const getAllItems = () => {
    // ... (logic remains same as existing getAllItems, assumed preserved)
    const list = [];
    const addCategory = (catKey, type, defaultRisk) => {
      const category = fullDatabase.catalog[catKey];
      const items = category?.ingredients || [];
      items.forEach(item => {
        list.push({ 
          ...item, 
          type, 
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
             list.push({ ...item, type: 'Safe Alternative', risk_level: 'SAFE', categoryDesc: safeSection.category_description });
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
      const risk = (item.risk_level || '').toLowerCase();
      if (riskFilter === 'safe') matchesRisk = risk.includes('safe') || risk.includes('low');
      if (riskFilter === 'caution') matchesRisk = risk.includes('warning') || risk.includes('moderate');
      if (riskFilter === 'danger') matchesRisk = risk.includes('critical') || risk.includes('high');
    }

    return matchesSearch && matchesTab && matchesRisk;
  });

  const categories = ['Fatty Acid', 'Oil/Lipid', 'Ester', 'Ferment', 'Irritant', 'Polysorbate', 'Safe Alternative'];
  
  const categoryLabels = {
    'Fatty Acid': 'Acidi Grassi',
    'Oil/Lipid': 'Oli/Lipidi',
    'Ester': 'Esteri',
    'Ferment': 'Fermenti',
    'Irritant': 'Irritanti',
    'Polysorbate': 'Polisorbati',
    'Safe Alternative': 'Alternative Sicure'
  };

  const getRiskClass = (level) => {
    if (!level) return 'risk-caution';
    const l = level.toLowerCase();
    if (l.includes('low to moderate')) return 'risk-caution';
    if (l.includes('safe') || l.includes('low')) return 'risk-safe';
    if (l.includes('critical') || l.includes('high')) return 'risk-critical';
    return 'risk-warning';
  };

  const getRiskLabel = (level) => {
    if (!level) return 'SCONOSCIUTO';
    const l = level.toUpperCase();
    if (l.includes('CRITICAL')) return 'CRITICO';
    if (l.includes('HIGH')) return 'ALTO';
    if (l.includes('LOW TO MODERATE')) return 'BASSO-MODERATO';
    if (l.includes('MODERATE')) return 'MODERATO';
    if (l.includes('LOW')) return 'BASSO';
    if (l.includes('SAFE')) return 'SICURO';
    if (l.includes('WARNING')) return 'ATTENZIONE';
    return level;
  };

  return (
    <div className="page-container fade-in">
       <div className="db-header-section">
         <h2><Emoji name="File Cabinet" fallback="🗄️" /> Database Completo</h2>
         <p>Esplora gli oltre {allItems.length} ingredienti catalogati.</p>
         
         <div className="search-bar-wrapper" style={{position: 'relative'}}>
             <span style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 1}}>
                <Emoji name="Magnifying Glass Tilted Left" fallback="🔍" size="1.2em" />
             </span>
             <input 
               type="text" 
               placeholder="Cerca ingrediente (es. Coconut, Laureth...)" 
               value={filter}
               onChange={(e) => setFilter(e.target.value)}
               className="db-search glass"
               style={{paddingLeft: '40px', fontSize: '1em'}}
             />
         </div>

         <div className="db-controls">
           <div className="db-tabs">
             <button className={`db-tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>Tutti</button>
             {categories.map(cat => (
               <button key={cat} className={`db-tab ${activeTab === cat ? 'active' : ''}`} onClick={() => setActiveTab(cat)}>{categoryLabels[cat] || cat}</button>
             ))}
           </div>
           
           <select 
              className="risk-filter-select glass"
              value={riskFilter} 
              onChange={(e) => setRiskFilter(e.target.value)}
           >
             <option value="all">🛡️ Tutti i livelli di rischio</option>
             <option value="safe">✅ Solo Sicuri (SAFE/LOW)</option>
             <option value="caution">⚠️ Attenzione (MODERATE/WARNING)</option>
             <option value="danger">🚫 Da Evitare (HIGH/CRITICAL)</option>
           </select>
         </div>
       </div>

       <div className="db-stats">
          Trovati {filtered.length} risultati
       </div>

       <div className="db-grid">
         {filtered.map((item, idx) => {
           const isSafe = (item.risk_level || '').toLowerCase().includes('safe');
           const isCritical = (item.risk_level || '').toLowerCase().includes('critical');
           
           return (
            <Card key={idx} className={`db-card-mini ${isSafe ? 'safe-item' : ''} ${isCritical ? 'critical-item' : ''}`}>
              <div className="db-card-header">
                <span className="db-type-badge">{categoryLabels[item.type] || item.type}</span>
                <span className={`db-risk-badge ${getRiskClass(item.risk_level)}`}>
                  {getRiskLabel(item.risk_level)}
                </span>
              </div>
              <h4>{titleCase(item.name)}</h4>
              {item.inci && item.inci !== item.name && <p className="db-inci">{item.inci}</p>}
              
              <div className="db-meta-grid">
                {item.carbon_chain && (
                  <div className="meta-item">
                     <span className="meta-label">Chain</span>
                     <span>{item.carbon_chain}</span>
                  </div>
                )}
                 {item.molecular_weight && (
                  <div className="meta-item">
                     <span className="meta-label">Mol. Weight</span>
                     <span>{item.molecular_weight}</span>
                  </div>
                )}
              </div>

              <p className="db-desc">{item.mechanism || item.categoryDesc || item.reason || 'Dettagli nel database.'}</p>
            </Card>
           );
         })}
       </div>
       
       {filtered.length === 0 && (
         <div className="db-empty">
           <p>Nessun ingrediente trovato con i filtri correnti.</p>
         </div>
       )}
    </div>
  );
};

export default DatabaseViewer;
