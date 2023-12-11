import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import 'chart.js/auto'; // Importa Chart.js
import 'react-chartjs-2'; // Importa react-chartjs-2
import styles from "./BarGraphic.module.css";

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
  maintainAspectRatio: false, // Desactiva el mantenimiento del aspecto
  responsive: true, // Hace que el gráfico sea responsive  style={{ width:"80%" ,maxWidth: "1000px", height:"60vh" }}
  aspectRatio: 5,
};

const BarGraphics = ({data, options}) => {
  return(
    <div className="d-flex justify-content-center">
<div className={styles.responsiveChartContainer}>
        <Bar data={data} options={options}  />
        </div>
    </div>
)};

export default BarGraphics;