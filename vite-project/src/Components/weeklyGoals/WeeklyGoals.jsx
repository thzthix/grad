import React from 'react'
import DoughnutExerciseChart from '../../ExerciseChart/DoughnutExerciseChart';
import ExcerciseProgress from '../ExcerciseProgress/ExcerciseProgress';
const WeeklyGoals = () => {
    const data = {
        labels: ['PushUp', 'PullUp', 'Sit Up','Squat'],
        datasets: [
          {
            label: '주간 운동 현황',
            data: [20, 30, 40, 50], // 예시 데이터, 실제로는 사용자의 운동 데이터를 사용해야 합니다.
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
    
            ],
          },
        ],
      };
    // const style={
      
    //   width:'16rem',
    //   height:"16rem",
    // }
      const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '주간 운동 현황',
          },
        },
      };
    
      return <ExcerciseProgress className="weekly-progress">
        <DoughnutExerciseChart data={data} options={options}  style={{}}/>
      </ExcerciseProgress>
}

export default WeeklyGoals