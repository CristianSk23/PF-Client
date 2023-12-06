import React from 'react';
import { Pie } from 'react-chartjs-2';

const data = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['red', 'blue', 'yellow'],
      hoverBackgroundColor: ['red', 'blue', 'yellow'],
    },
  ],
};

const PieChart = () => {
  return (
    <div style={{ width: '1000px', height: '500px', marginLeft: "350px" }}>
          <Pie data={data} />
    </div>
  )
};

export default PieChart;