import React, { useContext, useState } from 'react'
import { useFilterContext } from '../contexts/FilterContext'
import FormatPrice from '../Helpers/FormatPrice';
import { ListProduct } from '../contexts/ListProduct';
import { Button, Drawer } from '@mui/material';
import { ImCross } from 'react-icons/im'
import { MdFilterList } from 'react-icons/md'

export default function FilterSection() {

  const [open, setOpen] = useState(false);

  const { filters: { price, maxPrice, minPrice }, updateFilter, clearFilter } = useFilterContext();

  const { changeSelectOptionHandler, options, changeSelectLocationHandler, locationOptions }
    = useContext(ListProduct)

  return (
    <>
      <div className='mt-2'>

        <Button style={{ color: 'black' }} onClick={() => setOpen(true)}>
          <h6 className='fw-bold'>Filter <MdFilterList className='fs-4 ms-1' /></h6>
        </Button>

        <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}
          PaperProps={{ sx: { marginTop: '75px' } }}>
          <div style={{ width: 260, marginTop: 25 }} >

            <div className="container-fluid">
              <div className="row">
                <div className="col-12 col-lg-10 offset-lg-1">

                  <div className='pb-4 d-flex justify-content-between'>
                    <h5 className='fw-bold'>Filters:</h5>
                    <h6 className='text-end text-muted' onClick={() => setOpen(false)}
                      style={{ cursor: 'pointer' }}><ImCross /></h6>
                  </div>

                  <div className="row">
                    <div className="col-12 mb-3">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <input
                          type="search"
                          name="text"
                          placeholder="Search by title name"
                          // value={text}
                          className='form-control py-2'
                          onChange={updateFilter}
                        />
                      </form>
                    </div>

                    <div className="col-12 mb-3">
                      <form>
                        <select onClick={changeSelectOptionHandler} onChange={updateFilter} name='categoryType'
                          className="form-select py-2" aria-label="Default select example">
                          <option hidden value=''>Select Category Type</option>
                          <option value='Vehicles'>Vehicles</option>
                          <option value='Properties'>Properties</option>
                          <option value='Electronics'>Electronics</option>
                          <option value='Human Workers'>Human Workers</option>
                          <option value='Household Goods'>Household Goods</option>
                          <option value='Other Necessities'>Other Necessities</option>
                        </select>
                      </form>
                    </div>

                    <div className="col-12 mb-3">
                      <form>
                        <select className="form-select py-2" name='categoryName' aria-label="Default select example"
                          onChange={updateFilter}>
                          <option hidden value=''>Select Category Name</option>
                          {options}
                        </select>
                      </form>
                    </div>

                    <div className="col-12 mb-3">
                      <select onClick={changeSelectLocationHandler} onChange={updateFilter} name='province'
                        className="form-select py-2 outline-0" aria-label="Default select example">
                        <option hidden value=''>Select Province</option>
                        <option value='Punjab'>Punjab</option>
                        <option value='Sindh'>Sindh</option>
                        <option value='KPK'>KPK</option>
                        <option value='Balochistan'>Balochistan</option>
                        <option value='Gilgit Baltistan'>Gilgit Baltistan</option>
                      </select>
                    </div>

                    <div className="col-12 mb-3">
                      <form>
                        <select className="form-select py-2" name='categoryName' aria-label="Default select example"
                          onChange={updateFilter}>
                          <option hidden value=''>Select City</option>
                          {locationOptions}
                        </select>
                      </form>
                    </div>

                    <div className="col-12 mb-3">
                      <form>
                        <select className="form-select py-2 outline-0" name='condition' aria-label="Default select example"
                          onChange={updateFilter}>
                          <option hidden value=''>Product Condition</option>
                          <option value='Fair'>Fair</option>
                          <option value='Good'>Good</option>
                          <option value='Excellent'>Excellent</option>
                        </select>
                      </form>
                    </div>

                    <div className="col-12 mb-4">
                      <h5>Price</h5>
                      <p className='mb-1'>{<FormatPrice price={price} />}</p>
                      <div>
                        <input type="range" name='price' max={maxPrice} min={minPrice} value={price}
                          className='w-100' onChange={updateFilter} />
                      </div>
                    </div>

                    <div className="col-12 text-center">
                      <button className='btn btn-danger text-light' onClick={clearFilter}>CLEAR FILTERS</button>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>
        </Drawer>

      </div>
    </>
  )
}
