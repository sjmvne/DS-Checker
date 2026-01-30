import React from 'react';
import ReactDOM from 'react-dom';
import { useLanguage } from '../context/LanguageContext';
import Emoji from './Emoji';
import ReasoningLoader from './ReasoningLoader';
import './AiSearchPrompt.css';

const AiSearchPrompt = ({ isOpen, onClose, onConfirm, barcode, loading }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="ai-prompt-overlay fade-in">
      <div className="ai-prompt-card glass scale-in">
        <div className="ai-prompt-icon">
          <Emoji name="Thinking Face" fallback="🤔" />
        </div>
        <h3>{t('search.ai_prompt_modal.title')}</h3>
        <p dangerouslySetInnerHTML={{ 
          __html: t('search.ai_prompt_modal.text').replace('{barcode}', barcode) 
        }} />
        <p className="ai-prompt-sub" dangerouslySetInnerHTML={{
          __html: t('search.ai_prompt_modal.sub')
        }} />
        
        <div className="ai-prompt-actions">
          {loading ? (
             <ReasoningLoader />
          ) : (
            <>
              <button className="btn btn-secondary" onClick={onClose}>
                {t('search.ai_prompt_modal.btn_no')}
              </button>
              <button className="btn btn-ai" onClick={onConfirm}>
                <Emoji name="Sparkles" fallback="✨" /> {t('search.ai_prompt_modal.btn_yes')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AiSearchPrompt;
