import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { titleCase } from '../utils/formatters';
import Emoji from './Emoji';
import './IngredientRow.css';

const IngredientRow = ({ item, status, onClick }) => {
  const { t } = useLanguage();

  // Map status/risk to display class and label
  const getRiskDetails = (s) => {
    const statusMap = {
      'danger': { class: 'risk-critical', label: 'database.legend.critical.label' },
      'critical': { class: 'risk-critical', label: 'database.legend.critical.label' },
      'warning': { class: 'risk-warning', label: 'database.legend.high.label' }, // Orange = High in Legend
      'high': { class: 'risk-critical', label: 'database.legend.critical.label' }, // Red = Critical in Legend logic (Highest tier)
      'caution': { class: 'risk-caution', label: 'database.legend.moderate.label' },
      'moderate': { class: 'risk-caution', label: 'database.legend.moderate.label' },
      'safe': { class: 'risk-safe', label: 'database.legend.safe.label' },
      'low': { class: 'risk-low', label: 'database.legend.low.label' },
      'unknown': { class: 'risk-unknown', label: 'results.status_badge.unknown' }
    };

    // If s is 'caution', original code mapped it to 'low_risk' label (which says LOW RISK). 
    // If s is 'danger', original mapped to 'high_risk' (HIGH RISK).
    // If s is 'warning', original mapped to 'medium' (MEDIUM).
    
    // We should support both raw risk strings (low, moderate, high, critical) and result status (safe, caution, warning, danger).
    
    if (statusMap[s]) return statusMap[s];
    
    // Fallback logic
    if (s === 'caution') return { class: 'risk-caution', label: 'results.status_badge.low_risk' }; // Based on original
    
    return { class: 'risk-unknown', label: 'results.status_badge.unknown' };
  };

  const { class: badgeClass, label: badgeLabelKey } = getRiskDetails(status);

  return (
    <div 
      className={`ingredient-row row-${status}`} 
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="row-content">
        <span className="row-name">{titleCase(item.name)}</span>
        {(item.categoryKey || item.category || item.type) && (
          <span className="row-category">
            {item.categoryKey 
              ? t(`database.tabs.${item.categoryKey}`, { defaultValue: item.category }) 
              : (item.type || item.category)}
          </span>
        )}
      </div>
      <div className="row-badge">
        <span className={`db-risk-badge ${badgeClass}`}>
          {t(badgeLabelKey)}
        </span>
        <span className="info-icon"><Emoji name="Information" fallback="ℹ️" size="1em" /></span>
      </div>
    </div>
  );
};

export default IngredientRow;
