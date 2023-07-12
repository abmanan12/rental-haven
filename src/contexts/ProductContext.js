import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'

import reducer from '../reducers/ProductReducer'

import { firestore } from '../config/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

const ProductContext = createContext()

const initialState = {
    isError: false,
    products: [],
    recentProducts: [],
}

export default function ProductContextProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [userId, setUserId] = useState('')
    const [profileName, setProfileName] = useState('')
    const [profileTime, setProfileTime] = useState('')
    const [profileImage, setProfileImage] = useState('')

    const fetchDocument = async () => {

        const q = query(collection(firestore, "ListProducts"));

        onSnapshot(q, (querySnapshot) => {

            let products = []

            querySnapshot.forEach((doc) => {
                let data = doc.data()
                products.push(data)
            })

            if (!products.length) {
                dispatch({ type: 'SET_ERROR' })
            }
            else {
                dispatch({ type: 'SET_DATA', payload: products })
            }

        })

    }

    const userProfile = async (id) => {

        const q = query(collection(firestore, "Users"));

        onSnapshot(q, (querySnapshot) => {

            let profileData = []

            querySnapshot.forEach((doc) => {
                let data = doc.data()
                profileData.push(data)
            })

            if (profileData) {
                let userProfileData = profileData.filter(curElem => {
                    return curElem.uid === id
                })
                if (userProfileData.length) {
                    var singleObj = Object.assign({}, ...userProfileData)
                    const { firstName, lastName, image, createdAt } = singleObj
                    setProfileName(`${firstName} ${lastName}`)
                    setUserId(id)
                    setProfileImage(image)
                    setProfileTime(createdAt)
                }
            }

        })

    }

    useEffect(() => {
        fetchDocument()
    }, [])

    return (
        <>
            <ProductContext.Provider value={{ ...state, userId, userProfile, profileName, profileTime, profileImage }}>
                {children}
            </ProductContext.Provider>
        </>
    )
}

export const useProductContext = () => {
    return useContext(ProductContext)
}
