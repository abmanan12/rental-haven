const cartReducer = (state, { type, payload }) => {

    if (type === 'ADD_TO_CART') {

        let { singleProductData, uid } = payload;

        let existing = state.cart.find((curElem) => {
            return curElem.productId === singleProductData.productId
        })

        if (!existing) {
            let cartProduct = {
                uid: uid,
                productId: singleProductData.productId,
                titleName: singleProductData.titleName,
                price: singleProductData.price,
                productImage: singleProductData.productImage,
            }

            return {
                ...state,
                cart: [...state.cart, cartProduct],
                error: false
            }

        }
        else {
            return {
                ...state,
                cart: [...state.cart],
                error: true
            }
        }


    }


    if (type === 'REMOVE_ITEM') {

        let updateCart = state.cart.filter((curElem) => {
            return curElem.productId !== payload
        })

        return {
            ...state,
            cart: updateCart
        }
    }


    if (type === 'CLEAR_CART') {
        return {
            cart: []
        }
    }

    return state;

}

export default cartReducer
