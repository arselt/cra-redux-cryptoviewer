import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const CryptoPriceChart = ({ prices, graphColor }) => {
  const chartData = {
    datasets: [{
      label: 'Price (USD)',
      data: prices.map(([timestamp, price]) => ({
        x: timestamp,
        y: price
      })),
      borderColor: graphColor,
      tension: 0.1
    }]
  };

  const options = {
    responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false
			}
		},
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        }
      },
      y: {
        beginAtZero: false
      }
    }
  };

  return <Line data={chartData} options={options} style={{ height: '100%', width: '100%' }} />;
};

export default CryptoPriceChart;