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

const CryptoPriceChart = ({ prices, graphColor, name }) => {
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
    animation: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
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

  const first = prices[0]?.[1];
  const last = prices[prices.length - 1]?.[1];
  const summary = `${name} price history in USD, from ${first} to ${last}`;

  return <Line role="img" aria-label={summary} data={chartData} options={options} style={{ height: '100%', width: '100%' }} />;
};

export default CryptoPriceChart;