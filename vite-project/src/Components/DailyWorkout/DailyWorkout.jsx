import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { faHandRock, faArrowsAltV, faRunning, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from 'react-bootstrap/ProgressBar';

import { faFire, faDroplet, faClock } from '@fortawesome/free-solid-svg-icons';
import ExcerciseProgress from '../ExcerciseProgress/ExcerciseProgress';
import DailyQuantity from "../DailyStatus/DailyQuantity"
import "./DailyWorkout.css"
const DailyWorkout = () => {
  const data_kcal = {
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
  const data_water = {
    labels: ["intake","goal"],
    datasets: [
      {
        label: '오늘 물 섭취 현황',
        data: [60, 40], // 예시 데이터, 실제로는 사용자의 운동 데이터를 사용해야 합니다.
        backgroundColor: [
          '##36A2EB',
          '#D6D3CE',

        ],
     
       
      },
    ],
  };
  
  const burnedCalories = 66; // 사용자가 태운 칼로리
  const exercises = {
    pushUp: { done: 50, goal: 100, icon: faHandRock },
    pullUp: { done: 20, goal: 50, icon: faArrowsAltV },
    sitUp: { done: 80, goal: 100, icon: faRunning },
    squat: { done: 40, goal: 80, icon: faDumbbell }
  };
  const commonStyle={
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    maxHeight:"10rem"
  }

  return (
  
      <Container className="dailyworkout" >
        <h2>오늘의 운동</h2>
        <Container className="daily-contents-holder">

      
            <DailyQuantity className="daily-status daily-calories" data={data_kcal} title="calories burnt" 
             icon={'\uf06d'} goal={"1382"} unit="kcal"/>
 
 <DailyQuantity className="daily-status daily-water" data={data_water} title="Water Intake" 
            icon={'\uf043'} goal={"1000"} unit="mL"/>
 
          <ExcerciseProgress title="Today's goals" className="dailyprogress-status" style={commonStyle}>
     <ul className='goals-holder'>
            <li className='goal'>
              푸쉬업 <span className='goal-status'>10회</span>
              <ProgressBar now={60} />
              </li>
            <li className='goal'>
              스쿼트 <span className='goal-status'>10회</span>
              <ProgressBar now={60} />
              </li>
            <li className='goal'>
              풀업 <span className='goal-status'>10회</span>
              <ProgressBar now={60} />
              </li>
            <li className='goal'>
              싯업 <span className='goal-status'>10회</span>
              <ProgressBar now={60} />
              </li>
          </ul>
       
 </ExcerciseProgress>


 </Container>
      </Container>
 
  );
}

export default DailyWorkout;
