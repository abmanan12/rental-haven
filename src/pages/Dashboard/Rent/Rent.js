import React, { useContext, useState } from 'react'

import { doc, setDoc } from 'firebase/firestore'
import { AuthContext } from '../../../contexts/AuthContext'
import { firestore, storage } from '../../../config/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

import moment from 'moment';
import { useNavigate } from 'react-router-dom'
import { ListProduct } from '../../../contexts/ListProduct'

const initialState = {
    categoryName: '',
    titleName: '',
    price: '',
    phoneNumber: '',
    condition: '',
    city: '',
    description: '',
}

export default function Rent() {

    const navigation = useNavigate()
    const [file, setFile] = useState({})
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const { user } = useContext(AuthContext)
    const { changeSelectOptionHandler, options, selected, changeSelectLocationHandler,
        locationOptions, locationSelected } = useContext(ListProduct)


    const handleChange = (e) => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handleFile = e => {
        const files = e.target.files[0]
        setFile(files)
    }

    const handleSubmit = (e) => {

        e.preventDefault()

        state.categoryType = selected
        state.province = locationSelected

        const { categoryName, titleName, price, city, phoneNumber, condition, description } = state

        if (titleName.length <= 4) {
            return window.tostify('Title Name min length must 5', 'error')
        }

        if (!categoryName) {
            return window.tostify('Please Select Category Name', 'error')
        }

        if (!city) {
            return window.tostify('Please Select City', 'error')
        }

        if (!price) {
            return window.tostify('Please Enter Price', 'error')
        }

        if (!phoneNumber) {
            return window.tostify('Please Enter Mobile Number', 'error')
        }

        if (!condition) {
            return window.tostify('Please Select Condition', 'error')
        }

        if (!file.size) {
            return window.tostify('Please Choose Product Image', 'error')
        }

        if (file.size > 1000124) {
            return window.tostify('Max Size of Image must 1 MB', 'error')
        }

        if (description.length <= 9) {
            return window.tostify('Description should contain at least 10 characters', 'error')
        }

        handleUpload()

    }

    const handleUpload = async () => {

        setIsProcessing(true)

        let randomId = window.getRandomId()

        const imagesRef = ref(storage, `profileImages/${randomId}`);

        const uploadTask = uploadBytesResumable(imagesRef, file);

        uploadTask.on('state_changed',
            (snapshot) => { },
            (error) => {
                console.log(error);
                setIsProcessing(false)
                window.tostify('Error! File is not uploaded', 'error')
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                    state.productImage = downloadURL
                    state.uploadTime = moment().format('YYYY-MM-D, h:mm:ss a')
                    state.productId = randomId
                    state.uid = user.uid

                    setDoc(doc(firestore, "ListProducts", state.productId), state)

                });

                setIsProcessing(false)
                navigation('/')
                window.tostify('Product has been added!', 'success')

            })

    }

    return (
        <>
            <div className='bg-light'>
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="col-sm-10 offset-sm-1 col-lg-6 offset-lg-3 px-3 px-sm-0">
                            <div className="card rent-card p-3 p-md-4">

                                <div className="row mb-sm-3 mb-md-4 mt-1">
                                    <div className="col">
                                        <h2 className='text-info text-center fw-bold'>List Rent Product</h2>
                                        <p className='text-muted mt-2 text-center'>Add product to get rent services</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <select onChange={changeSelectOptionHandler} name='categoryType'
                                                className="form-select rent-input" aria-label="Default select example">
                                                <option hidden value=''>Select Category Type</option>
                                                <option value='Vehicles'>Vehicles</option>
                                                <option value='Properties'>Properties</option>
                                                <option value='Electronics'>Electronics</option>
                                                <option value='Human Workers'>Human Workers</option>
                                                <option value='Household Goods'>Household Goods</option>
                                                <option value='Other Necessities'>Other Necessities</option>
                                            </select>
                                        </div>
                                        <div className="col-12 col-md-6 mt-3 mt-md-0">
                                            <select className="form-select rent-input" name='categoryName' onChange={handleChange}
                                                aria-label="Default select example">
                                                <option hidden value=''>Select Category Name</option>
                                                {options}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mt-3 mt-md-4">
                                        <div className="col-12 col-md-6">
                                            <input type="text" className='form-control rent-input' name='titleName' onChange={handleChange}
                                                placeholder='Title Name' />
                                        </div>
                                        <div className="col-12 col-md-6 mt-3 mt-md-0">
                                            <input type='text' className='form-control rent-input' name='price' onChange={handleChange}
                                                placeholder='Price' />
                                        </div>
                                    </div>

                                    <div className="row mt-3 mt-md-4">
                                        <div className="col-12 col-md-6">
                                            <select onChange={changeSelectLocationHandler} name='province'
                                                className="form-select rent-input" aria-label="Default select example">
                                                <option hidden value=''>Select Province</option>
                                                <option value='Punjab'>Punjab</option>
                                                <option value='Sindh'>Sindh</option>
                                                <option value='KPK'>KPK</option>
                                                <option value='Balochistan'>Balochistan</option>
                                                <option value='Gilgit Baltistan'>Gilgit Baltistan</option>
                                            </select>
                                        </div>
                                        <div className="col-12 col-md-6 mt-3 mt-md-0">
                                            <select className="form-select rent-input" name='city' onChange={handleChange}
                                                aria-label="Default select example">
                                                <option hidden value=''>Select City</option>
                                                {locationOptions}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mt-3 mt-md-4">
                                        <div className="col-12 col-md-6">
                                            <input type='text' className='form-control rent-input' name='phoneNumber'
                                                pattern="[3-3]{1}[0-9]{9}" id='phoneNumber' placeholder='Phone Number'
                                                maxLength='10' onChange={handleChange} />
                                            <label htmlFor="phoneNumber" className='mt-1 text-muted'>eg: 3012345678</label>
                                        </div>
                                        <div className="col-12 col-md-6 mt-3 mt-md-0">
                                            <input type="file" className='form-control rent-input' id='img2' accept='image/*'
                                                onChange={handleFile} />
                                            <label htmlFor="img2" className='mt-1 text-muted'>Select Product Image</label>
                                        </div>
                                    </div>

                                    <div className="row mt-3 mt-md-4">
                                        <div className="col-12 col-md-6">
                                            <select className="form-select rent-input" name='condition' onChange={handleChange}
                                                aria-label="Default select example">
                                                <option hidden value=''>Product Condition</option>
                                                <option value='Fair'>Fair</option>
                                                <option value='Good'>Good</option>
                                                <option value='Excellent'>Excellent</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mt-3 mt-md-4">
                                        <div className="col">
                                            <textarea className="form-control rent-input" placeholder='Description' name='description'
                                                style={{ resize: 'none' }} onChange={handleChange}
                                                rows="4"></textarea>
                                        </div>
                                    </div>

                                    <div className="row mt-3 mt-sm-4">
                                        <div className="col text-end">
                                            <button className='btn btn-1' disabled={isProcessing}>
                                                {
                                                    !isProcessing ? 'ADD PRODUCT' : <div className="spinner-grow spinner-grow-sm"></div>
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
        </>
    )
}
