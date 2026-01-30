import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ProductCard = ({ title, tag, desc, sub, colorClass, bgClass, textClass, borderClass }) => (
    <div className={`product-card`}>
        <div className="product-header">
            <h4 className="product-title">{title}</h4>
            <span className={`product-tag ${bgClass || colorClass} ${textClass || 'text-white'}`}>{tag}</span>
        </div>
        <p style={{fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.4}}>{desc}</p>
        <div style={{marginTop: '12px', fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500, opacity: 0.8}}>{sub}</div>
    </div>
);

const FaqItem = ({ q, a }) => (
    <div className="faq-item">
        <h5 className="faq-question">
            <span>❓</span> {q}
        </h5>
        <p className="faq-answer">{a}</p>
    </div>
);

const Protocol = () => {
    const { t } = useLanguage();

    const safeProducts = t('education.safe_products', { returnObjects: true });
    const faqs = t('education.faq', { returnObjects: true });
    const myths = t('education.myths', { returnObjects: true });

    return (
        <div className="edu-section">
            <div className="edu-header-card">
                <h2>{t('education.protocol.title')}</h2>
                <p>
                    {t('education.protocol.intro')}
                </p>
            </div>

            <div className="edu-grid-offset">
                {/* Protocol Content */}
                <div style={{display: 'flex', flexDirection: 'column', gap: '32px'}}>
                    {/* Safe Products Grid */}
                    <section>
                        <h3 style={{fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '8px'}}>
                            <span>✅</span> {t('education.protocol.safe_products_title')}
                        </h3>
                        <div className="edu-grid">
                            {Array.isArray(safeProducts) && safeProducts.map((prod, index) => (
                                <ProductCard 
                                    key={index}
                                    title={prod.title}
                                    tag={prod.tag} 
                                    desc={prod.desc}
                                    sub={prod.sub}
                                    bgClass={prod.color}
                                    textClass="text-white"
                                />
                            ))}
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section>
                        <h3 style={{fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px', color: 'var(--color-text)'}}>
                            {t('education.protocol.faq_title')}
                        </h3>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                            {Array.isArray(faqs) && faqs.map((faq, index) => (
                                <FaqItem 
                                    key={index}
                                    q={faq.q}
                                    a={faq.a}
                                />
                            ))}
                        </div>
                    </section>
                </div>

                {/* Myths Sidebar */}
                <aside className="myths-sidebar">
                    <h3 className="myths-title">
                        <span>🚫</span> {t('education.protocol.myths_title')}
                    </h3>
                    <ul>
                        {Array.isArray(myths) && myths.map((myth, index) => (
                            <li key={index} className="myth-item">
                                <span className="myth-icon">✖</span>
                                <div className="myth-content">
                                    <strong>"{myth.title}"</strong>
                                    {myth.content}
                                </div>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>
        </div>
    );
};

export default Protocol;
