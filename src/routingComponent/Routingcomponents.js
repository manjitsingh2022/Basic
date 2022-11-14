import React from 'react'
import { Route, Routes } from 'react-router'
import LogIn from '../components/customSignIn/LogIn'
import About from '../pages/about/About'
import Home from '../pages/home/Home'

const RoutingComponents = () => {
    return (
        <>
            <Routes>
                <Route path="/"  element={<About />} />
                <Route path="/about"  element={<Home />} />
                <Route path="/login"  element={<LogIn />} />
            </Routes>
        </>
    )
}
export default RoutingComponents