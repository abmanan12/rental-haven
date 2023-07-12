import React, { createContext, useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/cartReducer'

const CartContext = createContext()

const getLocalCartData = () => {
    let localCartData = localStorage.getItem("rentCart");
    if (localCartData === null) {
        return [];
    } else {
        return JSON.parse(localCartData);
    }
}

const initialState = {
    cart: getLocalCartData(),
    error: false
}

export default function CartContextProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)

    const addToCart = (singleProductData, uid) => {
        dispatch({ type: 'ADD_TO_CART', payload: { singleProductData, uid } })
    }


    const removeItem = productId => {
        dispatch({ type: 'REMOVE_ITEM', payload: productId })
    }

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' })
    }

    useEffect(() => {
        localStorage.setItem("rentCart", JSON.stringify(state.cart));
    }, [state.cart]);

    return (
        <>
            <CartContext.Provider value={{ ...state, addToCart, removeItem, clearCart }}>
                {children}
            </CartContext.Provider>
        </>
    )
}

export const useCartContext = () => {
    return useContext(CartContext)
} 
