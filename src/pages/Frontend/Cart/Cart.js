import React, { useContext, useEffect, useRef } from 'react'

import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import CartItem from '../../../components/CartItem';
import { useCartContext } from '../../../contexts/CartContext';
import { AuthContext } from '../../../contexts/AuthContext';


export default function Cart() {

  const { cart, clearCart, error } = useCartContext()
  const { user } = useContext(AuthContext)


  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'end', inline: 'nearest' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  let uidCart = cart.filter((curElem) => {
    return curElem.uid === user.uid
  })

  if (uidCart.length === 0) {
    return <div className='content-center text-muted'
      style={{ height: '34vh' }}>
      <h5>No Item in Cart</h5>
    </div>
  }

  return (
    <>

      <div ref={messagesEndRef}></div>
      <div className='py-5'>
        <div className="container px-lg-4 px-xl-5">

          <h3 className='fw-bold text-info mb-3'>Favourite Items</h3>
          <p className='mb-5 text-muted'>Cart is a feature in rental haven site that allows users to select and
            store products they wish to rent. Once an product is added to the cart, users can continue browsing
            the online store and add more items to their cart. The cart typically displays a summary of the
            selected products, including details such as product image, name and key, price and remaining time.
            Users can also check detail by clicking product image and name and can remove items or clear cart.</p>


          <div className='text-center text-danger'>
            {error && console.log('already exist')}
          </div>

          <Table className='text-center'>

            <Thead>
              <Tr>
                <Th>Product Image</Th>
                <Th>Product Name</Th>
                <Th>Product Id</Th>
                <Th>Price</Th>
                <Th>Remove</Th>
              </Tr>
            </Thead>

            <Tbody>
              {uidCart.map((curElem) => {
                return <CartItem key={curElem.productId} {...curElem} />
              })}
            </Tbody>

          </Table>

          <div className="row mt-5">
            <div className="col text-end">
              <button className='btn btn-info text-light' onClick={clearCart}>CLEAR CART</button>
            </div>
          </div>

        </div>
      </div>

    </>
  )
}
