// import moment from "moment";

const ProductReducer = (state, action) => {

    switch (action.type) {

        case 'SET_DATA':

            let recentItems = [...action.payload].sort((a, b) => b.uploadTime - a.uploadTime)
            let limitedRecentItems = recentItems?.slice(0, 4);

            // let yesterday = moment().subtract(170000, 'seconds').format("YYYY-MM-D, h:mm:ss a")
            // let recentData = action.payload.filter((curElem) => {
            //     return curElem.uploadTime > yesterday
            // })

            return {
                ...state,
                products: action.payload,
                recentProducts: limitedRecentItems
            }

        case 'SET_ERROR':
            return {
                ...state,
                isError: true
            }

        default:
            return state;
    }

}

export default ProductReducer; 