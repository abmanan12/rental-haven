import React from 'react'
import { BiArrowBack } from 'react-icons/bi'

import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-2">
                <div className="fluid-container">
                    <div className="row">
                        <div className="col">

                            <div className='ms-4' onClick={() => navigate(-1)}>
                                <BiArrowBack className='fs-4 text-light' />
                                <span className='ms-3'><img src="/assets/images/logoo.png"
                                    alt="logo" width="140" height="60" /></span>
                            </div>

                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
