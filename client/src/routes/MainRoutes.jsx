import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBarUser from '../components/nav/NavBarUser'
import Signup from '../components/froms/Signup'
import Login from '../components/froms/Login'
import Home from '../components/pages/Home'
import Logout from '../components/auth/Logout'
import UserStorage from '../context/userStore'
import { If } from 'mg-js'
import UserRoutes from './UserRoutes'
import GuestRoutes from './GuestRoutes'
import AdminRoutes from './AdminRoutes'

const MainRoutes = () => {
    const { user } = useContext(UserStorage)
    if (user?.role == "admin")
        return <AdminRoutes />
    if (!user)
        return <GuestRoutes />
    if (user)
        return <UserRoutes />

}

export default MainRoutes