import React from 'react';
import Emoji from './Emoji';
import './AiSearchPrompt.css';

const AiSearchPrompt = ({ isOpen, onClose, onConfirm, barcode }) => {
  if (!isOpen) return null;

  return (
    <div className="ai-prompt-overlay fade-in">
      <div className="ai-prompt-card glass scale-in">
        <div className="ai-prompt-icon">
          <Emoji name="Thinking Face" fallback="🤔" />
        </div>
        <h3>Prodotto non trovato</h3>
        <p>
          Non abbiamo trovato il barcode <strong>{barcode}</strong> nel database standard.
        </p>
        <p className="ai-prompt-sub">
          Vuoi usare la nostra <strong>Intelligenza Artificiale</strong> per cercarlo su internet e analizzarlo?
        </p>
        
        <div className="ai-prompt-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            No, grazie
          </button>
          <button className="btn btn-ai" onClick={onConfirm}>
            <Emoji name="Sparkles" fallback="✨" /> Usa AI
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiSearchPrompt;
