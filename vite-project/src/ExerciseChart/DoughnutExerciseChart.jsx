import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const DoughnutExerciseChart = ({ data, className }) => {
  const centerTextPlugin = {
    id: 'centerText',
    beforeDatasetsDraw(chart) {
      const { ctx } = chart;

      // 숫자 스타일 설정
      ctx.save();
      ctx.font = "bolder 30px sans-serif"; // 두껍게 설정
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
      ctx.fillText("80", centerX, centerY - 10); // 숫자 위치 조정

      // 'kcal' 스타일 설정
      ctx.font = "16px sans-serif"; // 얇게 설정
      ctx.fillStyle = "grey"; // 회색으로 설정
      ctx.fillText("kcal", centerX, centerY + 15); // 'kcal' 위치 조정

      ctx.restore();
    }
  };

  const options = {
    responsive: false,
    maintainAspectRatio: true,
    cutout: '80%', // 도넛 차트의 두께 조절
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: false,
        text: '오늘 운동 현황',
      },
    },
  };

  return (
    <>
      <Doughnut data={data} options={{...options}} plugins={[centerTextPlugin]} />
    </>
  );
};

export default DoughnutExerciseChart;
