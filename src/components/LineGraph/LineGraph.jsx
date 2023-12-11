import React from 'react';
import { Line } from 'react-chartjs-2';
import styles from "./LineGraph.module.css";

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 3, 5, 2, 3, 8],
      fill: false,
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
};

const LineGraph = ({data}) => {
  return (
    <div className="d-flex justify-content-center">
      <div className={styles.responsiveChartContainer}>
        {data && <Line data={data} options={options} />}
      </div>
    </div>
  )
};

export default LineGraph;