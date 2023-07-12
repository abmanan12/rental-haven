import React, { useEffect, useRef } from 'react'
import Product from './Product'
import { useFilterContext } from '../contexts/FilterContext';
import { useProductContext } from '../contexts/ProductContext';
import { Link } from 'react-router-dom';

export default function Category() {

  const { products } = useProductContext()
  const { categoryType } = useFilterContext()

  const allCategories = products.filter(curElem => {
    return curElem.categoryType === categoryType
  })

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'end', inline: 'nearest' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  return (
    <>

      <div ref={messagesEndRef}></div>
      <div className='my-5'>

        {!allCategories?.length ? <h5 className="content-center text-muted" style={{ height: '20vh' }}>No Product Exist</h5>
          : <>
            <div className="container">

              <div className='my-4'>
                <h4 className='fw-bold text-info'>Products with Category Type {categoryType} :</h4>
              </div>

              <div className="row mt-2">
                {allCategories?.map((curElem, i) => {
                  return (
                    <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={i}>
                      <Product {...curElem} />
                    </div>
                  )
                })
                }
              </div>

            </div>
          </>
        }

        <div className='text-center mt-5'>
          <Link to='/products' className='btn btn-outline-info btn-2'>ALL PRODUCTS</Link>
        </div>

      </div>

    </>
  )
}
