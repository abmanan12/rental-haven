import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../../config/firebase'

const initialState = {
  email: ''
}

export default function ForgotPassword() {

  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const Navigator = useNavigate()

  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleSubmit = e => {
    e.preventDefault()

    setIsProcessing(true)

    sendPasswordResetEmail(auth, state.email)
      .then(() => {
        setIsProcessing(false)
        window.tostify("Password reset email sent!", 'success')
        Navigator('/auth/login')
      })
      .catch((error) => {
        setIsProcessing(false)
        window.tostify(error.message, 'error')
      });

  }

  return (
    <>

      <div className='py-5 bg-dark authForm'>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">

              <div className="card shadow p-3 py-sm-5 bg-secondary">
                <div className="row align-items-center">

                  <div className="col-12 col-md-5 col-lg-6 mt-3 mt-md-0 p-xl-4">
                    <img src="/assets/images/login.png" loading="lazy" className='d-none d-md-block' width='100%'
                      alt="forgot-password" />
                  </div>

                  <div className="col-12 col-md-7 col-lg-6 auth-input">
                    <form onSubmit={handleSubmit}>

                      <h3 className='text-center fw-bold pt-3'>Forgot Password</h3>

                      <div className="row mt-4 mt-md-5">
                        <div className="col">
                          <input className='form-control' name='email' type="email" placeholder="Enter your email"
                            required onChange={handleChange} />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <p className='mt-4 mb-4 mb-md-5'><Link className='text-info' to='/Auth/login'>Back to Login?
                          </Link></p>
                        </div>
                      </div>

                      <div className="row mb-2 text-end">
                        <div className="col">
                          <button className='btn btn-info text-light py-2 w-100' disabled={isProcessing}>
                            {
                              !isProcessing ? 'SEND LINK' : <div className="spinner-grow spinner-grow-sm"></div>
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
