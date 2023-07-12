import React from 'react'
import Sort from '../../../components/Sort'
import ProductLists from '../../../components/ProductLists'
import { useFilterContext } from '../../../contexts/FilterContext'

export default function Products() {

  const { products } = useFilterContext()

  if (!products.length) {
    return <div className='content-center text-muted'
      style={{ height: '34vh' }}>
      <div>Loading...</div>
    </div>
  }

  return (
    <>
      <div className="py-5 bg-light">
        <div className="container-fluid">

          <div className="row">
            <div className="col">
              <Sort />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <ProductLists />
            </div>
          </div>

        </div>
      </div>

    </>
  )
}
