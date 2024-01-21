import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Logout from '../components/auth/Logout'
import Home from '../components/pages/Home'
import NavBarUser from '../components/nav/NavBarUser'
import MyConnections from '../components/pages/MyConnections'

const UserRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<NavBarUser />}>
                <Route path='/' element={<Home />} />
                <Route path='logout' element={<Logout />} />
                <Route path='myConnections' element={<MyConnections />} />
                <Route path='*' element={<h1 className="text-center">404 not found</h1>} />
            </Route>
        </Routes>
    )
}

export default UserRoutes