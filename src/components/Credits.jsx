import React from 'react';
import Card from './Card';
import Emoji from './Emoji';
import './Credits.css';

const Credits = () => {
  return (
    <div className="page-container fade-in center-content">
      <Card className="credits-card glass">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ marginBottom: '1rem' }}><Emoji name="Lotion Bottle" fallback="🧴" size="3rem" /></div>
          <h2 style={{ marginBottom: '0.5rem' }}>DS Checker</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
            Creato con <Emoji name="Red Heart" fallback="❤️" size="1em" /> per la comunità DS
          </p>
          
          <div className="credits-divider"></div>
          
          <div className="creator-section glass-panel">
            <div className="creator-avatar">
               <Emoji name="Artist Light Skin Tone" fallback="🧑🏻‍🎨" size="3.5em" />
            </div>
            <div className="creator-details">
               <span className="creator-label">Creato con passione da</span>
               <h3 className="creator-signature">Simone Pepe</h3>
               
               <div className="creator-socials">
                 <a href="https://instagram.com/sjmvne" target="_blank" rel="noopener noreferrer" className="social-link glass-hover">
                   <Emoji name="Camera with Flash" fallback="📸" size="1.2em" /> @sjmvne
                 </a>
               </div>
            </div>
          </div>
          
          <div className="credits-divider"></div>

          <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Grazie per utilizzare questo strumento.</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Spero ti aiuti a trovare i prodotti giusti per la tua pelle!</p>
        </div>
      </Card>
    </div>
  );
};

export default Credits;
