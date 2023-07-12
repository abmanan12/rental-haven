import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { useProductContext } from './ProductContext'
import reducer from '../reducers/FilterReducer'

const FilterContext = createContext()

const initialState = {
    filterProducts: [],
    allProducts: [],
    gridView: true,
    sortingValue: "lowest",
    filters: {
        text: '',
        cities: 'all',
        province: 'all',
        condition: 'all',
        categoryName: "all",
        categoryType: "all",
        price: 0,
        maxPrice: 0,
        minPrice: 0,
    }
}

export default function FilterContextProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [categoryType, setCategoryType] = useState('')
    const { products } = useProductContext()

    const setGridView = () => {
        return dispatch({ type: "SET_GRID_VIEW" });
    };

    const setListView = () => {
        return dispatch({ type: "SET_LIST_VIEW" });
    };

    const sorting = e => {
        let seletValue = e.target.value
        dispatch({ type: 'GET_SORT_VALUE', payload: seletValue })
    }

    const updateFilter = e => {
        let name = e.target.name
        let value = e.target.value

        return dispatch({ type: 'UPDATE_FILTER_VALUE', payload: { name, value } })
    }

    const categoryFilter = (categoryValue) => {
        setCategoryType(categoryValue)
    }

    const clearFilter = e => {
        e.preventDefault()
        dispatch({ type: 'CLEAR_FILTER' })
    }

    useEffect(() => {
        dispatch({ type: 'FILTER_PRODUCTS' })
        dispatch({ type: 'SORTING_PRODUCTS' })
    }, [products, state.sortingValue, state.filters])

    useEffect(() => {
        dispatch({ type: 'LOAD_FILTER_PRODUCTS', payload: products })
    }, [products])

    return (
        <>
            <FilterContext.Provider value={{
                ...state, setGridView, setListView, sorting, updateFilter, clearFilter, products, categoryFilter, categoryType
            }}>
                {children}
            </FilterContext.Provider>
        </>
    )
}

export const useFilterContext = () => {
    return useContext(FilterContext)
}