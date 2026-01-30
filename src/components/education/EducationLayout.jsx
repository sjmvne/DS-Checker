import React, { useState } from 'react';
import Overview from './Overview';
import Science from './Science';
import Protocol from './Protocol';
import { useLanguage } from '../../context/LanguageContext';

const EducationLayout = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const { t } = useLanguage();

    const tabs = [
        { id: 'overview', label: 'Panoramica' }, // TODO: Internationalize later if needed, hardcoded to IT/Source for now
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 mb-2">
                    SD Intelligence
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Database educativo basato sulle più recenti ricerche dermatologiche (2026).
                </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 bg-white/50 backdrop-blur-sm p-2 rounded-xl border border-white/40 shadow-sm">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            activeTab === tab.id
                                ? 'bg-white text-blue-600 shadow-md ring-1 ring-black/5'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="min-h-[600px]">
                {renderContent()}
            </div>

            {/* Footer Note */}
            <div className="mt-12 text-center text-xs text-gray-400 border-t pt-8">
                <p>© 2026 SD Intelligence. Basato su studi dermatologici (Prohic, Gupta, Akaza). Non sostituisce il parere medico.</p>
            </div>
        </div>
    );
};

export default EducationLayout;
