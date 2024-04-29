import React from 'react'
import ExcerciseProgress from '../ExcerciseProgress/ExcerciseProgress'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DoughnutExerciseChart from '../../ExerciseChart/DoughnutExerciseChart';

const DailyStatus = ({className, icon,quantity ,unit, title}) => {
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
const style={
  
  // width:'16rem',
  // height:"16rem",
}
  const options = {
    // maintainAspectRatio: false,
    // responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: '오늘 운동 현황',
      },
    },
  };



      
  return (
    <ExcerciseProgress className={className} title={title} >
 
    {/* <FontAwesomeIcon icon={icon} size="3x" color="white" />

    <div className="exercise-contents" style={{ marginTop: '10px', fontSize: '20px', fontWeight: 'bold' }}>
      <span className="exercise-number">{quantity}</span><span className="exercise-unit">{unit}</span>
    </div> */}
      <DoughnutExerciseChart data={data} options={options} className={className} style={style}/>
  </ExcerciseProgress>
  )
  

    
  // return (
  //   <ExcerciseProgress className={className} title={title} >
 
  //   <FontAwesomeIcon icon={icon} size="3x" color="white" />

  //   <div className="exercise-contents" style={{ marginTop: '10px', fontSize: '20px', fontWeight: 'bold' }}>
  //     <span className="exercise-number">{quantity}</span><span className="exercise-unit">{unit}</span>
  //   </div>
  // </ExcerciseProgress>
  // )
}

export default DailyStatus