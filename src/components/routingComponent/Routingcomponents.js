import React from 'react'
import { Route, Routes } from 'react-router'
import AboutFile from '../../pages/about'
import Home from '../../pages/home'

const Routingcomponets = () => {
    return (
        <>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<AboutFile />} />
            </Routes>
        </>
    )
}

export default Routingcomponets