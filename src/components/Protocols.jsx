import React, { useState } from 'react';
import { fullDatabase } from '../services/ingredientDatabase';
import Emoji from './Emoji';
import './Protocols.css';

const ChecklistSection = ({ data }) => {
  const [checkedState, setCheckedState] = useState(
    new Array(data?.checklist?.length || 0).fill(false)
  );

  const handleOnChange = (position) => {
    const updated = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updated);
  };

  const count = checkedState.filter(Boolean).length;
  const total = checkedState.length;
  const progress = Math.round((count / total) * 100);

  return (
    <section className="proto-section">
      <h2 className="section-title"><Emoji name="Check Mark Button" fallback="✅" /> Checklist Sicurezza INCI</h2>
      <div className="checklist-wrapper glass-panel">
        <div className="checklist-intro">
          Controlla QUALSIASI prodotto con questa lista. Se spunti tutto, è sicuro.
        </div>
        
        <div className="checklist-progress">
           <div className="progress-bar-bg" style={{background: 'rgba(255,255,255,0.1)', height: '8px', borderRadius: '4px', marginBottom: '15px'}}>
             <div style={{width: `${progress}%`, background: 'var(--color-success)', height: '100%', borderRadius: '4px', transition: 'width 0.3s'}}></div>
           </div>
           <div style={{fontWeight: 'bold', marginBottom: '20px', textAlign: 'right'}}>
             {count} / {total} Selezionati ({progress}%)
           </div>
        </div>

        {data?.checklist?.map((item, i) => (
          <div 
            key={i} 
            className={`checklist-row ${checkedState[i] ? 'checked' : ''}`}
            onClick={() => handleOnChange(i)}
            style={{cursor: 'pointer'}}
          >
            <div className={`checkbox-custom ${checkedState[i] ? 'active' : ''}`}>
              {checkedState[i] && '✔'}
            </div>
            <label style={{cursor: 'pointer'}}>{item.replace('☐ ', '')}</label>
          </div>
        ))}
        <div className="score-box">
          <strong><Emoji name="Bar Chart" fallback="📊" /> Guida Punteggio:</strong> {data.scoring}
        </div>
      </div>
    </section>
  );
};

const Protocols = () => {
  const data = fullDatabase.protocols;
  const [activeSection, setActiveSection] = useState('brands');

  if (!data) return <div className="loading">Caricamento protocolli...</div>;

  const NavButton = ({ id, icon, label }) => (
    <button 
      className={`proto-tab ${activeSection === id ? 'active' : ''}`}
      onClick={() => setActiveSection(id)}
    >
      <span className="tab-icon">{icon}</span>
      <span className="tab-label">{label}</span>
    </button>
  );

  return (
    <div className="protocols-page">
      <header className="protocols-header">
        <h1><Emoji name="Books" fallback="📚" /> Protocolli Pratici</h1>
        <p className="subtitle">Guide operative per la cura quotidiana</p>
      </header>

      <div className="protocols-nav-container">
        <NavButton id="brands" icon={<Emoji name="Lotion Bottle" fallback="🧴" />} label="Marchi Sicuri" />
        <NavButton id="checklist" icon={<Emoji name="Check Mark Button" fallback="✅" />} label="Checklist" />
        <NavButton id="routine" icon={<Emoji name="Spiral  Calendar" fallback="📅" />} label="Routine" />
        <NavButton id="flare" icon={<Emoji name="Police Car Light" fallback="🚨" />} label="SOS Flare" />
        <NavButton id="alternatives" icon={<Emoji name="Counterclockwise Arrows Button" fallback="🔄" />} label="Sostituti" />
        <NavButton id="faq" icon={<Emoji name="Question Mark" fallback="❓" />} label="FAQ" />
      </div>

      <div className="protocols-content animate-fade-in">
        
        {/* === SECTION 1: SAFE BRANDS === */}
        {activeSection === 'brands' && (
          <section className="proto-section">
            <h2 className="section-title"><Emoji name="Trophy" fallback="🏆" /> {data.safe_brand_recommendations?.section_description}</h2>
            
            <div className="brands-category">
               <h3><Emoji name="Glowing Star" fallback="🌟" /> Raccomandazioni Premium</h3>
               <div className="brands-grid">
                {data.safe_brand_recommendations?.premium_brands?.map((brand, i) => (
                  <div key={i} className="brand-card glass-panel">
                    <div className="brand-header">
                      <h4>{brand.name}</h4>
                      <span className="price-badge">{brand.price_range}</span>
                    </div>
                    <div className="brand-tags">
                      <span className="tag category">{brand.category}</span>
                    </div>
                    <ul className="brand-features">
                      {brand.key_properties.map((prop, idx) => <li key={idx}>{prop}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="brands-avoid-section">
               <h3><Emoji name="No Entry" fallback="🚫" /> Marchi da EVITARE ASSOLUTAMENTE</h3>
               <div className="avoid-grid">
                 {data.safe_brand_recommendations?.brands_to_absolutely_avoid?.map((bad, k) => (
                   <div key={k} className="avoid-card">
                     <div className="avoid-header">
                       <h4>{bad.name}</h4>
                     </div>
                     <p className="avoid-reason">{bad.reason}</p>
                     <div className="avoid-risk">RISCHIO: {bad.risk}</div>
                   </div>
                 ))}
               </div>
            </div>
          </section>
        )}

        {/* === SECTION 2: CHECKLIST === */}
        {activeSection === 'checklist' && (
          <ChecklistSection data={data.quick_reference_safe_ingredient_checklist} />
        )}

        {/* === SECTION 3: ROUTINE === */}
        {activeSection === 'routine' && (
          <section className="proto-section">
             <h2 className="section-title"><Emoji name="Spiral Calendar" fallback="📅" /> Routine Giornaliera & Flare</h2>
             
             <div className="principles-box glass-panel">
               <h3><Emoji name="Raised Hand" fallback="✋" /> Principi Generali</h3>
               <ul className="principles-list">
                 {data.routine_recommendations?.general_principles?.map((p, i) => <li key={i}>{p}</li>)}
               </ul>
             </div>

             <div className="routines-grid">
               <div className="routine-card flare-mode">
                 <h3><Emoji name="Police Car Light" fallback="🚨" /> Protocollo Flare Acuto</h3>
                 <div className="phase-block">
                   <h4><Emoji name="Sun" fallback="☀️" /> Mattina</h4>
                   {data.routine_recommendations?.basic_routine_flare_protocol?.morning?.map((step, i) => (
                     <div key={i} className="routine-step">
                       <span className="step-num">{step.step}</span>
                       <div className="step-info">
                         <strong>{step.product}</strong>
                         <p>{step.reason}</p>
                       </div>
                     </div>
                   ))}
                 </div>
                 <div className="phase-block">
                   <h4><Emoji name="First Quarter Moon Face" fallback="🌙" /> Sera</h4>
                   {data.routine_recommendations?.basic_routine_flare_protocol?.evening?.map((step, i) => (
                     <div key={i} className="routine-step">
                       <span className="step-num">{step.step}</span>
                       <div className="step-info">
                         <strong>{step.product}</strong>
                         <p>{step.reason}</p>
                         {step.technique && <span className="tip"><Emoji name="Light Bulb" fallback="💡" /> {step.technique}</span>}
                       </div>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="routine-card maintenance-mode">
                 <h3><Emoji name="Shield" fallback="🛡️" /> Mantenimento</h3>
                 <div className="phase-block">
                   <h4>Piano</h4>
                   <ul className="maintenance-list">
                      {data.routine_recommendations?.maintenance_routine_remission?.evening?.map((s, i) => <li key={i}>{s}</li>)}
                   </ul>
                 </div>
               </div>
             </div>
          </section>
        )}

        {/* === SECTION 4: FLARE SOS === */}
        {activeSection === 'flare' && (
          <section className="proto-section">
             <h2 className="section-title"><Emoji name="Police Car Light" fallback="🚨" /> Tempistiche Gestione Flare</h2>
             <div className="timeline-container">
               
               <div className="timeline-phase urgent">
                 <div className="phase-marker">0-24h</div>
                 <h3>RISPOSTA IMMEDIATA</h3>
                 <div className="phase-cards">
                   {data.flare_management_protocol?.immediate_response_first_24h?.map((step, i) => (
                     <div key={i} className="action-card">
                       <div className="action-icon"><Emoji name="High Voltage" fallback="⚡" /></div>
                       <div className="action-content">
                         <strong>{step.action}</strong>
                         <p>{step.reason}</p>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="timeline-phase steady">
                 <div className="phase-marker">Giorni 2-7</div>
                 <h3>STABILIZZAZIONE</h3>
                 <div className="phase-cards">
                   {data.flare_management_protocol?.days_2_7_management?.map((step, i) => (
                     <div key={i} className="action-card">
                       <div className="action-icon"><Emoji name="Shield" fallback="🛡️" /></div>
                       <div className="action-content">
                         <strong>{step.action}</strong>
                         {step.frequency && <span className="freq-tag">{step.frequency}</span>}
                       </div>
                     </div>
                   ))}
                 </div>
               </div>

             </div>
          </section>
        )}

        {/* === SECTION 5: SUBSTITUTES === */}
        {activeSection === 'alternatives' && (
          <section className="proto-section">
             <h2 className="section-title"><Emoji name="Counterclockwise Arrows Button" fallback="🔄" /> Sostituti Sicuri</h2>
             <div className="alternatives-grid">
               {data.ingredient_substitutes_safe_alternatives?.substitution_table?.map((item, i) => (
                 <div key={i} className="substitute-card glass-panel">
                   <div className="comparison-row">
                     <div className="bad-col">
                       <span className="icon"><Emoji name="Cross Mark" fallback="❌" /></span>
                       <strong>{item.problematic_ingredient}</strong>
                     </div>
                     <div className="arrow-col">➔</div>
                     <div className="good-col">
                       <span className="icon"><Emoji name="Check Mark Button" fallback="✅" /></span>
                       <strong>{item.safe_alternative}</strong>
                     </div>
                   </div>
                   <div className="sub-details">
                     <p className="reason"><strong>Perché:</strong> {item.reason_avoided}</p>
                     {item.performance_comparison && <p className="note"><strong>Sensazione:</strong> {item.performance_comparison}</p>}
                   </div>
                 </div>
               ))}
             </div>
          </section>
        )}

        {/* === SECTION 6: FAQ === */}
        {activeSection === 'faq' && (
           <section className="proto-section">
             <h2 className="section-title"><Emoji name="Question Mark" fallback="❓" /> Miti Comuni & FAQ</h2>
             <div className="faq-grid">
               {data.faq_common_misconceptions?.questions?.map((q, i) => (
                 <div key={i} className="faq-card glass-panel">
                   <h3 className="faq-q">{q.q}</h3>
                   <div className="faq-a">
                     <span className="bool-badge">NO</span>
                     {q.a.replace('NO.', '').replace('NO -', '')}
                   </div>
                   {q.analogy && <div className="faq-extra"><Emoji name="Light Bulb" fallback="💡" /> {q.analogy}</div>}
                   {q.paradox && <div className="faq-extra"><Emoji name="Warning" fallback="⚠️" /> {q.paradox}</div>}
                 </div>
               ))}
             </div>
           </section>
        )}
        
      </div>
    </div>
  );
};


export default Protocols;
