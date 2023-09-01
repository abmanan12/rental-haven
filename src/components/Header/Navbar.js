import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import {
    AddToPhotosOutlined, CardTravel, List, Logout, MarkChatReadOutlined, SettingsOutlined, ShoppingCart
} from '@mui/icons-material';

import { Avatar, Button, Drawer, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { AuthContext } from '../../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useCartContext } from '../../contexts/CartContext';

export default function Navbar() {

    const [open, setOpen] = useState(false);
    const { cart } = useCartContext()
    const { user, isAuthenticated, dispatch, name, image } = useContext(AuthContext)

    let uidCart = cart?.filter((curElem) => {
        return curElem.uid === user.uid
    })
    let cartLength = uidCart?.length

    const data = [
        { name: `Cart (${cartLength})`, icon: <CardTravel />, link: '/cart' },
        { name: "Chat", icon: <MarkChatReadOutlined />, link: `/dashboard/chat/uid` },
        { name: "List Product", icon: <List />, link: '/dashboard/rent' },
        { name: "My Ads", icon: <AddToPhotosOutlined />, link: '/myad' },
        { name: "Settings", icon: <SettingsOutlined />, link: '/dashboard/setting' },
    ];


    const Navigator = useNavigate()

    const getList = () => (
        <div style={{ width: 250, marginTop: 20 }} onClick={() => setOpen(false)}>

            {data.map((item, index) => (
                <ListItem key={index}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <NavLink to={item.link} style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItemText primary={item.name} /></NavLink>
                </ListItem>
            ))}

            <Button className='fw-bold text-danger' style={{ marginLeft: '12px', marginTop: '8px' }}
                onClick={handleLogout}>{<Logout />} <span style={{ marginLeft: '30px' }}>LOGOUT</span>
            </Button>

        </div>
    )


    const handleLogout = () => {
        setOpen(false)
        signOut(auth)
            .then(() => {
                dispatch({ type: 'LOGOUT' })
                Navigator('/')
                window.tostify("User Logout Successfully", 'success')
            })
            .catch((error) => {
                window.tostify(error, 'error')
            });
    }

    return (
        <>

            {/* Navbar */}
            <nav className="navbar navbar-expand-md bg-dark">
                <div className="container">

                    <NavLink className="navbar-brand pt-2" to="/">
                        <img src="/assets/images/logoo.png"
                            alt="logo" width="140" height="60" />
                    </NavLink>

                    <button className="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon text-light"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 nav-home nav-items">
                            <li className="nav-item">
                                <NavLink to='/' className="nav-link" aria-current="page">Home</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to='/products' className="nav-link" aria-current="page">ProductS</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to='/about' className="nav-link" aria-current="page">About</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to='/contact' className="nav-link" aria-current="page">Contact</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to='/cart' className="nav-link">
                                    <span className="position-relative"><ShoppingCart style={{ fontSize: '1.4rem' }} />
                                        <span style={{ fontSize: '10px' }} className="position-absolute badge top-0  
                                         translate-middle text-info rounded-pill bg-light">{cartLength}</span>
                                    </span>
                                </NavLink>
                            </li>
                        </ul>

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 nav-home">
                            <li className="nav-item">
                                {!isAuthenticated
                                    ? <>
                                        <NavLink to='/auth/login' className="nav-link active">Login</NavLink>
                                    </>

                                    : <Button style={{ color: 'black' }} onClick={() => setOpen(true)}>
                                        <Avatar alt="User Name" loading="lazy" src={`${image}`} />
                                    </Button>
                                }
                            </li>
                        </ul>
                    </div>

                </div>

            </nav>


            {/* Drawer */}
            <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}
                PaperProps={{ sx: { backgroundColor: "#F1F1F1" } }}>

                <div className="py-4 border-bottom text-center">
                    {
                        !image ? <div className='content-center'><Avatar style={{ width: '60px', height: '60px' }} /></div>
                            : <img src={`${image}`} className='border' loading="lazy" style={{ borderRadius: '50%' }} alt="profileImg"
                                width="90" height="90" />
                    }
                    <h5 className='fw-bold mt-3'>{name}</h5>
                </div>

                {getList()}

            </Drawer>

        </>
    )
}
