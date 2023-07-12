import React from 'react'

import UserProfile from '../../../components/UserProfile';
import Product from '../../../components/Product';
import { useProductContext } from '../../../contexts/ProductContext';

export default function ListAds() {

    const { userId, products } = useProductContext()

    const listAds = products.filter(curElem => {
        return curElem.uid === userId
    })

    return (
        <>

            <div className='py-5'>

                <div className="container-fluid">
                    <div className="row px-2 px-sm-3">
                        <UserProfile />
                    </div>
                </div>

                <div className="container-fluid mt-5">

                    {
                        !listAds.length ? <div className="py-5 text-center">No Product Exist</div>
                            : <>
                                <div className="row mt-2">
                                    {
                                        listAds.map((curElem, i) => {
                                            return (
                                                <div className="col-12 col-sm-6 col-md-4 col-xl-3" key={i}>
                                                    <Product {...curElem} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>
                    }
                </div>

            </div>

        </>
    )
}
