import React from 'react'
import Signup from '../components/froms/Signup'
import Login from '../components/froms/Login'
import Home from '../components/pages/Home'
import { Route, Routes } from 'react-router-dom'
import NavBarUser from '../components/nav/NavBarUser'
import NavBarGuest from '../components/nav/NavBarGuest'


const GuestRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<NavBarGuest />}>
                <Route path='/' element={<Home />} />
                <Route path='signup' element={<Signup />} />
                <Route path='login' element={<Login />} />
                <Route path='*' element={<h1 className="text-center">404 not found</h1>} />
            </Route>
        </Routes>
    )
}

export default GuestRoutes