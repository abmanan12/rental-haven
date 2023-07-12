import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function PrivateRoute({ Component }) {

    const { isAuthenticated } = useContext(AuthContext)

    if (!isAuthenticated) {
        return <Navigate to='/auth/login' replace />
    }

    return (
        <>
            <Component />
        </>
    )
}
