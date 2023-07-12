import React, { useContext } from 'react'
import { useProductContext } from '../../../contexts/ProductContext'
import { AuthContext } from '../../../contexts/AuthContext'
import Product from '../../../components/Product'

export default function MyAd() {

  const { products } = useProductContext()
  const { user } = useContext(AuthContext)

  const myAds = products.filter(curElem => {
    return curElem.uid === user.uid
  })

  return (
    <>

      <div className='my-5'>
        {
          !myAds.length ? <div className='content-center text-muted'
            style={{ height: 'calc(34vh - 96px)' }}><h5>No Item Exist</h5></div>
            : <>
              <div className="container">

                <div className='my-4'>
                  <h2 className='fw-bold text-info'>My Ads :</h2>
                </div>

                <div className="row mt-2">
                  {
                    myAds.map((curElem, i) => {
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
      </div>

    </>
  )
}
