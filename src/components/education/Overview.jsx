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

const Overview = () => {
  const themeOptions = useChartTheme();
  const { t } = useLanguage();

  const chartLabels = t('education.overview.chart.labels', { returnObjects: true });

  const chartData = {
    labels: Array.isArray(chartLabels) ? chartLabels : [],
    datasets: [{
      label: t('education.overview.chart.series_name'),
      data: [0, 5, 95, 85, 80, 90, 20],
      backgroundColor: [
        '#10B981', // C8 - Safe
        '#10B981', // C10 - Safe
        '#EF4444', // C12 - Extreme Danger
        '#F97316', // C14 - High Danger
        '#F97316', // C16 - High Danger
        '#EF4444', // C18 - Extreme Danger
        '#F59E0B'  // C24+ - Moderate
      ],
      borderRadius: 6,
    }]
  };

  // Merge theme options with specific chart config
  const chartOptions = {
    ...themeOptions,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      ...themeOptions.plugins,
      legend: { display: false },
      tooltip: {
        ...themeOptions.plugins?.tooltip,
        callbacks: {
          label: (context) => context.raw > 50 ? t('education.overview.chart.tooltip_high') : t('education.overview.chart.tooltip_low')
        }
      }
    },
    scales: {
      y: {
        ...themeOptions.scales?.y,
        beginAtZero: true,
        title: { ...themeOptions.scales?.y?.title, display: true, text: t('education.overview.chart.y_axis') },
        max: 100,
      },
      x: {
        ...themeOptions.scales?.x,
      }
    }
  };

  return (
    <div className="edu-section">
      <div className="edu-header-card">
        <h2>{t('education.overview.title')}</h2>
        <p>
            <SmartText>{t('education.overview.intro')}</SmartText>
        </p>
      </div>

      {/* Key Stats Cards - Removed colored borders as requested, cleaner look */}
      <div className="edu-grid">
        <div className="edu-stat-card">
            <div className="stat-label text-red">{t('education.overview.stats.enemy.label')}</div>
            <div className="stat-value">{t('education.overview.stats.enemy.value')}</div>
            <div className="stat-desc"><SmartText>{t('education.overview.stats.enemy.desc')}</SmartText></div>
            <p className="stat-sub"><SmartText>{t('education.overview.stats.enemy.sub')}</SmartText></p>
        </div>
        
        <div className="edu-stat-card">
            <div className="stat-label text-green">{t('education.overview.stats.safe.label')}</div>
            <div className="stat-value">{t('education.overview.stats.safe.value')}</div>
            <div className="stat-desc"><SmartText>{t('education.overview.stats.safe.desc')}</SmartText></div>
            <p className="stat-sub"><SmartText>{t('education.overview.stats.safe.sub')}</SmartText></p>
        </div>

        <div className="edu-stat-card">
            <div className="stat-label text-blue">{t('education.overview.stats.prevalence.label')}</div>
            <div className="stat-value">{t('education.overview.stats.prevalence.value')}</div>
            <div className="stat-desc">{t('education.overview.stats.prevalence.desc')}</div>
            <p className="stat-sub">{t('education.overview.stats.prevalence.sub')}</p>
        </div>
      </div>

      <div className="edu-chart-wrapper">
        <div className="edu-chart-header">
            <h3>{t('education.overview.chart.title')}</h3>
            <p style={{fontSize: '0.875rem', color: 'var(--color-text-muted)'}}>
                {t('education.overview.chart.subtitle')}
            </p>
        </div>
        <div className="edu-chart-container">
            <Bar key={JSON.stringify(chartOptions)} data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
