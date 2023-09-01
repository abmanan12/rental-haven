import React, { useEffect, useRef } from 'react'

import moment from 'moment';
import { Link } from 'react-router-dom'
import { motion, useAnimation, useInView } from 'framer-motion';
import FormatPrice from '../Helpers/FormatPrice';

export default function Product(curElem) {

    const { productId, titleName, productImage, price, city, categoryName, uploadTime } = curElem;

    const ref = useRef(null)
    const inView = useInView(ref, { once: true })
    const controls = useAnimation()

    const animateCard = {
        visible: { opacity: 1, scale: 1, y: 0 },
        hidden: { opacity: 0, scale: 0.85, y: 20 }
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

            <div ref={ref}></div>
            <motion.div variants={animateCard} animate={controls} transition={{ duration: 2, delay: 0.25 }}
                initial='hidden' className="card rounded-0 border mx-auto my-2 cardWidt bg-white">
                <Link to={`/singalproduct/${productId}`}>
                    <figure>
                        <img src={productImage} alt={titleName} loading="lazy" className="card-img-top px-2 pt-3" />
                        <figcaption className="position-absolute border rounded-3 px-2 py-1 bg-light text-info"
                            style={{ top: 30, right: 28 }}>{categoryName}</figcaption>
                    </figure>
                </Link>

                <div className="card-body pt-0 d-flex justify-content-between">
                    <span className="card-text">{titleName.slice(0, 15)}...</span>
                    <span className="card-text">{<FormatPrice price={price} />}</span>
                </div>

                <div className="card-body pt-5 d-flex justify-content-between align-items-end">
                    <span className="card-text" style={{ fontSize: '14px' }}>{city}</span>
                    <span className="card-text" style={{ fontSize: '14px' }}>{moment(new Date(uploadTime)).fromNow()}</span>
                </div>
            </motion.div>

        </>
    )
}
