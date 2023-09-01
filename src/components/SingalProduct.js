import React, { useContext, useEffect, useRef, useState } from 'react'

import moment from 'moment';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { firestore } from '../config/firebase';
import { ListProduct } from '../contexts/ListProduct'
import { deleteDoc, doc, setDoc } from 'firebase/firestore';

import UserProfile from './UserProfile';
import FormatPrice from '../Helpers/FormatPrice';
import { AuthContext } from '../contexts/AuthContext';
import { useCartContext } from '../contexts/CartContext';
import { useProductContext } from '../contexts/ProductContext';

export default function SingalProduct() {

  const { id } = useParams();
  const Navigator = useNavigate()
  const [singleProductData, setSingleProductData] = useState({})

  const { user } = useContext(AuthContext)
  const { addToCart } = useCartContext()
  const { products, userProfile } = useProductContext()
  const { changeSelectOptionHandler, options, changeSelectLocationHandler,
    locationOptions } = useContext(ListProduct)


  useEffect(() => {

    let singleProductData = products.filter((curElem) => {
      return curElem.productId === id
    })
    var singleObj = Object.assign({}, ...singleProductData);
    setSingleProductData(singleObj)

  }, [products])


  const {
    uid,
    price,
    city,
    province,
    titleName,
    categoryName,
    categoryType,
    description,
    productImage,
    condition,
    productId,
    phoneNumber,
    uploadTime
  } = singleProductData;


  useEffect(() => {
    userProfile(uid)
  }, [uid])


  const handleDelete = async () => {

    try {
      await deleteDoc(doc(firestore, "ListProducts", productId));
      Navigator('/')
      return window.tostify('Deleted Successfully', 'success')
    }
    catch {
      return window.tostify('Something went Wrong', 'error')
    }

  }


  const handleChange = e => {
    setSingleProductData(s => ({ ...s, [e.target.name]: e.target.value }))
  }


  const handleUpdate = async () => {

    let editData = { ...singleProductData }

    editData.uploadTime = editData.uploadTime
    editData.dateModified = moment().format('YYYY-MM-D, h:mm:ss a')

    try {
      await setDoc(doc(firestore, "ListProducts", editData.productId), editData, { merge: true });
      window.tostify('Updated Successfully', 'success')
    }
    catch (err) {
      console.error(err)
      window.tostify('Something went wrong', 'error')
    }

  }

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'end', inline: 'nearest' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [])


  if (!products.length) {
    return <div className="content-center text-muted" style={{ height: '35vh' }}>Loading...</div>;
  }

  return (
    <>

      <div ref={messagesEndRef}></div>
      <div className='pt-4 text-muted'>
        <Link to='/' className='ms-5 text-info footer-link'>Home</Link> / {titleName}
      </div>

      <div className='py-5'>
        <div className="container">

          <div className="row content-center">
            <div className="col-12 col-md-6 text-center">
              <img src={productImage} loading='lazy' alt={titleName} style={{ width: '80%', maxHeight: '260px' }} />
            </div>

            <div className="col-12 col-md-6 mt-4 mt-md-0">
              <h4 className='text-info'>{<FormatPrice price={price} />}</h4>

              <p className='mb-0'><span className='fw-bold'>Name: </span>{titleName}</p>
              <p><span className='fw-bold'>Category: </span>{categoryName}</p>

              <p className='mb-0'><span className='fw-bold'>Condition: </span>{condition}</p>
              <p><span className='fw-bold'>Product Id: </span>{productId}</p>

              <hr className='w-75' />

              <div className='mt-3'>
                <h4 className='d-block fw-bold mb-3 text-muted'>Product Owner: </h4>
                <div className="row content-center">

                  <UserProfile />

                  <div className='row mt-4 content-center'>
                    <div className="col-12 col-sm-6 col-md-5">
                      {
                        uid !== user.uid ? <span>+92{phoneNumber}</span>
                          : <button type="button" className='btn btn-success rent-input' style={{ width: '9rem' }} data-bs-toggle="modal"
                            data-bs-target="#exampleModal">Edit Product</button>
                      }
                    </div>

                    <div className="col-12 col-sm-6 col-md-7 text-md-end text-lg-start mt-3 mt-sm-0">
                      {
                        uid !== user.uid ? <Link to={`/dashboard/chat/${uid}`} className='btn btn-1'>CHAT WITH OWNER</Link>
                          : <button className='btn btn-danger rent-input' style={{ width: '9rem' }} onClick={handleDelete}>
                            Delete Product</button>
                      }
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col ms-md-4 mx-lg-5">
              <p className='border pt-2 px-3 pb-3 rent-input'>

                <span className='d-block mb-2'><span className='fw-bold'>Description: </span>
                  <span className='text-muted d-block d-sm-inline ms-sm-2' style={{ fontSize: '14px' }}>
                    {moment(new Date(uploadTime)).fromNow()}</span>

                  <span className='d-block' style={{ fontSize: '14px' }}>{city}, {province}, Pakistan</span>

                  <span className='d-block mt-3'>{description}</span>

                  {
                    uid !== user.uid && <Link to='/cart' className='btn btn-1 mt-5'
                      onClick={() => { addToCart(singleProductData, user.uid) }}>ADD TO FAVOURITE</Link>
                  }

                </span>

              </p>
            </div>
          </div>

        </div>
      </div>


      {/* Update/ Delete Modal */}
      <div className="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content rent-card">

            <div className="modal-header">
              <h4 className="modal-title text-muted" id="exampleModalLabel">Edit Product</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <select onChange={handleChange} onClick={changeSelectOptionHandler} name='categoryType'
                      value={categoryType} className="form-select rent-input" aria-label="Default select example">
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
                    <select className="form-select rent-input" name='categoryName' value={categoryName}
                      onChange={handleChange} aria-label="Default select example">
                      <option hidden value=''>Select Category Name</option>
                      {options}
                    </select>
                  </div>
                </div>

                <div className="row mt-3 mt-md-4">
                  <div className="col-12 col-md-6">
                    <input type="text" className='form-control rent-input' name='titleName' value={titleName}
                      onChange={handleChange} placeholder='Title Name' />
                  </div>

                  <div className="col-12 col-md-6 mt-3 mt-md-0">
                    <input type='text' className='form-control rent-input' name='price' value={price}
                      placeholder='Price' onChange={handleChange} />
                  </div>
                </div>

                <div className="row mt-3 mt-md-4">
                  <div className="col-12 col-md-6">
                    <select onChange={handleChange} onClick={changeSelectLocationHandler} name='province'
                      value={province} className="form-select rent-input" aria-label="Default select example">
                      <option hidden value=''>Select Province</option>
                      <option value='Punjab'>Punjab</option>
                      <option value='Sindh'>Sindh</option>
                      <option value='KPK'>KPK</option>
                      <option value='Balochistan'>Balochistan</option>
                      <option value='Gilgit Baltistan'>Gilgit Baltistan</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-6 mt-3 mt-md-0">
                    <select className="form-select rent-input" name='city' value={city} onChange={handleChange}
                      aria-label="Default select example">
                      <option hidden value=''>Select City</option>
                      {locationOptions}
                    </select>
                  </div>
                </div>

                <div className="row mt-3 mt-md-4">
                  <div className="col-12 col-md-6">
                    <select className="form-select rent-input" name='condition' value={condition} onChange={handleChange}
                      aria-label="Default select example">
                      <option hidden value=''>Product Condition</option>
                      <option value='Fair'>Fair</option>
                      <option value='Good'>Good</option>
                      <option value='Excellent'>Excellent</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-6 mt-3 mt-md-0">
                    <input type='text' className='form-control rent-input' name='phoneNumber' value={phoneNumber}
                      pattern="[3-3]{1}[0-9]{9}" id='phoneNumber' maxLength='10' placeholder='Phone Number' onChange={handleChange} />
                    <label htmlFor="phoneNumber" className='mt-1 text-muted'>eg: 3012345678</label>
                  </div>
                </div>

                <div className="row mt-3 mt-md-4">
                  <div className="col">
                    <textarea className="form-control rent-input" placeholder='Description' value={description} name='description'
                      onChange={handleChange}
                      rows="3"></textarea>
                  </div>
                </div>

                <div className="mt-3 mt-sm-4 d-flex justify-content-end">
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-success ms-2" data-bs-dismiss="modal"
                    onClick={handleUpdate}>Save changes</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}
