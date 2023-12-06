import React from 'react';
import { Line } from 'react-chartjs-2';

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

const LineGraph = () => {
  return (
    <div style={{ width: '1000px', height: '500px', marginLeft: "150px"}}>
        <Line data={data} options={options} />
    </div>
  )
};

export default LineGraph;