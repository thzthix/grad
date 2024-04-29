import React ,{useContext}from 'react'
import SidebarContext from "../Contexts/SideBarContext"
import {
   CDBSidebar,
   CDBSidebarContent,
   CDBSidebarFooter,
   CDBSidebarHeader,
   CDBSidebarMenu,
   CDBSidebarMenuItem,
 } from 'cdbreact';
 import { NavLink } from 'react-router-dom';
 import "./sideBar.css"
const SideBar = () => {
  const { isSidebarOpen, setSidebarOpen } = useContext(SidebarContext);
  return (
   <div className="sidebar" style={{ height: '100vh', overflow: 'scroll initial' }}>
   <CDBSidebar textColor="#fff" backgroundColor="#333" toggled>
     <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" onClick={() => setSidebarOpen(!isSidebarOpen)}></i>}>
       <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
         HEALTH
       </a>
     </CDBSidebarHeader>

    

     <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink to="/dashboard" >
                            <CDBSidebarMenuItem icon="chart-line" iconSize="2rem" textFontSize="1rem" active>                   
                                대시보드
                            </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/dashboard" >
                            <CDBSidebarMenuItem icon="comments" iconSize="2rem" textFontSize="1rem">
                            커뮤니티
                            </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/dashboard" >
                            <CDBSidebarMenuItem icon="calendar" iconSize="2rem" textFontSize="1rem">
                           운동 일지
                            </CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>
      <CDBSidebarFooter>
    
     <NavLink to="/dashboard" >
     
      {/* <div className="image-holder"style={{ textAlign: 'center' }}>
     <Image src="https://randomuser.me/api/portraits/women/6.jpg" roundedCircle fluid />
     </div> */}
     <CDBSidebarMenuItem icon="gear" iconSize="2rem" textFontSize="1.2rem">
     {/* <Image src="https://randomuser.me/api/portraits/women/6.jpg" roundedCircle fluid /> */}
                            설정
                            </CDBSidebarMenuItem>
          </NavLink>
          </CDBSidebarFooter>
   </CDBSidebar>
 
 </div>
  )
}

export default SideBar