import React from 'react'
import { Route, Routes } from 'react-router'
import LogIn from '../components/customSignIn/LogIn'
// import PrivateRoutePage from '../components/customSignIn/PrivateRoutePage'
import RegisterForm from '../components/customSignIn/RegisterForm'
import About from '../pages/about/About'
import CategoryUser from '../pages/category/CategoryUser'
import { Advertisement, Home } from '../pages/home'
// import Home from '../pages/category/Home'

const RoutingComponents = () => {
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
        </>
    )
}
export default RoutingComponents