import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

// Enregistrement des composants de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const StockChart = ({ data }) => {
  if (!data || !data.vapes || !data.liquides || !data.accessoires) {
    return <p className="text-center mt-5">Chargement du graphique...</p>;
  }

  const labels = ['Vapes', 'Liquides', 'Accessoires'];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Quantité en Stock',
        data: [
          data.vapes.quantiteStock,
          data.liquides.quantiteStock,
          data.accessoires.quantiteStock
        ],
        backgroundColor: '#36A2EB'
      },
      {
        label: 'Quantité Vendue',
        data: [
          data.vapes.quantiteVendue,
          data.liquides.quantiteVendue,
          data.accessoires.quantiteVendue
        ],
        backgroundColor: '#FF6384'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`
        }
      }
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Statistiques des Produits</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StockChart;
