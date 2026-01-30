import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useChartTheme } from '../../hooks/useChartTheme';
import { useLanguage } from '../../context/LanguageContext';
import SmartText from '../common/SmartText';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Science = () => {
    const themeOptions = useChartTheme();
    const { t } = useLanguage();

    const chartLabels = t('education.mechanisms.chart_inflammation.labels', { returnObjects: true });

    const chartData = {
        labels: Array.isArray(chartLabels) ? chartLabels : [],
        datasets: [
            {
                label: t('education.mechanisms.chart_inflammation.series_il6'),
                data: [100, 380], 
                backgroundColor: '#38BDF8'
            },
            {
                label: t('education.mechanisms.chart_inflammation.series_il8'),
                data: [100, 450],
                backgroundColor: '#F43F5E'
            }
        ]
    };

    const chartOptions = {
        ...themeOptions,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            ...themeOptions.plugins,
            legend: { 
                ...themeOptions.plugins?.legend,
                position: 'bottom',
            },
            title: { display: false }
        },
        scales: {
            y: {
                ...themeOptions.scales?.y,
                beginAtZero: true,
                title: { ...themeOptions.scales?.y?.title, display: true, text: t('education.mechanisms.chart_inflammation.y_axis') },
            },
            x: {
                ...themeOptions.scales?.x
            }
        }
    };

    const steps = t('education.mechanisms.cycle.steps', { returnObjects: true });
    
    return (
        <div className="edu-section">
            <div className="edu-header-card">
                <h2>{t('education.mechanisms.title')}</h2>
                <p>
                    <SmartText>{t('education.mechanisms.intro')}</SmartText>
                </p>
            </div>

            <div className="edu-grid-2">
                {/* Inflammation Chart */}
                <div className="edu-chart-wrapper" style={{display: 'flex', flexDirection: 'column'}}>
                    <div className="edu-chart-header">
                        <h3>{t('education.mechanisms.chart_inflammation.title')}</h3>
                        <p style={{fontSize: '0.75rem', color: 'var(--color-text-muted)'}}>{t('education.mechanisms.chart_inflammation.source')}</p>
                    </div>
                    
                    <div className="edu-chart-container" style={{flex: 1, minHeight: '300px'}}>
                        <Bar key={JSON.stringify(chartOptions)} data={chartData} options={chartOptions} />
                    </div>
                    
                    <div style={{marginTop: '1rem', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)', fontSize: '0.75rem', color: '#b91c1c'}}>
                        <strong>{t('education.mechanisms.chart_inflammation.interpretation')}</strong> <SmartText>{t('education.mechanisms.chart_inflammation.interpretation_text')}</SmartText>
                    </div>
                </div>

                {/* Vicious Cycle Diagram */}
                <div className="edu-stat-card">
                    <h3 style={{fontSize: '1.25rem', fontWeight: 700, marginBottom: '24px', color: 'var(--color-text)'}}>{t('education.mechanisms.cycle.title')}</h3>
                    
                    <div className="edu-cycle-list">
                        {Array.isArray(steps) && steps.map((step, index) => {
                             const stepColors = ['blue', 'red', 'orange', 'purple'];
                             return (
                                <div key={index} className="edu-cycle-item">
                                    <div className={`cycle-step ${stepColors[index % stepColors.length]}`}>{index + 1}</div>
                                    <h4 style={{fontWeight: 600, color: 'var(--color-text)'}}>{step.title}</h4>
                                    <p style={{fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '4px'}}><SmartText>{step.desc}</SmartText></p>
                                </div>
                             );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Science;
