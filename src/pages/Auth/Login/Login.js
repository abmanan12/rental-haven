import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../config/firebase'

const initialState = {
    email: '',
    password: ''
}

export default function Login() {

    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const navigate = useNavigate()

    const handleChange = e => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        const { email, password } = state

        setIsProcessing(true)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);

                window.tostify("User Logged In Successfully", 'success')

                setIsProcessing(false)
                navigate('/')
            })
            .catch((error) => {
                setIsProcessing(false)
                window.tostify(error.code, 'error')
            });
    }


    return (
        <>

            <div className='py-5 bg-light authForm'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">

                            <div className="card shadow p-3 p-xl-5">
                                <div className="row align-items-center">

                                    <div className="col-12 col-md-6 mt-3 mt-md-0 d-none d-md-block p-xl-4">
                                        <img src="/assets/images/login.png" width='100%' alt="login" />
                                    </div>

                                    <div className="col-12 col-md-6 auth-input">
                                        <form onSubmit={handleSubmit}>

                                            <h3 className='text-center fw-bold py-3'>LOGIN</h3>

                                            <div className="row">
                                                <div className="col mb-3">
                                                    <input className='form-control mb-1' name='email' type="email" placeholder="Email" required
                                                        onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col">
                                                    <input className='form-control mb-1' name='password' type='password' placeholder="Password"
                                                        required onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col d-flex d-md-block d-xl-flex justify-content-between">
                                                    <p className='mt-3'><Link className='text-info' to='/Auth/forgot-password'>
                                                        Forgot Password?</Link></p>

                                                    <p className='mt-3'><Link className='text-info' to='/Auth/register'>
                                                        Not a User?</Link></p>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col mt-4 mb-2">
                                                    <button className='btn btn-info text-light py-2 w-100' disabled={isProcessing}>
                                                        {
                                                            !isProcessing
                                                                ? 'LOGIN'
                                                                : <div className='spinner-grow spinner-grow-sm'></div>
                                                        }
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
