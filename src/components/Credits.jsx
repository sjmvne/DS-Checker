import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Card from './Card';
import Emoji from './Emoji';
import './Credits.css';

const Credits = () => {
  const { t } = useLanguage();

  return (
    <div className="page-container fade-in center-content">
      <Card className="credits-card glass">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ marginBottom: '1rem' }}><Emoji name="Lotion Bottle" fallback="🧴" size="3rem" /></div>
          <h2 style={{ marginBottom: '0.5rem' }}>{t('credits.title')}</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
            {t('credits.love_msg').replace('❤️', '')} <Emoji name="Red Heart" fallback="❤️" size="1em" /> {t('credits.love_msg').split('❤️')[1]}
          </p>
          
          <div className="credits-divider"></div>
          
          <div className="creator-section glass-panel">
            <div className="creator-avatar">
               <Emoji name="Artist Light Skin Tone" fallback="🧑🏻‍🎨" size="3.5em" />
            </div>
            <div className="creator-details">
               <span className="creator-label">{t('credits.created_by')}</span>
               <h3 className="creator-signature">Simone Pepe</h3>
               
               <div className="creator-socials">
                 <a href="https://instagram.com/sjmvne" target="_blank" rel="noopener noreferrer" className="social-link glass-hover">
                   <Emoji name="Camera with Flash" fallback="📸" size="1.2em" /> @sjmvne
                 </a>
               </div>
            </div>
          </div>
          
          <div className="credits-divider"></div>

          <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{t('credits.thanks')}</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{t('credits.hope')}</p>
        </div>
      </Card>
    </div>
  );
};

export default Credits;
