import { useTheme } from './useTheme';
import { useEffect, useState } from 'react';

export const useChartTheme = () => {
    const { theme } = useTheme();
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        // Define colors explicitly based on theme to ensure immediate and correct update
        const isDark = theme === 'dark';
        
        const textColor = isDark ? '#f3f4f6' : '#1f2937';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
        const tooltipBg = isDark ? 'rgba(30, 30, 50, 0.95)' : 'rgba(255, 255, 255, 0.95)';
        const tooltipText = isDark ? '#fff' : '#1f2937';
        const borderColor = isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)';

        setChartOptions({
            plugins: {
                legend: {
                    labels: { color: textColor }
                },
                title: { color: textColor },
                tooltip: {
                    backgroundColor: tooltipBg,
                    titleColor: tooltipText,
                    bodyColor: tooltipText,
                    borderColor: borderColor,
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true
                }
            },
            scales: {
                y: {
                    ticks: { color: textColor },
                    grid: { color: gridColor },
                    title: { color: textColor }
                },
                x: {
                    ticks: { color: textColor },
                    grid: { display: false }
                }
            }
        });
    }, [theme]);

    return chartOptions;
};
