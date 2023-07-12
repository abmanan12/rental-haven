import React from 'react'
import Product from './Product'

export default function GridView({ products }) {

  return (

      <div className="container-fluid">
        <div className="row mt-2">
          {
            products.map((curElem) => {
              return (
                <div className="col-12 col-sm-6 col-md-4 col-xl-3" key={curElem.productId}>
                  <Product {...curElem} />
                </div>
              )
            })
          }
        </div>
      </div>

  )
}
