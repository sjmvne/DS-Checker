import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Emoji from './Emoji';
import SmartText from './common/SmartText';
import './Tutorial.css';

const Tutorial = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(0);

  // ... (useEffect remains same) ...
  useEffect(() => {
    const seen = localStorage.getItem('ds_tutorial_seen');
    if (!seen) {
      // Small delay to appear after generic loading
      setTimeout(() => setIsVisible(true), 1500);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('ds_tutorial_seen', 'true');
  };

  const handleNext = () => {
    if (step < 3) { // 4 steps total (0-3)
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  const steps = [
    {
      emoji: <Emoji name="Waving Hand" fallback="👋" size="4rem" />,
      title: t('tutorial.welcome_title'),
      text: <SmartText>{t('tutorial.welcome_text')}</SmartText>
    },
    {
      emoji: <Emoji name="Magnifying Glass Tilted Left" fallback="🔍" size="4rem" />,
      title: t('tutorial.analyze_title'),
      text: <> {t('tutorial.analyze_text').replace('📷', '').replace('✍️', '')} <Emoji name="Camera with Flash" fallback="📷" size="1.2em" /> / <Emoji name="Writing Hand" fallback="✍️" size="1.2em" /> </>
    },
    {
      emoji: <Emoji name="Brain" fallback="🧠" size="4rem" />,
      title: t('tutorial.learn_title'),
      text: <SmartText>{t('tutorial.learn_text')}</SmartText>
    },
    {
      emoji: <Emoji name="Shield" fallback="🛡️" size="4rem" />,
      title: t('tutorial.score_title'),
      text: (
        <div style={{ textAlign: 'left', display: 'inline-block' }}>
          <div><Emoji name="Check Mark Button" fallback="✅" size="1.2em" /> <strong>{t('tutorial.score_green').split(':')[0]}:</strong> {t('tutorial.score_green').split(':')[1]}</div>
          <div><Emoji name="Warning" fallback="⚠️" size="1.2em" /> <strong>{t('tutorial.score_yellow').split(':')[0]}:</strong> {t('tutorial.score_yellow').split(':')[1]}</div>
          <div><Emoji name="No Entry" fallback="🚫" size="1.2em" /> <strong>{t('tutorial.score_red').split(':')[0]}:</strong> {t('tutorial.score_red').split(':')[1]}</div>
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
            {step === steps.length - 1 ? t('tutorial.start_btn') : t('tutorial.next_btn')}
          </button>
        </div>
      </div>
    </div>
  );
};


// Define slides data outside component to avoid recreation
const slides = [1, 2, 3, 4]; // Dummy array for length check, content is in render

export default Tutorial;
