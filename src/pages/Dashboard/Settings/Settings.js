import React, { useContext, useEffect, useState } from 'react'

import { Avatar } from '@mui/material'
import { FiEdit } from 'react-icons/fi'
import { AuthContext } from '../../../contexts/AuthContext'

import { auth, firestore, storage } from '../../../config/firebase'
import { collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore'
import { updateEmail, updatePassword } from "firebase/auth"
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

export default function Settings() {

    const { user } = useContext(AuthContext)
    const [userData, setUserData] = useState()
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState()
    const [file, setFile] = useState({})

    useEffect(() => {

        const q = query(collection(firestore, "Users"), where("uid", "==", user.uid));

        onSnapshot(q, (querySnapshot) => {

            querySnapshot.forEach((doc) => {
                let data = doc.data()
                setUserData(data)
            })

        })

    }, [])


    const handleFile = e => {
        const files = e.target.files[0]
        if (files.size > 1000124) {
            return window.tostify('Max Size of Image must 1 MB', 'error')
        }
        setFile(files)
        handleUpdateImage(files)
    }

    const handleUpdateImage = async (files) => {

        const desertRef = ref(storage, `profileImages/${userData?.profileId}`)

        deleteObject(desertRef).then(() => {
            console.log('Image deleted successfully')
        }).catch((error) => {
            console.log(error)
        })

        const imagesRef = ref(storage, `profileImages/${userData?.profileId}`);

        const uploadTask = uploadBytesResumable(imagesRef, files);

        uploadTask.on('state_changed',
            (snapshot) => { },
            (error) => {
                console.log(error);
                window.tostify('Something Went Wrong!', 'error')
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                    let editObj = { ...userData, image: downloadURL }

                    setDoc(doc(firestore, "Users", userData?.uid), editObj, { merge: true })
                        .then(() => {
                            window.tostify('Image Updated Successfully', 'success')
                        }).catch((error) => {
                            console.log(error)
                        })
                })

            })

    }



    const handleEmail = e => {
        setEmail(e.target.value)
    }

    const handleupdateEmail = email => {

        updateEmail(auth.currentUser, email).then(() => {
            window.tostify('Email Updated Successfully', 'success')
        }).catch((error) => {
            window.tostify('Something went wrong', 'error')
            console.log(error);
        })

    }

    const handleChange = e => {
        setUserData(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handleupdateName = async () => {

        let editData = { ...userData }

        try {
            await setDoc(doc(firestore, "Users", userData?.uid), editData, { merge: true });
            window.tostify('Username Updated Successfully', 'success')
        }
        catch (err) {
            console.error(err)
            window.tostify('Something went wrong', 'error')
        }

    }

    const handlePassword = e => {
        setPassword(e.target.password)
    }

    const handleupdatePassword = password => {

        updatePassword(auth.currentUser, password).then(() => {
            window.tostify('Password Updated Successfully', 'success')
        }).catch((error) => {
            window.tostify('Something went wrong', 'error')
            console.log(error);
        })

    }

    return (
        <>

            <div className='pt-2 bg-light' style={{ height: 'calc(100vh - 75.98px' }}>

                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 px-lg-5">
                            <div className="card rent-card p-3">

                                <h4 className='fw-bold py-2 py-sm-4 text-info'>Change Your Personal Information</h4>

                                <div className="mb-4 mx-auto">
                                    {
                                        !userData ? <div className='d-flex justify-content-center'><Avatar style={{ width: '60px', height: '60px' }} /></div>
                                            : <div className='d-flex justify-content-center'>
                                                <img src={userData?.image} className='border' style={{ borderRadius: '50%' }}
                                                    alt="profileImg" width="120" height="120" id='changeImg' />
                                            </div>
                                    }
                                    <label htmlFor="formFileSm" className="form-label mt-3 text-muted" style={{ cursor: 'pointer' }}>Change Profile Image</label>
                                    <input type="file" className='d-none' id="formFileSm" accept='image/*' onChange={handleFile} />
                                    <p className='text-center mb-0'>{file?.name}</p>

                                </div>

                                <div className='px-md-3'>
                                    <h5 className='mb-2 fw-bold text-info'>Email</h5>
                                    <div className="mb-3 d-flex justify-content-between">
                                        <p className='text-muted'>{email}</p>
                                        <p className='fw-bold text-info' style={{ cursor: 'pointer' }}
                                            data-bs-toggle="modal" data-bs-target="#changeEmail">{<FiEdit />}</p>
                                    </div>

                                    <h5 className='mb-2 fw-bold text-info'>Username</h5>
                                    <div className="mb-3 d-flex justify-content-between">
                                        <p className='text-muted'>{userData?.firstName + ' ' + userData?.lastName}</p>
                                        <p className='fw-bold text-info' style={{ cursor: 'pointer' }}
                                            data-bs-toggle="modal" data-bs-target="#changeUsername">{<FiEdit />}</p>
                                    </div>

                                    <h5 className='mb-2 fw-bold text-info'>Password</h5>
                                    <div className="mb-3 d-flex justify-content-between">
                                        <p className='text-muted fw-bold'>.......................</p>
                                        <p className='fw-bold text-info' style={{ cursor: 'pointer' }}
                                            data-bs-toggle="modal" data-bs-target="#changePassword">{<FiEdit />}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Change Email Modal */}
            <div className="modal fade" id="changeEmail" data-bs-backdrop="static" data-bs-keyboard="false" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-muted">Change Email</h5>
                        </div>
                        <div className="modal-body m-3">
                            <input type='text' value={email} onChange={handleEmail} className='form-control rent-input' />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                                onClick={() => { handleupdateEmail(email) }}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Change Username Modal */}
            <div className="modal fade" id="changeUsername" data-bs-backdrop="static" data-bs-keyboard="false" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-muted">Change Username</h5>
                        </div>
                        <div className="modal-body">
                            <input type='text' value={userData?.firstName} name='firstName' onChange={handleChange} className='form-control rent-input mb-3' />
                            <input type='text' value={userData?.lastName} name='lastName' onChange={handleChange} className='form-control rent-input' />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                                onClick={handleupdateName}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Change Password Modal */}
            <div className="modal fade" id="changePassword" data-bs-backdrop="static" data-bs-keyboard="false" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-muted">Change Password</h5>
                        </div>
                        <div className="modal-body">
                            <input type='text' placeholder='Password' onChange={handlePassword} className='form-control rent-input' />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                                onClick={() => { handleupdatePassword(password) }}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}


