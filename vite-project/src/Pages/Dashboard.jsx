import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom'; // useNavigate import
import SidebarContext from '../Contexts/SideBarContext';
import UserProfile from '../Components/UserProfile/UserProfile';
import DailyWorkout from '../Components/DailyWorkout/DailyWorkout';
import WeeklyExerciseChart from '../Components/WeeklyExcerciseChart/WeeklyExerciseChart';
import WeeklyGoals from '../Components/weeklyGoals/WeeklyGoals';
import "./Dashboard.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Header from '../Components/Header/Header';


const Dashboard = () => {
  const {isSidebarOpen, setSidebarOpen} = useContext(SidebarContext); // 사이드바 상태
  const navigate = useNavigate(); // useNavigate hook 사용
  return (
    <Container fluid className="dashboard-profile-holder">
      

<Container  className='dashboard-holder'>
   {/* <Container fluid className="dashboard-holder"> */}
   <Header />

         <DailyWorkout />
      
  
         <WeeklyExerciseChart className={"weekly-chart"}/>

     
         <WeeklyGoals className={"weekly-progress"}/>


</Container>
<UserProfile />
    </Container>

    //  </Container>
  )
  //   <Container fluid className="dashboard-holder">

  //     <Row>
   
  //       <Col md={isSidebarOpen ? 6 : 8}>
       
  //         <Row>
  //           <Col>
  //             <DailyWorkout />
  //           </Col>
  //         </Row>
         
  //         <Row>
  //           <Col md={6}>
  //             <WeeklyExerciseChart />
  //           </Col>
  //           <Col md={6}>
  //             <WeeklyGoals />
  //           </Col>
  //         </Row>
  //       </Col>
      
  //       <Col md={isSidebarOpen ? 6 : 4}>
  //         <UserProfile />
  //       </Col>
  //     </Row>
  // </Container>
  // )
}

export default Dashboard