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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Science = () => {
    const chartData = {
        labels: ['Controllo (Senza Lipidi)', 'Acido Oleico (C18:1)'],
        datasets: [
            {
                label: 'IL-6 (Citochina Infiammatoria)',
                data: [100, 380], 
                backgroundColor: '#38BDF8'
            },
            {
                label: 'IL-8 (Chemochina)',
                data: [100, 450],
                backgroundColor: '#F43F5E'
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom' },
            title: { display: false }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: '% Rispetto al controllo' }
            }
        }
    };

    return (
        <div className="animate-fade-in space-y-8">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Meccanismi Patologici</h2>
                <p className="text-gray-600 leading-relaxed">
                    Questa sezione analizza <em>perché</em> si verifica la dermatite seborroica. Non è solo "pelle secca"; 
                    è una complessa interazione infiammatoria. I grafici mostrano come specifici acidi grassi inneschino una tempesta di citochine.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Inflammation Chart */}
                <div className="bg-white/90 backdrop-blur rounded-xl shadow-md p-6 h-full flex flex-col">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Risposta Infiammatoria all'Acido Oleico</h3>
                    <p className="text-xs text-gray-500 mb-4">Studio: Akaza et al. (2012) - Aumento citochine vs controllo.</p>
                    
                    <div className="flex-grow min-h-[300px]">
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                    
                    <div className="mt-4 bg-red-50 p-3 rounded-lg border border-red-100 text-xs text-red-800">
                        <strong>Interpretazione:</strong> L'Acido Oleico (comune nell'olio d'oliva e nel sebo umano) provoca un aumento massiccio (300-400%) dei marcatori infiammatori IL-6 e IL-8.
                    </div>
                </div>

                {/* Vicious Cycle Diagram */}
                <div className="bg-white/90 backdrop-blur rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Il Ciclo Vizioso della DS</h3>
                    
                    <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                        <div className="relative">
                            <div className="absolute -left-8 bg-sky-100 text-sky-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">1</div>
                            <h4 className="font-semibold text-gray-800">Compromissione della Barriera</h4>
                            <p className="text-sm text-gray-600 mt-1">La barriera cutanea si indebolisce (genetica o stress), permettendo la penetrazione.</p>
                        </div>
                        
                        <div className="relative">
                            <div className="absolute -left-8 bg-red-100 text-red-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">2</div>
                            <h4 className="font-semibold text-gray-800">Alimentazione Lipidica</h4>
                            <p className="text-sm text-gray-600 mt-1">La Malassezia consuma lipidi C12-C24 (dal sebo o dai prodotti cosmetici sbagliati).</p>
                        </div>
                        
                        <div className="relative">
                            <div className="absolute -left-8 bg-amber-100 text-amber-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">3</div>
                            <h4 className="font-semibold text-gray-800">Rilascio Acidi Grassi Liberi</h4>
                            <p className="text-sm text-gray-600 mt-1">Il fungo rilascia acidi grassi insaturi irritanti sulla cute.</p>
                        </div>
                        
                        <div className="relative">
                            <div className="absolute -left-8 bg-purple-100 text-purple-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">4</div>
                            <h4 className="font-semibold text-gray-800">Risposta Immunitaria (AhR)</h4>
                            <p className="text-sm text-gray-600 mt-1">Attivazione recettori AhR ⮕ Infiammazione ⮕ Iperproliferazione cellulare (forfora).</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Science;
