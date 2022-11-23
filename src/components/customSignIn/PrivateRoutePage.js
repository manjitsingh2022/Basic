import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutePage = () => {
  
        const auth = localStorage.getItem('user');
  
    
  return (
    <>
 {   auth?<Outlet />:<Navigate to="/signup" />}
 {/* {   auth?<Outlet />:<Navigate to="/login" />} */}
    </>
  )
}

export default PrivateRoutePage