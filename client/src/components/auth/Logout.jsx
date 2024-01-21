import { useAxios } from 'frontend-essentials'
import React, { useContext } from 'react'
import { LOGOUT_URL } from '../../routes/urls'
import { useNavigate } from 'react-router-dom'
import Loading from '../../shared/components/loading/Loading'
import UserStorage from '../../context/userStore'

const Logout = () => {
    const { logout } = useContext(UserStorage);
    useAxios({
        method: 'post',
        url: LOGOUT_URL,
        onSuccess: () => {
            logout()
        },
    })
    return (
        <Loading />
    )
}

export default Logout