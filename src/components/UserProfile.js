import React from 'react'

import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useProductContext } from '../contexts/ProductContext'

export default function UserProfile() {

    const { profileName, profileTime, profileImage } = useProductContext()

    return (
        <>

            <div className="d-flex align-items-center">
                <div className='pe-2 pe-xl-0'>
                    {
                        !profileImage ? <Avatar style={{ width: '60px', height: '60px' }} />
                            : <Link to='/listads'><img src={profileImage} className='border' style={{ borderRadius: '50%' }}
                                alt="logo" width="60" height="60" /></Link>
                    }
                </div>
                <div className='ps-0 ps-md-2 ms-xl-4'>
                    <Link to='/listads' className='text-decoration-none'>
                        <span className='fw-bold text-muted'>{profileName}</span>
                        <span className='d-block text-muted' style={{ fontSize: '14px' }}>Member Since {profileTime}</span>
                    </Link>
                </div>
            </div>

        </>
    )
}
