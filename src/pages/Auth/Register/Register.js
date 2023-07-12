import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import moment from 'moment';

import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore, storage } from '../../../config/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  cpassword: ''

}

export default function Register() {

  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const [file, setFile] = useState({})
  const Navigator = useNavigate()

  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleFile = e => {
    const files = e.target.files[0]

    setFile(files)
  }

  const handleSubmit = e => {
    e.preventDefault()

    const { firstName, email, password, cpassword } = state

    if (firstName.length <= 2) {
      return window.tostify('Enter First Name Correctly', 'error')
    }

    if (!file.size) {
      return window.tostify('Please Choose your Image', 'error')
    }

    if (file.size > 1000124) {
      return window.tostify('Max Size of Image must 1 MB', 'error')
    }

    if (password !== cpassword) {
      return window.tostify('Password Not Matched', 'error')
    }

    setIsProcessing(true)

    createUserWithEmailAndPassword(auth, email, password)

      .then((userCredential) => {
        const user = userCredential.user;

        sendEmailVerification(auth.currentUser)
          .then(() => {
            window.tostify("Email Verification Sent!", 'info')
          })

        handleUpload(user)

        Navigator('/')

      })
      .catch((error) => {
        setIsProcessing(false)
        window.tostify(error.message, 'error')
      })

  }

  const handleUpload = async (user) => {

    const { firstName, lastName } = state
    let randomId = window.getRandomId()

    const imagesRef = ref(storage, `profileImages/${randomId}`);

    const uploadTask = uploadBytesResumable(imagesRef, file);

    uploadTask.on('state_changed',
      (snapshot) => { },
      (error) => {
        console.log(error);
        window.tostify('Error! File is not uploaded', 'error')
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

          setDoc(doc(firestore, "Users", user.uid), {
            firstName,
            lastName,
            image: downloadURL,
            profileId: randomId,
            createdAt: moment().format('MMMM YYYY'),
            uid: user.uid
          })
        })

        setIsProcessing(false)

      })

  }


  return (
    <>

      <div className='bg-light authForm'>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">

              <div className="card p-3">
                <div className="row align-items-center">

                  <div className="col-12 col-md-6 auth-input">
                    <form onSubmit={handleSubmit}>

                      <h3 className='text-center fw-bold py-3'>REGISTER</h3>

                      <div className="row">
                        <div className="col mb-3">
                          <input className='form-control mb-1' name='firstName' type="text" placeholder="First Name"
                            required onChange={handleChange} />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col mb-3">
                          <input className='form-control mb-1' name='lastName' type="text" placeholder="Last Name"
                            required onChange={handleChange} />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col mb-3">
                          <input className='form-control mb-1' name='email' type="email" placeholder="Email"
                            required onChange={handleChange} />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col mb-3">
                          <input className='form-control mb-1' name='password' type='password' placeholder="Password"
                            required onChange={handleChange} />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col mb-3">
                          <input className='form-control mb-1' name='cpassword' type='password' placeholder="Confirm Password"
                            required onChange={handleChange} />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col mb-3 mb-md-0">
                          <input type="file" className='form-control py-2 mt-1' accept='image/*' onChange={handleFile} />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <p className='d-md-none'><Link className='text-info' to='/Auth/login'>
                            Already Register?</Link></p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col mt-3 mt-md-4 mb-md-2">
                          <button className='btn btn-info text-light py-2 w-100' disabled={isProcessing}>
                            {
                              !isProcessing
                                ? 'REGISTER'
                                : <div className='spinner-grow spinner-grow-sm'></div>
                            }
                          </button>
                        </div>
                      </div>

                    </form>
                  </div>

                  <div className="col-12 col-md-6 mt-3 mt-md-0">
                    <img src="/assets/images/signup.png" className='d-none d-md-block w-100' alt="login" />
                    <p className='mt-3 d-none d-md-block'><Link className='text-info' to='/Auth/login'>
                      Already Register?</Link></p>
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
