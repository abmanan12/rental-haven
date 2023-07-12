import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Cart from './Cart'
import Hero from './Hero'
import MyAd from './MyAd'
import About from './About'
import Contact from './Contact'
import Products from './Products/Products'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SingalProduct from '../../components/SingalProduct'
import ListAds from './ListAds'
import Category from '../../components/Category'
import PrivateRoute from '../PrivateRoute'

export default function Index() {
    return (
        <>
            <Header />
            <main>
                <Routes >
                    <Route path='/' element={<Hero />} />
                    <Route path='/myad' element={<MyAd />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/categoryType' element={<Category />} />
                    <Route path='/singalproduct/:id' element={<SingalProduct />} />

                    <Route path='/cart' element={<PrivateRoute Component={Cart} />} />
                    <Route path='/contact' element={<PrivateRoute Component={Contact} />} />
                    <Route path='/listads' element={<PrivateRoute Component={ListAds} />} />

                </Routes>
            </main>
            <Footer />
        </>
    )
}
