import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBarUser from '../components/nav/NavBarUser'
import Home from '../components/pages/Home'
import Logout from '../components/auth/Logout'
import NavBarAdmin from '../components/nav/NavBarAdmin'

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<NavBarAdmin />}>
                <Route path='/' element={<Home />} />
                <Route path='logout' element={<Logout />} />
                <Route path='*' element={<h1 className="text-center">404 not found</h1>} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes