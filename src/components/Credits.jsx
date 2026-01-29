import React from 'react';
import Card from './Card';

const Credits = () => {
  return (
    <div className="page-container fade-in center-content">
      <Card className="credits-card">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧴</h1>
          <h2 style={{ marginBottom: '0.5rem' }}>DS Checker</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Creato con ❤️ per la comunità DS</p>
          
          <div className="credits-divider"></div>
          
          <h3>Design & Sviluppo</h3>
          <p className="creator-name" style={{
            background: 'linear-gradient(45deg, #FFD700, #FFA500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '900',
            fontSize: '1.5rem',
            letterSpacing: '1px'
          }}>Simone Pepe</p>
          
          <div className="credits-divider"></div>

          <p>Grazie per utilizzare questo strumento.</p>
          <p>Spero ti aiuti a trovare i prodotti giusti per la tua pelle!</p>
        </div>
      </Card>
    </div>
  );
};

export default Credits;
