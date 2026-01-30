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

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Overview = () => {
  const chartData = {
    labels: ['C8 (Caprilico)', 'C10 (Caprico)', 'C12 (Laurico)', 'C14 (Miristico)', 'C16 (Palmitico)', 'C18 (Oleico)', 'C24+'],
    datasets: [{
      label: 'Potenziale di Crescita Malassezia',
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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => context.raw > 50 ? 'RISCHIO ALTO: Cibo per Malassezia' : 'RISCHIO BASSO: Sicuro'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Attività Metabolica Fungina' },
        max: 100
      }
    }
  };

  return (
    <div className="animate-fade-in space-y-8">
      {/* Intro Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/50 to-teal-100/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 relative z-10">Comprendere la Dermatite Seborroica</h2>
        <p className="text-gray-600 leading-relaxed relative z-10">
            Benvenuti nel database interattivo. Questa sezione offre una sintesi visiva immediata del meccanismo principale della patologia: 
            l'interazione tra i lipidi specifici e la <em>Malassezia</em>. La chiave per la remissione risiede nella 
            comprensione della lunghezza della catena di carbonio degli acidi grassi.
        </p>
      </div>

      {/* Key Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/90 backdrop-blur rounded-xl p-6 shadow-sm border-l-4 border-red-500 hover:shadow-md transition-shadow">
            <div className="text-xs font-semibold text-red-500 uppercase tracking-wide">Nemico #1</div>
            <div className="mt-2 text-3xl font-bold text-gray-800">C12 - C24</div>
            <div className="mt-1 text-gray-500 text-sm">Lunghezza Catena</div>
            <p className="mt-4 text-xs text-gray-400">La "zona di alimentazione" preferita dalla Malassezia.</p>
        </div>
        
        <div className="bg-white/90 backdrop-blur rounded-xl p-6 shadow-sm border-l-4 border-emerald-500 hover:shadow-md transition-shadow">
            <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Alternativa Sicura</div>
            <div className="mt-2 text-3xl font-bold text-gray-800">MCT C8/C10</div>
            <div className="mt-1 text-gray-500 text-sm">Olio Trigliceridi Medi</div>
            <p className="mt-4 text-xs text-gray-400">Non metabolizzabile dal fungo. Sicuro al 100%.</p>
        </div>

        <div className="bg-white/90 backdrop-blur rounded-xl p-6 shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow">
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Prevalenza Malassezia</div>
            <div className="mt-2 text-3xl font-bold text-gray-800">90%+</div>
            <div className="mt-1 text-gray-500 text-sm">Umani Colonizzati</div>
            <p className="mt-4 text-xs text-gray-400">Il problema non è la presenza, ma la proliferazione.</p>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
        <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">La Scienza delle Catene di Carbonio</h3>
            <p className="text-sm text-gray-500">
                Questo grafico illustra quali oli e acidi grassi nutrono la Malassezia in base alla loro struttura molecolare.
            </p>
        </div>
        <div className="h-[300px] md:h-[400px] w-full">
            <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
