import React, { useContext } from 'react'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../config/firebase'
import { AuthContext } from '../../../contexts/AuthContext'
import ChangeInfo from './ChangeInfo'

export default function Settings() {

    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const [password, setPassword] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const { user } = useContext(AuthContext)


    // check password
    const handleSubmit = e => {
        e.preventDefault();

        setIsProcessing(true)

        signInWithEmailAndPassword(auth, user?.email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                setModal(true)

                setIsProcessing(false);
            })
            .catch((error) => {
                setIsProcessing(false)
                window.tostify(error.code, 'error')
            });

    }


    return (
        <>

            <div className='py-2 bg-light auth-setting-Form'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">

                            <div className="card shadow p-3 py-sm-5">
                                <div className="row align-items-center">

                                    <div className="col-12 col-md-5 col-lg-6 mt-3 mt-md-0 p-xl-4">
                                        <img src="/assets/images/login.png" className='d-none d-md-block' width='100%'
                                            alt="forgot-password" />
                                    </div>

                                    <div className="col-12 col-md-7 col-lg-6 auth-input">
                                        <form onSubmit={handleSubmit}>

                                            <h6 className='text-center fw-bold pt-3'>Verify your Password</h6>

                                            <div className="row mt-4 mt-md-5">
                                                <div className="col">
                                                    <input className='form-control' value={password} type="password" placeholder="Password"
                                                        required onChange={e => setPassword(e.target.value)} />
                                                </div>
                                            </div>

                                            <div className="row mt-5 text-end">
                                                <div className="col">
                                                    <button className='btn btn-info text-light py-2 w-100' disabled={isProcessing}>
                                                        {
                                                            !isProcessing ? 'Next' : <div className="spinner-grow spinner-grow-sm"></div>
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

            {
                modal && <ChangeInfo Open={modal} />
            }

        </>
    )
}
