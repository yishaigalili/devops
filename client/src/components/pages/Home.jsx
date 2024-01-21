import React, { useContext } from 'react'
import UserStorage from '../../context/userStore'

const Home = () => {
    const { user } = useContext(UserStorage)
    if (user) return (
        <h1 className='text-center'>hello {user.name}</h1>
    )
    return <h1 className='text-center'>hello guest</h1>

}

export default Home