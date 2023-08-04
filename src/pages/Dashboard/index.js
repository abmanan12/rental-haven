import React from 'react'
import Hero from './Hero'
import { Route, Routes } from 'react-router-dom'

import Rent from './Rent'
import Navbar from './Navbar'
import Chat from './Chat'
import Settings from './Settings'
// import ChangeInfo from './Settings/ChangeInfo'
// import FooterBottom from '../../components/Footer/FooterBottom'

export default function Index() {
    return (
        <>
            <Navbar />
            <main>
                <Routes >
                    {/* <Route path='/' element={<Hero />} /> */}
                    <Route path='/rent' element={<Rent />} />
                    <Route path='/chat/:uid' element={<Chat />} />
                    <Route path='/setting' element={<Settings />} />
                </Routes>
            </main>
            {/* <FooterBottom /> */}
        </>
    )
}
