import React from 'react'

export default function FooterBottom() {

    let year = new Date().getFullYear()

    return (
        <div className="text-center p-2 p-sm-3 mt-5 bg-dark text-light">
            Copyright &copy; {year}. Developed by Abdul Manan. All rights reserved.
        </div>
    )
}
