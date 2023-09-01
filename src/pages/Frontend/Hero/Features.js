import React, { useEffect, useRef } from 'react'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, useAnimation, useInView } from 'framer-motion'

import { IoIosListBox } from "react-icons/io";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";

export default function Features() {

    const ref = useRef(null)
    const inView = useInView(ref, { once: true })
    const controls = useAnimation()

    const animateText = {
        visible: { opcacity: 1, scale: 1, y: 0 },
        hidden: { opcacity: 0, scale: 0.80, y: 30 }
    }

    useEffect(() => {
        if (inView) {
            controls.start('visible')
        }
        else {
            controls.start('hidden')
        }
    }, [inView, controls])

    var settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 1000,
        autoplay: true,
        slidesToShow: 1,
    };



    return (
        <>

            <div className="container shadow-none">

                <div className='heroText' style={{ color: '#212121' }}>
                    <h3 className='typing-demo mb-3 text-info'>Rental Haven Features</h3>
                </div>

                <Slider {...settings}>
                    <div className='text-muted'>
                        List your items for rent and reach a wider audience. Share your vehicles, electronics,
                        properties, workers, and household goods with those in need. Start monetizing your
                        unused assets and make renting a seamless experience for others.
                    </div>

                    <div className='text-muted'>
                        Discover a vast selection of rental products across various categories. From vehicles
                        to electronics, properties to workers, find exactly what you need and connect directly
                        with the owners. Browse, compare, and add items to your cart effortlessly.
                    </div>

                    <div className='text-muted'>
                        Our platform facilitates seamless communication between borrowers and renters. Contact
                        the item owners directly, negotiate terms, and ensure a smooth rental experience. Build
                        trust and establish mutually beneficial relationships.
                    </div>

                    <div className='text-muted'>
                        Simplify your rental process with our intuitive cart system. Add multiple items of interest,
                        manage your selections, and easily proceed to checkout. Enjoy a hassle-free renting journey
                        from start to finish.
                    </div>
                </Slider>

            </div>

            <div className="container mt-3 mt-sm-4 px-4 px-lg-5">
                <div className="row" ref={ref} >

                    <motion.div className="col-6 col-md-3" variants={animateText} animate={controls} initial='hidden'
                        transition={{ duration: 2, delay: 0.25 }}>
                        <p className='text-muted hero-icons'><IoIosListBox /></p>
                        <p className='text-muted hero-icon-text'>Listing Items</p>
                    </motion.div>

                    <motion.div className="col-6 col-md-3" variants={animateText} animate={controls} initial='hidden'
                        transition={{ duration: 2, delay: 0.25 }}>
                        <p className='text-muted hero-icons'><AiOutlineFileSearch /></p>
                        <p className='text-muted hero-icon-text'>Search & Filtering</p>
                    </motion.div>

                    <motion.div className="col-6 col-md-3" variants={animateText} animate={controls} initial='hidden'
                        transition={{ duration: 2, delay: 0.25 }}>
                        <p className='text-muted hero-icons'><BsFillCartCheckFill /></p>
                        <p className='text-muted hero-icon-text'>Favourite Items</p>
                    </motion.div>

                    <motion.div className="col-6 col-md-3" variants={animateText} animate={controls} initial='hidden'
                        transition={{ duration: 2, delay: 0.25 }}>
                        <p className='text-muted hero-icons'><AiFillMessage /></p>
                        <p className='text-muted hero-icon-text'>Messaging & Communication</p>
                    </motion.div>

                </div>
            </div>

        </>
    )
}
