import React, { useContext, useEffect, useState } from 'react'

import { Modal } from '@mantine/core';
import { Avatar } from '@mui/material'
import { AuthContext } from '../../../contexts/AuthContext'

import { useNavigate } from 'react-router-dom';
import { updateEmail, updatePassword } from "firebase/auth"
import { auth, firestore, storage } from '../../../config/firebase'
import { collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

function ChangeInfo({ modal, setModal }) {

    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    const [name, setName] = useState(false)
    const { user } = useContext(AuthContext)
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [userEmail, setUserEmail] = useState(user?.email)


    // fetch user data
    useEffect(() => {
        const q = query(collection(firestore, "Users"), where("uid", "==", user.uid));
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let data = doc.data()
                setUserData(data)
            })
        })
    }, [])


    // input change for name
    const handleChange = e => {
        setUserData(s => ({ ...s, [e.target.name]: e.target.value }))
        setName(true)
    }

    // change image
    const handleFile = e => {

        const files = e.target.files[0]

        if (files.size > 1000124) {
            return window.tostify('Max Size of Image must 1 MB', 'error')
        }

        setFile(files)
    }


    // handle update
    const handleSave = async (e) => {

        e.preventDefault()
        setIsProcessing(true)

        // change password
        if (password?.length !== 0) {

            if (password?.length < 6) {
                setIsProcessing(false)
                return console.log('Password minimum length must be 6 characters');
            }
            else {
                updatePassword(auth.currentUser, password).then(() => {
                    console.log('Password Updated Successfully');
                }).catch((error) => {
                    console.log('password', error);
                })
            }
        }

        // change name
        if (name) {

            let editData = { ...userData }

            try {
                await setDoc(doc(firestore, "Users", userData?.uid), editData, { merge: true });
                console.log('Username Updated Successfully');
            }
            catch (err) {
                console.error('name', err)
            }
        }

        // change email
        if (userEmail !== user?.email) {
            updateEmail(auth.currentUser, userEmail).then(() => {
                console.log('Email Updated Successfully');
            }).catch((error) => {
                console.log('email', error);
            })
        }

        if (file) {
            await handleUpdateImage();
        }
        else {
            // navigation
            if (userEmail !== user?.email || password?.length !== 0) {
                setIsProcessing(false)
                navigate('/Auth/login')
            }
            else {
                setIsProcessing(false)
                navigate('/')
            }
        }

    }


    const handleUpdateImage = async () => {

        const desertRef = ref(storage, `profileImages/${userData?.profileId}`)

        deleteObject(desertRef).then(() => {
            console.log('Image deleted successfully')
            setIsProcessing(false)
            navigate('/')
        }).catch((error) => {
            console.log(error)
        })

        const imagesRef = ref(storage, `profileImages/${userData?.profileId}`);

        const uploadTask = uploadBytesResumable(imagesRef, file);

        uploadTask.on('state_changed',
            (snapshot) => { },
            (error) => {
                console.log(error);
                setIsProcessing(false)
                window.tostify('Something Went Wrong!', 'error')
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                    let editObj = { ...userData, image: downloadURL }

                    setDoc(doc(firestore, "Users", userData?.uid), editObj, { merge: true })
                        .then(() => {
                            window.tostify('Image Updated Successfully', 'success')
                        }).catch((error) => {
                            setIsProcessing(false)
                            console.log(error)
                        })
                })

            })
    }

    return (
        <>
            <Modal opened={modal} onClose={() => setModal(true)} title="SETTINGS" centered>

                <div className="my-4 mx-auto text-center">
                    {
                        !userData ? <div className='d-flex justify-content-center'><Avatar style={{ width: '60px', height: '60px' }} /></div>
                            : <div className='d-flex justify-content-center'>
                                <img src={userData?.image} className='border' loading="lazy" style={{ borderRadius: '50%' }}
                                    alt="profileImg" width="90" height="90" id='changeImg' />
                            </div>
                    }

                    <label htmlFor="formFileSm" className="form-label mt-3 text-muted mb-0" style={{ cursor: 'pointer', fontSize: '12px' }}>
                        Click to change image</label>
                    <input type="file" className='d-none' id="formFileSm" accept='image/*' onChange={handleFile} />
                    <p className='text-center mb-0' style={{ fontSize: '10px' }}>{file?.name}</p>

                </div>

                <div className='px-md-3'>
                    <div className="mb-3 d-flex justify-content-between">
                        <input type='email' value={userEmail} onChange={e => setUserEmail(e.target.value)} className='form-control rent-input' />
                    </div>

                    <div className="mb-3 d-flex justify-content-between">
                        <input type='text' value={userData?.firstName} name='firstName' onChange={handleChange} className='form-control rent-input me-2' />
                        <input type='text' value={userData?.lastName} name='lastName' onChange={handleChange} className='form-control rent-input' />
                    </div>

                    <div className="mb-3 d-flex justify-content-between">
                        <input type='password' placeholder='************' onChange={e => setPassword(e.target.value)} className='form-control rent-input' />
                    </div>
                </div>

                <div className='text-end pe-md-3 mt-5 mb-3'>
                    <button type="button" className="btn btn-info text-light me-2" onClick={() => navigate('/')}>Back</button>
                    <button type="button" className="btn btn-info text-light" disabled={isProcessing} onClick={handleSave}>
                        {!isProcessing ? 'Save Changes' : <div className='spinner-grow spinner-grow-sm'></div>}
                    </button>
                </div>


            </Modal>
        </>
    );
}

export default ChangeInfo;