import React from 'react';
import { Bar } from 'react-chartjs-2';
import ExcerciseProgress from '../Components/ExcerciseProgress/ExcerciseProgress';
import 'chart.js/auto';

const ExerciseChart = ({ data, options, className }) => {
  return <ExcerciseProgress title={data.datasets[0].label} className={className}>
    <Bar data={data} options={options} />
  </ExcerciseProgress>
};

export default ExerciseChart;
