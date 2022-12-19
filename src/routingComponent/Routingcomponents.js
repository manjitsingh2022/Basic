import { Layout } from 'antd'
import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router'
import LogIn from '../components/customSignIn/LogIn'
// import PrivateRoutePage from '../components/customSignIn/PrivateRoutePage'
import RegisterForm from '../components/customSignIn/RegisterForm'
import About from '../pages/about/About'
import CategoryUser from '../pages/category/CategoryUser'
import { Advertisement, Home } from '../pages/home'
// import Home from '../pages/category/Home'

const RoutingComponents = () => {
    // const RoleAccess = ({ roles = [] }) => {
    //     const user = JSON.parse(localStorage.getItem("userInfo"));
    //     return !roles.length || roles.includes(user?.role)
    //       ? <Outlet />
    //       : <Navigate to="/unauthorized" replace />;
    //   };
    return (
        <>
            <Routes>
                {/* <Route element={ <PrivateRoutePage/>}> */}
                {/* <Route path="/"  element={<Home />} /> */}
                <Route path="/"  element={<Home />} />
                <Route path="/advertisement"  element={<Advertisement />} />
                <Route path="/about"  element={<About />} />
                <Route path="/category"  element={<CategoryUser />} />
                {/* </Route> */}
                <Route path="/signup"  element={<RegisterForm />} />
                <Route path="/login"  element={<LogIn />} />
            </Routes>




            {/* <Route path="/" element={<Layout />}>
  <Route element={<RoleAccess roles={["user", "admin"]} />}>
    <Route path="/dashboard" element={<Dashboard />} />
  </Route>
  <Route element={<RoleAccess roles={["admin"]} />}>
    <Route path="/category" element={<CategoryUser />} />
  </Route>
</Route> */}
        </>
    )
}
export default RoutingComponents