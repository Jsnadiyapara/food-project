import React from 'react'
import Sidebar from "./Sidebar.js";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <>
      <div className='row'>
      <div className='col-2'><Sidebar/></div>
      <div className='col '><Outlet/></div>

      </div>
    </>
 
  )
}

export default Layout