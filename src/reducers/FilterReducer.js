const FilterReducer = (state, action) => {

    switch (action.type) {

        case 'LOAD_FILTER_PRODUCTS':

            let priceArr = action.payload.map((curElem) => curElem.price);

            let maxPrice = priceArr.reduce(
                (initialVal, curVal) => Math.max(initialVal, curVal),
                0
            )

            return {
                ...state,
                filterProducts: [...action.payload],
                allProducts: [...action.payload],
                filters: {
                    ...state.filters, maxPrice, price: maxPrice
                }
            }

        case 'SET_GRID_VIEW':
            return {
                ...state,
                gridView: true,
            }

        case 'SET_LIST_VIEW':
            return {
                ...state,
                gridView: false,
            }

        case 'GET_SORT_VALUE':

            return {
                ...state,
                sortingValue: action.payload
            }

        case 'SORTING_PRODUCTS':

            let newSortData;
            const { filterProducts, sortingValue } = state
            let tempSortData = [...filterProducts];

            newSortData = tempSortData.sort((a, b) => {
                if (sortingValue === 'lowest') {
                    return a.price - b.price
                }
                if (sortingValue === 'highest') {
                    return b.price - a.price
                }
                if (sortingValue === 'a-z') {
                    return a.titleName.localeCompare(b.titleName)
                }
                if (sortingValue === 'z-a') {
                    return b.titleName.localeCompare(a.titleName)
                }
            })

            return {
                ...state,
                filterProducts: newSortData
            }

        case "UPDATE_FILTER_VALUE":
            const { name, value } = action.payload;

            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value,
                },
            }

        case 'FILTER_PRODUCTS':

            let { allProducts } = state;
            let tempFilterProduct = [...allProducts];

            const { text, price, categoryName, categoryType, cities, condition, province } = state.filters;

            if (text) {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.titleName.toLowerCase().includes(text.toLowerCase());
                });
            }

            if (categoryName !== 'all') {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.categoryName === categoryName;
                });
            }

            if (categoryType !== 'all') {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.categoryType.toLowerCase() === categoryType.toLowerCase()
                });
            }

            if (cities !== 'all') {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.cities.toLowerCase() === cities.toLowerCase()
                });
            }

            if (province !== 'all') {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.province.toLowerCase() === province.toLowerCase()
                });
            }

            if (condition !== 'all') {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.condition.toLowerCase() === condition.toLowerCase()
                });
            }

            if (price) {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.price <= parseInt(price)
                });
            }

            return {
                ...state,
                filterProducts: tempFilterProduct,
            }

        case 'CLEAR_FILTER':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: '',
                    cities: 'all',
                    condition: 'all',
                    categoryName: 'all',
                    categoryType: 'all',
                    maxPrice: state.filters.maxPrice,
                    price: state.filters.maxPrice,
                    minPrice: 0,
                }
            }


        default:
            return state;

    }

}

export default FilterReducer;