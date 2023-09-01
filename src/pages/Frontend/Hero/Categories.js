import React, { useEffect, useRef } from 'react'

import { Link } from 'react-router-dom'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useFilterContext } from '../../../contexts/FilterContext'
import Features from './Features'

export default function Categories() {

    const { categoryFilter } = useFilterContext()

    const ref = useRef(null)
    const inView = useInView(ref, { once: true })
    const controls = useAnimation()

    const animateText = {
        visible: { opcacity: 1, scale: 1, },
        hidden: { opcacity: 0.5, scale: 0.90, }
    }

    useEffect(() => {
        if (inView) {
            controls.start('visible')
        }
        else {
            controls.start('hidden')
        }
    }, [inView, controls])

    return (
        <>

            <div className='bg-light py-5'>
                <div className="container">

                    <div className="row">
                        <div className="col">
                            <h3 className='fw-bold text-info mb-3'>Rental Haven Categories:</h3>
                            <p className='text-muted'>These are the rental haven categories that consist of products
                                that are in high demand or are frequently searched for by user. Users can locate the
                                desired products quickly, reducing the time spent searching and enhancing the overall
                                user experience.</p>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <motion.div ref={ref} className="row text-center" variants={animateText} animate={controls}
                                initial='hidden' transition={{ duration: 2, delay: 0.25 }}>

                                <div className="col-6 col-md-4 mb-3">
                                    <Link to='/categoryType' className="link" aria-current="page"
                                        onClick={() => { categoryFilter('Vehicles') }}>Vehicles</Link>
                                </div>

                                <div className="col-6 col-md-4 mb-3">
                                    <Link to='/categoryType' className="link" aria-current="page"
                                        onClick={() => { categoryFilter('Properties') }}>Properties</Link>
                                </div>

                                <div className="col-6 col-md-4 mb-3">
                                    <Link to='/categoryType' className="link" aria-current="page"
                                        onClick={() => { categoryFilter('Electronics') }}>Electronic Appliances</Link>
                                </div>

                                <div className="col-6 col-md-4 mb-3">
                                    <Link to='/categoryType' className="link" aria-current="page"
                                        onClick={() => { categoryFilter('Human Workers') }}>Human Workers</Link>
                                </div>

                                <div className="col-6 col-md-4 mb-3">
                                    <Link to='/categoryType' className="link" aria-current="page"
                                        onClick={() => { categoryFilter('Household Goods') }}>Household Goods</Link>
                                </div>

                                <div className="col-6 col-md-4 mb-3">
                                    <Link to='/categoryType' className="link" aria-current="page"
                                        onClick={() => { categoryFilter('Other Necessities') }}>Other Necessities</Link>
                                </div>

                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="py-5 bg-light">
                <Features />
            </div>

        </>
    )
}
