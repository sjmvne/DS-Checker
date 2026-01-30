import React, { useState } from 'react';
import Overview from './Overview';
import Science from './Science';
import Protocol from './Protocol';
import { useLanguage } from '../../context/LanguageContext';
import './Education.css';

const EducationLayout = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const { t } = useLanguage();

    const tabs = [
        { id: 'overview', label: 'Panoramica' }, 
        { id: 'science', label: 'Scienza & Meccanismi' },
        { id: 'protocol', label: 'Protocollo Pratico' }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <Overview />;
            case 'science': return <Science />;
            case 'protocol': return <Protocol />;
            default: return <Overview />;
        }
    };

    return (
        <div className="edu-container">
            <div className="edu-intro">
                <h1 className="edu-title">
                    SD Intelligence
                </h1>
                <p className="edu-subtitle">
                    Database educativo basato sulle più recenti ricerche dermatologiche (2026).
                </p>
            </div>

            {/* Navigation Tabs */}
            <div className="edu-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`edu-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="edu-content">
                {renderContent()}
            </div>

            {/* Footer Note */}
            <div style={{
                marginTop: '40px', 
                textAlign: 'center', 
                fontSize: '0.75rem', 
                color: 'var(--color-text-muted)', 
                borderTop: '1px solid var(--color-border)', 
                paddingTop: '20px'
            }}>
                <p>© 2026 SD Intelligence. Basato su studi dermatologici (Prohic, Gupta, Akaza). Non sostituisce il parere medico.</p>
            </div>
        </div>
    );
};

export default EducationLayout;
