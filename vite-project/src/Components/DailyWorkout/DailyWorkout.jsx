import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { faHandRock, faArrowsAltV, faRunning, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from 'react-bootstrap/ProgressBar';

import { faFire, faDroplet, faClock } from '@fortawesome/free-solid-svg-icons';
import ExcerciseProgress from '../ExcerciseProgress/ExcerciseProgress';
import DailyStatus from '../DailyStatus/DailyStatus';
import "./DailyWorkout.css"
const DailyWorkout = () => {
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

      
            <DailyStatus className="daily-status daily-calories" title="calories burnt" 
            icon={faFire} quantity={burnedCalories} unit="kcal"/>
 
 <ExcerciseProgress title="daily-statur" className="daily-water" style={commonStyle}>
          
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
