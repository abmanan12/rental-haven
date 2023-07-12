import React, { useEffect, useRef } from 'react'
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useFilterContext } from '../contexts/FilterContext';
import FilterSection from './FilterSection';

export default function Sort() {

  const { gridView, filterProducts, setGridView, setListView, sorting } = useFilterContext()

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
      <div className=''>
        <div className="container-fluid">

          <div className="row d-flex">

            <div className="ps-sm-5 col-5 col-sm-6 mb-4">
              <button className={gridView ? 'gridBtn gridActive' : 'gridBtn'}
                onClick={setGridView}><BsFillGridFill /></button>

              <button className={!gridView ? 'gridBtn gridActive ms-2' : 'gridBtn ms-2'}
                onClick={setListView}><BsList /></button>
            </div>

            <div className="col-7 col-sm-6 mb-4">{filterProducts.length} Products Available</div>

            <div className="ps-sm-5 col-5 col-sm-6">
              <FilterSection />
            </div>

            <div className="col-7 col-sm-6">
              <form>
                <select
                  name="sort" id="sort" onClick={sorting} className="form-control sortWidth">
                  <option value="lowest">Price (lowest)</option>
                  <option value="#" disabled></option>
                  <option value="highest">Price (highest)</option>
                  <option value="#" disabled></option>
                  <option value="a-z">Title Name (a-z)</option>
                  <option value="#" disabled></option>
                  <option value="z-a">Title Name (z-a)</option>
                </select>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
