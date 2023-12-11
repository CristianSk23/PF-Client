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

const PieChart = ({ data }) => {
  return (
    <div className="d-flex justify-content-center">
      <div style={{ width: "500px", height: '520px' }}>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default PieChart;