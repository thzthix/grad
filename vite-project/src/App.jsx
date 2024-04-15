import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"
import SideBar from './Components/SideBar';
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import { useState } from 'react';
import PushUp from './Pages/Pushup';
import Dashboard from './Pages/Dashboard';
function App() {

  
  const router=createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
       <Route index element={<Dashboard />} />
      {/* <Route path='*' element={<NotFoundPage/>}/> */}
  
    </Route>
    ))

return (
 <>
 <RouterProvider router={router}/>

 </>
)

  // return (
    // <div className='container-fluid bg-secondary min-vh-100'>      
    //   <div className='row'>         
    //     {toggle && <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>               
    //       <SideBar />           
    //     </div>}            
    //     <div className={`col ${toggle ? 'offset-4 offset-md-2' : ''}`}>                
    //       <Home Toggle={Toggle}/>           
    //     </div>      
    //   </div>   
    // </div>  
    
    // <>
        
    //  <Dashboard />
  
    {/* <PushUp /> */}
    // </>
  // );
}

export default App;

