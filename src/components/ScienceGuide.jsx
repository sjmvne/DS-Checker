import React, { useState } from 'react';
import { fullDatabase } from '../services/ingredientDatabase';
import Emoji from './Emoji';
import './ScienceGuide.css';

const ScienceGuide = () => {
  const data = fullDatabase.mechanisms;
  const [activeTab, setActiveTab] = useState('malassezia');

  if (!data) return <div className="loading">Caricamento dati scientifici...</div>;

  const TabButton = ({ id, label, icon }) => (
    <button 
      className={`tab-btn ${activeTab === id ? 'active' : ''}`}
      onClick={() => setActiveTab(id)}
    >
      <span className="tab-icon">{icon}</span>
      <span className="tab-label">{label}</span>
    </button>
  );

  return (
    <div className="science-guide">
      <header className="science-header">
        <h1>Guida Scientifica</h1>
        <p className="subtitle">Comprendere i meccanismi della Dermatite Seborroica</p>
      </header>

      <div className="science-nav-container">
        <TabButton id="malassezia" icon={<Emoji name="Mushroom" fallback="🍄" />} label="Biologia Malassezia" />
        <TabButton id="barrier" icon={<Emoji name="Shield" fallback="🛡️" />} label="Barriera Cutanea" />
        <TabButton id="immune" icon={<Emoji name="Warning" fallback="⚠️" />} label="Sistema Immunitario" />
        <TabButton id="interactions" icon={<Emoji name="Alembic" fallback="⚗️" />} label="Effetto Cocktail" />
      </div>

      <div className="science-content animate-fade-in">
        
        {/* === SECTION 1: MALASSEZIA BIOLOGY === */}
        {activeTab === 'malassezia' && (
          <article className="science-article">
            <section className="intro-section">
              <h2>{data.malassezia_biology?.section_description}</h2>
              <div className="organisms-grid mobile-scroll">
                {data.malassezia_biology?.key_organisms?.map((org, idx) => (
                  <div key={idx} className="organism-card glass-panel">
                    <h3>{org.name}</h3>
                    <div className="org-stats">
                      <div className="stat-row">
                        <span className="label">Prevalenza:</span>
                        <span className="value">{org.prevalence_in_sd}</span>
                      </div>
                      {org.lipid_preference && (
                        <div className="stat-row">
                          <span className="label">Si nutre di:</span>
                          <span className="value highlight">{org.lipid_preference}</span>
                        </div>
                      )}
                      {org.growth_pattern && (
                         <div className="stat-row">
                          <span className="label">Crescita:</span>
                          <span className="value">{org.growth_pattern}</span>
                        </div>
                      )}
                    </div>
                    {org.virulence_factors && (
                      <div className="virulence-box">
                         <h4><Emoji name="Crossed Swords" fallback="⚔️" size="1.2em" /> Fattori di Virulenza</h4>
                         <ul className="virulence-list">
                           {org.virulence_factors.map((f, i) => <li key={i}>{f}</li>)}
                         </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="deep-dive-section">
              <div className="enzyme-mechanism glass-panel highlight-border">
                <h3><Emoji name="Test Tube" fallback="🧪" size="1.2em" /> Il Motore Lipasi (Specificità Enzimatica)</h3>
                <p><strong>Meccanismo:</strong> {data.malassezia_biology?.lipase_enzyme_specificity?.mechanism}</p>
                
                <div className="kinetics-grid">
                   <div className="kinetic-item">
                     <strong>Substrati Ottimali:</strong>
                     <p>{data.malassezia_biology?.lipase_enzyme_specificity?.optimal_substrates}</p>
                   </div>
                   <div className="kinetic-item">
                     <strong>Livello Km (Affinità):</strong>
                     <p>{data.malassezia_biology?.lipase_enzyme_specificity?.km_values}</p>
                   </div>
                   <div className="kinetic-item">
                     <strong>Vmax (Velocità):</strong>
                     <p>{data.malassezia_biology?.lipase_enzyme_specificity?.vmax_values}</p>
                   </div>
                </div>

                <div className="mechanism-details color-grid">
                  <div className="mech-item safe">
                    <h4><Emoji name="Check Mark Button" fallback="✅" size="1.2em" /> Inaccessibile (Sicuro)</h4>
                    <ul>
                      {data.malassezia_biology?.lipase_enzyme_specificity?.inaccessible_substrates.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                  <div className="mech-item danger">
                    <h4><Emoji name="Cross Mark" fallback="❌" size="1.2em" /> CIBO OTTIMALE (Evita!)</h4>
                    <p>{data.malassezia_biology?.lipase_enzyme_specificity?.optimal_substrates}</p>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="metabolism-deep-dive glass-panel">
               <h3><Emoji name="Microscope" fallback="🔬" size="1.2em" /> Approfondimento Metabolismo Acidi Grassi</h3>
               <p>{data.fatty_acid_metabolism_deep_dive?.section_description}</p>
               
               <div className="lipase-kinetics-details">
                  <h4>Cinetica Enzimatica</h4>
                  <ul>
                    {Object.entries(data.fatty_acid_metabolism_deep_dive?.lipase_kinetics || {}).map(([k,v]) => (
                      <li key={k}><strong>{k.replace(/_/g, ' ')}:</strong> {v}</li>
                    ))}
                  </ul>
               </div>

               <div className="hydrolysis-pathways">
                  <h4>Percorsi Idrolisi</h4>
                  {data.fatty_acid_metabolism_deep_dive?.hydrolysis_pathways?.map((path, i) => (
                    <div key={i} className="pathway-row">
                       <div className="path-input">{path.substrate}</div>
                       <div className="path-arrow"><Emoji name="Down Arrow" fallback="⬇️" /> {path.enzyme}</div>
                       <div className="path-output">{path.products}</div>
                       <div className="path-note">({path.timeline})</div>
                    </div>
                  ))}
               </div>
            </section>

            <section className="byproducts-section">
              <h3><Emoji name="X-Ray" fallback="☠️" size="1.2em" /> Sottoprodotti Tossici</h3>
              <p>{data.malassezia_biology?.metabolic_byproducts?.description}</p>
              <div className="byproducts-list">
                {data.malassezia_biology?.metabolic_byproducts?.products?.map((prod, idx) => (
                  <div key={idx} className="byproduct-card">
                    <div className="icon-header"><Emoji name="Radioactive" fallback="☢️" size="2em" /></div>
                    <h4>{prod.name}</h4>
                    <p className="source">Fonte: {prod.source}</p>
                    <p className="effect">{prod.inflammatory_effect}</p>
                    {prod.types && <div className="sub-tag">{prod.types.join(', ')}</div>}
                  </div>
                ))}
              </div>
            </section>
          </article>
        )}

        {/* === SECTION 2: BARRIER DYSFUNCTION === */}
        {activeTab === 'barrier' && (
          <article className="science-article">
            <h2>{data.barrier_dysfunction_mechanisms?.section_description}</h2>
            
            <section className="comparison-section">
              <div className="comparison-wrapper glass-panel">
                <div className="half healthy">
                  <h3><Emoji name="Check Mark Button" fallback="✅" size="1.2em" /> Barriera Sana</h3>
                  <ul>
                    {Object.entries(data.barrier_dysfunction_mechanisms?.stratum_corneum_structure?.normal_composition || {}).map(([k, v]) => (
                      <li key={k}>
                        <span className="comp-name">{k}</span>
                        <span className="comp-val">{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="half compromised">
                  <h3><Emoji name="Cross Mark" fallback="❌" size="1.2em" /> Compromessa da DS</h3>
                  <ul>
                    {Object.entries(data.barrier_dysfunction_mechanisms?.stratum_corneum_structure?.sd_compromised_composition || {}).map(([k, v]) => (
                      <li key={k}>
                        <span className="comp-name">{k}</span>
                        <span className="comp-val highlight">{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="pathways-flow">
              <h3>Come gli Ingredienti Rompono il Muro</h3>
              {data.barrier_dysfunction_mechanisms?.barrier_damage_pathways?.map((path, i) => (
                <div key={i} className="process-step glass-panel">
                  <div className="step-number">{i + 1}</div>
                  <div className="step-content">
                    <h4>{path.pathway}</h4>
                    <p><strong>Meccanismo:</strong> {path.mechanism}</p>
                    {(path.timeline || path.tewl_increase) && (
                      <div className="impact-tags">
                        {path.timeline && <span><Emoji name="Stopwatch" fallback="⏱️" /> {path.timeline}</span>}
                        {path.tewl_increase && <span className="danger-tag"><Emoji name="Droplet" fallback="💧" /> TEWL {path.tewl_increase}</span>}
                      </div>
                    )}
                    {path.malassezia_opportunity && <div className="consequence-box"><Emoji name="Warning" fallback="⚠️" /> {path.malassezia_opportunity}</div>}
                  </div>
                </div>
              ))}
            </section>

             <section className="tight-junctions glass-panel">
               <h3><Emoji name="Brick" fallback="🧱" size="1.2em" /> Rottura Giunzioni Strette</h3>
               <p>{data.barrier_dysfunction_mechanisms?.tight_junction_disruption?.description}</p>
               <div className="junction-consequence">
                  <strong>Conseguenza:</strong> {data.barrier_dysfunction_mechanisms?.tight_junction_disruption?.consequence}
               </div>
            </section>
          </article>
        )}

        {/* === SECTION 3: IMMUNE & INFLAMMATION === */}
        {activeTab === 'immune' && (
          <article className="science-article">
            <h2>{data.immune_dysregulation_in_sd?.section_description}</h2>
            
            <div className="immune-grid">
              <div className="cytokine-storm glass-panel danger-glow">
                <h3><Emoji name="Tornado" fallback="🌪️" size="1.2em" /> La Tempesta di Citochine (Th17)</h3>
                <div className="storm-levels">
                   {Object.entries(data.immune_dysregulation_in_sd?.immune_phenotype || {}).map(([k, v]) => (
                     <div key={k} className="cytokine-row">
                       <span className="cyto-name">{k.replace('_profile', '').toUpperCase()}</span>
                       <span className="cyto-desc">{v}</span>
                     </div>
                   ))}
                </div>
              </div>

              <div className="ahr-receptor glass-panel">
                <h3><Emoji name="Video Game" fallback="🎮" size="1.2em" /> L'Interruttore Principale (AhR)</h3>
                <p>{data.immune_dysregulation_in_sd?.aryl_hydrocarbon_receptor_ahr?.role}</p>
                <div className="alert-box">
                  <strong>Patologia:</strong> {data.immune_dysregulation_in_sd?.aryl_hydrocarbon_receptor_ahr?.sd_pathology}
                </div>
                <div className="level-box">Elevazione: {data.immune_dysregulation_in_sd?.aryl_hydrocarbon_receptor_ahr?.elevation_level}</div>
                <ul className="consequences-list">
                  {data.immune_dysregulation_in_sd?.aryl_hydrocarbon_receptor_ahr?.consequences?.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            </div>

            <section className="lipid-peroxidation">
              <h3><Emoji name="Fire" fallback="🔥" size="1.2em" /> Cascata Perossidazione Lipidica</h3>
              <p className="section-intro">{data.lipid_peroxidation_cascade?.section_description}</p>
              
              <div className="risky-fats glass-panel">
                 <h4>Acidi Grassi Insaturi a Rischio</h4>
                 <ul>
                    {Object.entries(data.lipid_peroxidation_cascade?.unsaturated_fatty_acids_at_risk || {}).map(([k,v]) => (
                      <li key={k}><strong>{k.replace(/_/g, ' ')}:</strong> {v}</li>
                    ))}
                 </ul>
              </div>

              <div className="cascade-visual">
                {data.lipid_peroxidation_cascade?.oxidation_products?.map((prod, i) => (
                  <div key={i} className="cascade-step">
                    <div className="step-circle">{i + 1}</div>
                    <div className="step-info">
                       <h4>{prod.name}</h4>
                       <p>{prod.formation}</p>
                       <span className="effect-badge">{prod.effect}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </article>
        )}

        {/* === SECTION 4: INTERACTIONS (COCKTAIL EFFECT) === */}
        {activeTab === 'interactions' && (
          <article className="science-article">
            <h2>{data.ingredient_interaction_matrix?.section_description}</h2>
            <p className="intro-text">Gli ingredienti sono raramente usati in isolamento. L'"Effetto Cocktail" spiega perché un prodotto con ingredienti "ok" può comunque causare un flare.</p>

            <div className="matrix-grid">
              {data.ingredient_interaction_matrix?.synergy_examples?.map((ex, i) => (
                <div key={i} className="synergy-card glass-panel pop-up">
                  <div className="synergy-header">
                     <span className="equation">{ex.combination}</span>
                  </div>
                  
                  <div className="math-visual">
                     <div className="math-row">
                       <span>Rischi Individuali:</span>
                       <strong>{ex.individual_risk || ex.individual_risks}</strong>
                     </div>
                     <div className="math-arrow">⬇️ SINERGIA ⬇️</div>
                     <div className="math-row total">
                       <span>RISCHIO TOTALE:</span>
                       <strong>{ex.synergistic_risk}</strong>
                     </div>
                  </div>

                  <div className="mechanism-box">
                    <strong>Perché?</strong> {ex.mechanism}
                  </div>
                  <div className="outcome-box">
                    <strong>Risultato:</strong> {ex.outcome}
                  </div>
                </div>
              ))}
            </div>

            <section className="scoring-system glass-panel">
              <h3><Emoji name="Bar Chart" fallback="📊" size="1.2em" /> Sistema Punteggio Severità</h3>
              <p>{data.risk_severity_scoring_system?.section_description}</p>
              <div className="score-legend">
                 {Object.entries(data.risk_severity_scoring_system?.score_interpretation || {}).map(([range, desc]) => (
                   <div key={range} className={`score-row ${desc.includes('SICURO') ? 'safe' : desc.includes('CRITICO') ? 'critical' : 'warning'}`}>
                     <span className="score-range">{range}</span>
                     <span className="score-desc">{desc}</span>
                   </div>
                 ))}
              </div>
            </section>

             <section className="research-summary">
               <h3><Emoji name="Books" fallback="📚" size="1.2em" /> Studi di Ricerca Chiave</h3>
               <div className="studies-grid">
                  {data.research_summary_table?.studies?.map((study, i) => (
                    <div key={i} className="study-card glass-panel">
                       <div className="study-citation">{study.citation}</div>
                       <div className="study-finding">"{study.finding}"</div>
                       <div className="study-imp"><Emoji name="Backhand Index Pointing Right" fallback="👉" /> {study.implication}</div>
                    </div>
                  ))}
               </div>
            </section>
          </article>
        )}

      </div>
    </div>
  );
};

export default ScienceGuide;
