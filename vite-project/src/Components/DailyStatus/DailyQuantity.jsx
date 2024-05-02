import React from 'react'
import ExcerciseProgress from '../ExcerciseProgress/ExcerciseProgress'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DoughnutExerciseChart from '../../ExerciseChart/DoughnutExerciseChart';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import "./DailyQuantity.css"
const DailyQuantity = ({className, icon,data,goal,unit, title}) => {

  // 데이터 세트에서 첫 번째 데이터 배열의 합을 구합니다.
const total = data.datasets[0].data.reduce((acc, currentValue) => acc + currentValue, 0);
const style={
  
  // width:'16rem',
  // height:"16rem",
}
  

      
  return (
    <ExcerciseProgress className={className} title={title} >

         <DoughnutExerciseChart data={data} icon={icon}  className={className} style={style}/> 

    <div className="quantity-contents">
      <span className="exercise-number">{total}</span><span className="exercise-unit">{unit}</span><span className="exercise-slash">/</span><span className=" exercise-goal">{goal}</span>
    </div>
     
  </ExcerciseProgress>
  )
  
}
export default DailyQuantity