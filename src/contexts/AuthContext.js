import React, { createContext, useEffect, useReducer, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, firestore } from '../config/firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

export const AuthContext = createContext()
const initialState = { isAuthenticated: false }

const reducer = (state, option) => {
    switch (option.type) {
        case 'LOGIN':
            return { isAuthenticated: true }
        case 'LOGOUT':
            return { isAuthenticated: false }
        default:
            return state
    }

}

export default function AuthContextProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [user, setUser] = useState({})
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [screenLoader, setScreenLoader] = useState(true)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setScreenLoader(false)
                setUser(user)
                fetchDocument(user)
                dispatch({ type: 'LOGIN', payload: { user } })
            }
            else {
                setScreenLoader(false)
            }
        })
    }, [])

    const fetchDocument = async (user) => {

        const q = query(collection(firestore, "Users"), where("uid", "==", user.uid));

        onSnapshot(q, (querySnapshot) => {

            querySnapshot.forEach((doc) => {
                let data = doc.data()
                setImage(data.image)
                setName(data.firstName + ' ' + data.lastName)
            })

        })

    }


    return (
        <>
            <AuthContext.Provider value={{ ...state, dispatch, user, name, image, screenLoader }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}
