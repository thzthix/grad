import React,{useContext} from 'react'
import SidebarContext from  "../Contexts/SideBarContext"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet } from 'react-router-dom';
import SideBar from '../Components/SideBar'
import "./MainLayout.css"
const MainLayout = () => {
  const { isSidebarOpen, setSidebarOpen } = useContext(SidebarContext);
  return (
    <div className='main-layout'        style={{
       gridTemplateColumns: isSidebarOpen ? "250px auto" : '80px auto'
    }}>
      
     <SideBar />
     <div className="outlet-wrapper">
     <Outlet />
     </div>
    </div>
  
  )
}

export default MainLayout