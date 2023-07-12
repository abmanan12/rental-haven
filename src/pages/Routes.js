import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Auth from './Auth'
import Frontend from './Frontend'
import Dashboard from './Dashboard'
import ScreenLoader from './Frontend/ScreenLoader'
import { AuthContext } from '../contexts/AuthContext'

import PrivateRoute from './PrivateRoute'

export default function Index() {

    const { screenLoader, isAuthenticated } = useContext(AuthContext)

    if (screenLoader) {
        return <ScreenLoader />
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/*' element={<Frontend />} />
                    <Route path='/dashboard/*' element={<PrivateRoute Component={Dashboard} />} />
                    <Route path='/auth/*' element={!isAuthenticated ? <Auth /> : <Navigate to='/' replace />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
