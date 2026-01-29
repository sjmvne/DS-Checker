import React, { useState, useEffect } from 'react';
import Emoji from './Emoji';
import './Tutorial.css';

const Tutorial = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(0);

// ... existing useEffect ...

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('ds_tutorial_seen', 'true');
  };

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  const steps = [
    {
      emoji: <Emoji name="Waving Hand" fallback="👋" size="4rem" />,
      title: "Benvenuto su DS Checker",
      text: "L'assistente intelligente per chi soffre di Dermatite Seborroica. Scopri se i tuoi prodotti sono sicuri per la tua pelle."
    },
    {
      emoji: <Emoji name="Magnifying Glass Tilted Left" fallback="🔍" size="4rem" />,
      title: "Analizza i Prodotti",
      text: <>Usa lo Scanner <Emoji name="Camera with Flash" fallback="📷" size="1.2em" /> per i codici a barre o la Ricerca Manuale <Emoji name="Writing Hand" fallback="✍️" size="1.2em" /> per incollare la lista ingredienti (INCI). Analizziamo ogni componente contro il nostro database.</>
    },
    {
      emoji: <Emoji name="Brain" fallback="🧠" size="4rem" />,
      title: "Impara & Esplora",
      text: "Non solo analisi: consulta il Database completo, il Dizionario tecnico e i Protocolli scientifici dal menu per capire meglio la tua pelle."
    },
    {
      emoji: <Emoji name="Shield" fallback="🛡️" size="4rem" />,
      title: "Punteggio Sicurezza",
      text: (
        <div style={{ textAlign: 'left', display: 'inline-block' }}>
          <div><Emoji name="Check Mark Button" fallback="✅" size="1.2em" /> <strong>VERDE:</strong> Sicuro (Malassezia Safe)</div>
          <div><Emoji name="Warning" fallback="⚠️" size="1.2em" /> <strong>GIALLO:</strong> Attenzione (Rischio moderato)</div>
          <div><Emoji name="No Entry" fallback="🚫" size="1.2em" /> <strong>ROSSO:</strong> Da evitare (Nutre il fungo)</div>
        </div>
      )
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="tutorial-overlay fade-in">
      <div className="tutorial-card glass">
        <button className="tutorial-close" onClick={handleClose}>×</button>
        
        <div className="tutorial-content">
          <div className="tutorial-emoji">{steps[step].emoji}</div>
          <h2>{steps[step].title}</h2>
          <div className="tutorial-text">{steps[step].text}</div>
        </div>

        <div className="tutorial-actions">
          <div className="tutorial-dots">
            {steps.map((_, idx) => (
              <span key={idx} className={`dot ${idx === step ? 'active' : ''}`} />
            ))}
          </div>
          <button className="btn-tutorial-next" onClick={handleNext}>
            {step === steps.length - 1 ? "Iniziamo! 🚀" : "Avanti →"}
          </button>
        </div>
      </div>
    </div>
  );
};


// Define slides data outside component to avoid recreation
const slides = [1, 2, 3, 4]; // Dummy array for length check, content is in render

export default Tutorial;
