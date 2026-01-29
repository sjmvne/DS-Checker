import React from 'react';
import Card from './Card';
import './References.css';

const referencesData = {
  "Panoramica_e_Revisioni_Generali": [
    {
      title: "Seborrheic dermatitis and dandruff: A comprehensive review.",
      journal: "Journal of Clinical and Investigative Dermatology",
      year: "2015",
      key_finding: "Revisione completa di dermatite seborroica e forfora, coprendo eziologia, patogenesi e opzioni di trattamento."
    },
    {
      title: "Seborrheic dermatitis.",
      journal: "Dermatologic Clinics",
      year: "2004",
      key_finding: "Panoramica dettagliata della dermatite seborroica, incluse caratteristiche cliniche, diagnosi e strategie di gestione."
    },
    {
      title: "The role of sebaceous gland activity and scalp microfloral metabolism in the etiology of seborrheic dermatitis and dandruff.",
      journal: "Journal of Investigative Dermatology Symposium Proceedings",
      year: "2005",
      key_finding: "Esplorazione dell'interazione tra l'attività delle ghiandole sebacee e il metabolismo della microflora del cuoio capelluto nell'eziologia della dermatite seborroica e della forfora."
    },
    {
      title: "Malassezia‐associated skin diseases, the use of diagnostics and treatments.",
      journal: "Frontiers in Cellular and Infection Microbiology",
      year: "2020",
      key_finding: "Revisione del ruolo della Malassezia in varie malattie della pelle, metodi diagnostici e approcci terapeutici."
    }
  ],
  "Biologia_Malassezia_e_Metabolismo_Lipidico": [
    {
      title: "Distribution of Malassezia species in patients with different dermatological diseases.",
      journal: "Acta Dermatovenerologica Croatica",
      year: "2016",
      key_finding: "Studio sulla prevalenza e distribuzione di diverse specie di Malassezia in pazienti con diverse malattie dermatologiche."
    },
    {
      title: "Unraveling lipid metabolism in lipid-dependent pathogenic yeasts Malassezia spp.",
      journal: "Doctoral dissertation",
      year: "2017",
      key_finding: "Ricerca di dottorato che indaga le complesse vie del metabolismo lipidico nelle specie di Malassezia."
    },
    {
      title: "A study of the fatty acid metabolism of the yeast Pityrosporum ovale.",
      journal: "Journal of General Microbiology",
      year: "1968",
      key_finding: "Ricerca iniziale sui processi metabolici degli acidi grassi nel Pityrosporum ovale (ora Malassezia ovale)."
    },
    {
      title: "Growth requirements and lipid metabolism of Pityrosporum orbiculare.",
      journal: "Journal of Investigative Dermatology",
      year: "1979",
      key_finding: "Indagine sui requisiti specifici di crescita e sulle vie metaboliche lipidiche del Pityrosporum orbiculare."
    },
    {
      title: "Expression of lipases and phospholipases of Malassezia restricta in patients with seborrheic dermatitis.",
      journal: "Indian Journal of Dermatology",
      year: "2013",
      key_finding: "Studio sui livelli di espressione degli enzimi lipasi e fosfolipasi da Malassezia restricta in pazienti con dermatite seborroica."
    }
  ],
  "Patogenesi_Barriera_e_Immunità": [
    {
      title: "Presence of Malassezia hyphae is correlated with pathogenesis of seborrheic dermatitis.",
      journal: "Microbiology Spectrum",
      year: "2022",
      key_finding: "Ricerca che indica una correlazione tra la presenza di ife di Malassezia e i meccanismi patogenetici della dermatite seborroica."
    },
    {
      title: "An overview of the diagnosis and management of seborrheic dermatitis.",
      journal: "Dermatology Practical & Conceptual",
      year: "2022",
      key_finding: "Guida pratica alle strategie di diagnosi e gestione della dermatite seborroica."
    },
    {
      title: "Seborrheic dermatitis: Exploring the complex interplay with the skin barrier, immunity, and microbiome.",
      journal: "Experimental Dermatology",
      year: "2025",
      key_finding: "Ricerca futura che esplora le intricate relazioni tra dermatite seborroica, funzione barriera della pelle, risposte immunitarie e microbioma."
    },
    {
      title: "Seborrheic dermatitis revisited: Pathophysiology, diagnosis, and management.",
      journal: "American Journal of Clinical Dermatology",
      year: "2025",
      key_finding: "Revisione aggiornata su fisiopatologia, criteri diagnostici e approcci di gestione per la dermatite seborroica."
    },
    {
      title: "Cutaneous Malassezia: Commensal, pathogen, or protector?",
      journal: "Frontiers in Cellular and Infection Microbiology",
      year: "2021",
      key_finding: "Discussione sul ruolo sfaccettato della Malassezia cutanea, che varia da commensale a patogeno o addirittura protettivo."
    }
  ],
  "Protocolli_di_Trattamento": [
    {
      title: "Clinical and biochemical assessment of maintenance treatment in chronic recurrent seborrheic dermatitis.",
      journal: "Dermatology Research and Practice",
      year: "2014",
      key_finding: "Valutazione dell'efficacia dei trattamenti di mantenimento per la dermatite seborroica ricorrente cronica attraverso marcatori clinici e biochimici."
    },
    {
      title: "Modulating the skin mycobiome with probiotic-enriched oily suspension.",
      journal: "Microorganisms",
      year: "2024",
      key_finding: "Studio sull'uso di sospensioni oleose arricchite con probiotici per modulare il micobioma cutaneo come approccio terapeutico."
    },
    {
      title: "Nutrition, obesity, and seborrheic dermatitis: Systematic review.",
      journal: "JMIR Dermatology",
      year: "2023",
      key_finding: "Revisione sistematica che esplora le connessioni tra nutrizione, obesità e incidenza o gravità della dermatite seborroica."
    },
    {
      title: "Seborrhoeic dermatitis.",
      journal: "Cochrane Database of Systematic Reviews",
      year: "2012",
      key_finding: "Revisione Cochrane che riassume le prove per vari trattamenti della dermatite seborroica."
    }
  ]
};

const References = () => {
  return (
    <div className="page-container fade-in">
      <div className="ref-header">
        <h2>📚 Fonti Scientifiche & Bibliografia</h2>
        <p>
          Tutte le informazioni contenute in questa app sono basate sulla letteratura dermatologica peer-reviewed aggiornata al 2024.
        </p>
      </div>

      <div className="ref-content glass">
        {Object.entries(referencesData).map(([category, refs]) => (
          <div key={category} className="ref-section">
            <h3 className="ref-category-title">{category.replace(/_/g, ' ').toUpperCase()}</h3>
            <ul className="ref-list-styled">
              {refs.map((ref, i) => (
                <li key={i} className="ref-item">
                  <span className="ref-marker">📄</span>
                  <div className="ref-details">
                    <strong>{ref.title}</strong>
                    <span className="ref-journal">{ref.journal}, {ref.year}</span>
                    <p className="ref-snippet">{ref.key_finding}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
        
        <div style={{marginTop: '3rem', fontSize: '0.8rem', opacity: 0.7, borderTop: '1px solid var(--color-border)', paddingTop: '1rem', textAlign: 'center'}}>
          <p>Database Version: 1.1 | References verified: 2026-01-29</p>
        </div>
      </div>
    </div>
  );
};

export default References;
