import React, { useEffect, useRef } from 'react'

// import Slider from 'react-slick'
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, useAnimation, useInView } from 'framer-motion'

// import { IoIosListBox } from "react-icons/io";
// import { AiOutlineFileSearch } from "react-icons/ai";
// import { BsFillCartCheckFill } from "react-icons/bs";
// import { AiFillMessage } from "react-icons/ai";
import Features from './Features';

export default function HeroSection() {

    const ref = useRef(null)
    const inView = useInView(ref, { once: true })
    const controls = useAnimation()

    const animateImg = {
        visible: { opcacity: 1, scale: 1, y: 0 },
        hidden: { opcacity: 0, scale: 0.75, y: 20 }
    }
    const animateText = {
        visible: { opcacity: 1, scale: 1, y: 0 },
        hidden: { opcacity: 0, scale: 0.90, y: 30 }
    }

    useEffect(() => {
        if (inView) {
            controls.start('visible')
        }
        else {
            controls.start('hidden')
        }
    }, [inView, controls])

    // var settings = {
    //     dots: false,
    //     arrows: false,
    //     infinite: true,
    //     speed: 1000,
    //     autoplay: true,
    //     slidesToShow: 1,
    // };


    return (

        <>

            <div ref={ref}></div>
            <div className='pt-5 bg-primary' style={{ paddingBottom: '60px' }}>
                <div className="container content-center">
                    <div className="row align-items-center">

                        <motion.div variants={animateText} animate={controls} transition={{ duration: 2, delay: 0.25 }}
                            initial='hidden' className="col-12 col-md-6 px-4 px-lg-5">
                            <h2 className='fw-bold text-light'>Find Your Perfect Rental Solution</h2>
                            <p className='text-secondary'>Welcome to our comprehensive rental platform, where you
                                can find everything you need in one place. We have a wide range of options available
                                for you to rent so, Browse our extensive collection and make renting a convenient
                                and hassle-free experience for all your needs.</p>
                            <Link to='/products' className='btn btn-1 mt-2'>GET STARTED</Link>
                        </motion.div>

                        <motion.div variants={animateImg} animate={controls} transition={{ duration: 2, delay: 0.25 }}
                            initial='hidden' className="col-12 col-md-6 text-center mt-5 mt-md-0">
                            <img className='home-imge' src="https://png.pngtree.com/png-vector/20220521/ourmid/pngtree-car-rental-and-traveling-by-vehicle-with-family-png-image_4708588.png"
                                alt="home" style={{ width: '90%', borderRadius: '5%' }} />
                        </motion.div>
                    </div>
                </div>
            </div>


            <div className="py-5">
                {/* <div className="container shadow-none px-4 px-lg-5">

                    <div className='heroText'>
                        <h3 className='typing-demo mb-3'>Rental Haven Features</h3>
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

                </div> */}

                <Features />

                {/* <div className="container mt-3 mt-sm-4 px-4 px-lg-5">
                    <motion.div className="row" variants={animateText} animate={controls} transition={{ duration: 2, delay: 0.25 }}
                        initial='hidden'>

                        <div className="col-6 col-md-3">
                            <p className='text-muted hero-icons'><IoIosListBox /></p>
                            <p className='text-muted hero-icon-text'>Listing Items</p>
                        </div>

                        <div className="col-6 col-md-3">
                            <p className='text-muted hero-icons'><AiOutlineFileSearch /></p>
                            <p className='text-muted hero-icon-text'>Search & Filtering</p>
                        </div>

                        <div className="col-6 col-md-3">
                            <p className='text-muted hero-icons'><BsFillCartCheckFill /></p>
                            <p className='text-muted hero-icon-text'>Favourite Items</p>
                        </div>

                        <div className="col-6 col-md-3">
                            <p className='text-muted hero-icons'><AiFillMessage /></p>
                            <p className='text-muted hero-icon-text'>Messaging & Communication</p>
                        </div>

                    </motion.div>
                </div> */}

            </div>

        </>

    )
}
