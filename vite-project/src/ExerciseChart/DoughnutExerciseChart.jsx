import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { faFire, faDroplet, faClock } from '@fortawesome/free-solid-svg-icons';
import 'chart.js/auto';

const DoughnutExerciseChart = ({ data, icon, className }) => {
  // const centerTextPlugin = {
  //   id: 'centerText',
  //   beforeDatasetsDraw(chart) {
  //     const { ctx } = chart;

  //     // 숫자 스타일 설정
  //     ctx.save();
  //     ctx.font = "bolder 30px sans-serif"; // 두껍게 설정
  //     ctx.textAlign = "center";
  //     ctx.textBaseline = "middle";
  //     const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
  //     const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
  //     ctx.fillText("80", centerX, centerY - 10); // 숫자 위치 조정

  //     // 'kcal' 스타일 설정
  //     ctx.font = "16px sans-serif"; // 얇게 설정
  //     ctx.fillStyle = "grey"; // 회색으로 설정
  //     ctx.fillText("kcal", centerX, centerY + 15); // 'kcal' 위치 조정

  //     ctx.restore();
  //   }
  // };
  const hasDailyCalories = className.includes("daily-calories");

  const centerIconPlugin = {
    id: 'centerIcon',
    afterDatasetsDraw(chart) {
      const ctx = chart.ctx;
      
      // FontAwesome 아이콘을 사용하기 위한 설정
      ctx.font = '4rem FontAwesome'; // FontAwesome와 해당 아이콘 크기를 설정
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

          // 클래스 이름에 따라 아이콘의 색상 결정
    if (className.includes('daily-calories')) {
      ctx.fillStyle = '#FF6384'; // 예를 들어, 데일리 칼로리 클래스 있을 때 레드 컬러
    } else {
      ctx.fillStyle = '#36A2EB'; // 없을 때는 블루 컬러
    }
    
      
      // 차트 중앙 좌표 계산
      const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
  
      // 유니코드 'f043'로 해당 FontAwesome 아이콘 그리기
      // ctx.fillText('\uf043', centerX, centerY);
      ctx.fillText(icon, centerX, centerY);
      
      ctx.restore();
    }
  };


  const options = {
    // maintainAspectRatio: false,
    // responsive: true,
    responsive: false,
    aspectRatio: 1,
    borderWidth: 0,
    maintainAspectRatio: true,
    cutout: '80%', // 도넛 차트의 두께 조절
    plugins: {
      legend: hasDailyCalories
      ? {
        display: true,
        position: 'right', // "daily-calories"가 있을 경우 오른쪽에 표시
      }
      : {
        display: false, // 그렇지 않으면 표시하지 않음
      },
    },
  };
  

 

  return (
    <>
      <Doughnut data={data} options={options} plugins={[ centerIconPlugin]} />
    </>
  );
};

export default DoughnutExerciseChart;
