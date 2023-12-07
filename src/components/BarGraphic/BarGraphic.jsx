import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import 'chart.js/auto'; // Importa Chart.js
import 'react-chartjs-2'; // Importa react-chartjs-2

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 3, 5, 2, 3, 8],
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  maintainAspectRatio: true, // Desactiva el mantenimiento del aspecto
  responsive: true, // Hace que el gráfico sea responsive
};

const BarGraphics = ({data}) => {
  return(
  <div style={{ width: '1000px', height: '500px', marginLeft: "100px"}}>
    <Bar data={data} options={options} />
  </div>
)};

export default BarGraphics;