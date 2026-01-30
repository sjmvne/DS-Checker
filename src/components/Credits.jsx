import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Card from './Card';
import Emoji from './Emoji';
import './Credits.css';
import AppLogo from '../assets/logo.webp';

const PerplexityLogo = () => (
  <svg viewBox="0 0 24 24" className="tech-icon-svg" style={{ fill: 'currentColor' }}>
    <path d="M19.785 0v7.272H22.5V17.62h-2.935V24l-7.037-6.194v6.145h-1.091v-6.152L4.392 24v-6.465H1.5V7.188h2.884V0l7.053 6.494V.19h1.09v6.49L19.786 0zm-7.257 9.044v7.319l5.946 5.234V14.44l-5.946-5.397zm-1.099-.08l-5.946 5.398v7.235l5.946-5.234V8.965zm8.136 7.58h1.844V8.349H13.46l6.105 5.54v2.655zm-8.982-8.28H2.59v8.195h1.8v-2.576l6.192-5.62zM5.475 2.476v4.71h5.115l-5.115-4.71zm13.219 0l-5.115 4.71h5.115v-4.71z" />
  </svg>
);

const TechBadge = ({ name, icon, type }) => (
  <div className={`tech-badge glass ${type ? `tech-${type}` : ''}`}>
    <span className="tech-icon">{typeof icon === 'string' ? icon : icon}</span>
    <span className="tech-name">{name}</span>
  </div>
);

const Credits = () => {
  const { t } = useLanguage();

  return (
    <div className="page-container fade-in center-content">
      <Card className="credits-card glass-premium">
        
        {/* Header Section */}
        <div className="credits-header">
           <img src={AppLogo} alt="DS Checker Logo" className="credits-app-logo" />
           <h1 className="credits-title">
            DS<span className="credits-accent">Checker</span>
           </h1>
           <p className="app-version">v1.1.2</p>
        </div>

        <div className="credits-divider-soft"></div>

        {/* Creator Section */}
        <div className="creator-section">
          <p className="creator-subtitle">{t('credits.created_by')}</p>
          <div className="creator-profile glass-panel-interactive">
             <div className="avatar-container">
                <Emoji name="Man Technologist Light Skin Tone" fallback="👨🏻‍💻" size="3em" />
             </div>
             <div className="profile-info">
                <h3 className="profile-name gradient-text">Simone Pepe</h3>
                <a href="https://instagram.com/sjmvne" target="_blank" rel="noopener noreferrer" className="social-link-chip">
                   <Emoji name="Camera with Flash" size="1.2em" className="social-icon" /> 
                   <span>@sjmvne</span>
                </a>
             </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="tech-section">
           <h4><Emoji name="Hammer and Wrench" fallback="🛠️" /> {t('credits.tech_stack')}</h4>
           
           <div className="tech-category-label">{t('credits.tech.core')}</div>
           <div className="tech-grid">
              <TechBadge name="React 18" icon={<Emoji name="Atom Symbol" className="tech-icon-img" />} type="react" />
              <TechBadge name="Vite" icon={<Emoji name="High Voltage" className="tech-icon-img" />} type="vite" />
              <TechBadge name="PWA Ready" icon={<Emoji name="Mobile Phone" className="tech-icon-img" />} type="pwa" />
           </div>

           <div className="tech-category-label">{t('credits.tech.ai')}</div>
           <div className="tech-grid">
              <TechBadge name="Perplexity Sonar" icon={<PerplexityLogo />} type="perplexity" />
              <TechBadge name="Tesseract.js OCR" icon={<Emoji name="Magnifying Glass Tilted Left" className="tech-icon-img" />} type="tesseract" />
              <TechBadge name="Quagga2 Barcode" icon={<Emoji name="Camera with Flash" className="tech-icon-img" />} type="quagga" />
           </div>

           <div className="tech-category-label">{t('credits.tech.data')}</div>
           <div className="tech-grid">
              <TechBadge name="Chart.js" icon={<Emoji name="Chart Increasing" className="tech-icon-img" />} type="chartjs" />
              <TechBadge name="Render.com" icon={<Emoji name="Cloud with Lightning" className="tech-icon-img" />} type="render" />
              <TechBadge name="Fluent Emojis" icon={<Emoji name="Artist Palette" className="tech-icon-img" />} type="fluent" />
              <TechBadge name="GitHub Pages" icon={<Emoji name="Cloud" className="tech-icon-img" />} type="github" />
           </div>
        </div>

        <div className="credits-divider-soft"></div>

        {/* Disclaimer Section */}
        <div className="disclaimer-section">
           <h5><Emoji name="Robot" fallback="🤖" /> {t('credits.disclaimer_title')}</h5>
           <p>{t('credits.disclaimer_text')}</p>
        </div>

        <div className="footer-message">
           <p>{t('credits.thanks')}</p>
        </div>

      </Card>
    </div>
  );
};

export default Credits;
