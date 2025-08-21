import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import './HealthChart.css';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

 export const HealthChart = ({ entries }) => {
  const data = {
    labels: entries.map(e => e.date),
    datasets: [
      { label: 'Calories', data: entries.map(e => e.calories), borderColor: 'red', fill: false },
      { label: 'Sleep (hrs)', data: entries.map(e => e.sleep), borderColor: 'blue', fill: false },
    ]
  };
   return (
    <div className="chart-container">
      <h2>Health Report</h2>
      <Line data={data} />
    </div>
  );
};

export default HealthChart;
