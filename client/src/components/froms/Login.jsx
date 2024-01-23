import React, { useContext } from 'react'
import { LOGIN_URL } from '../../routes/urls'
import { useAxios } from 'frontend-essentials'
import { If, useObjectState } from 'mg-js'
import { useNavigate } from 'react-router-dom'
import Loading from "../../shared/components/loading/Loading"
import UserStorage from '../../context/userStore'
import image from './businesswoman-using-tablet-analysis.jpg'

const Login = () => {
    const { setUser } = useContext(UserStorage)
    const nav = useNavigate()
    const [form, setForm] = useObjectState(["email", "password"]);
    const { loading, error, status, activate } = useAxios({
        method: 'post',
        url: LOGIN_URL,
        manual: true,
        onSuccess: ({ data: { user } }) => {
            setUser(user)
            nav("/")
        }
    })
    const submitForm = (e) => {
        e.preventDefault();
        activate({
            data: {
                ...form,
                browserName: navigator.appName,
                browserVersion: navigator.appVersion,
                browserPlatform: navigator.platform
            }
        })
    }
    return (
        <>
            <If condition={loading}>
                <Loading />
            </If>
            <div className='bg-imag d-flex align-items-center justify-content-center' style={{backgroundImage:`url(${image})`,height:"92vh",backgroundSize:"cover"}}> 
            <form onSubmit={submitForm} className='w-25 p-4 form-login' >
                <h2 className='text-center'>Login</h2>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input value={form.email} onChange={(e) => setForm("email", e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input value={form.password} onChange={(e) => setForm("password", e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
                <If condition={status == 401}>
                    <p className='text-danger text-end'>wrong password</p>
                </If>
                <If condition={status == 404}>
                    <p className='text-danger text-end'>user not found</p>
                </If>
                {/* <img src={image}/> */}
            </form>
            </div>
            </>

    )
}

export default Login