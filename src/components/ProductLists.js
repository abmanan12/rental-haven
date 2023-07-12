import React from 'react'
import GridView from './GridView'
import ListView from './ListView';

import { useFilterContext } from '../contexts/FilterContext'

export default function ProductLists() {

    const { filterProducts, gridView } = useFilterContext()

    if (gridView === true) {
        return <GridView products={filterProducts} />;
    }

    if (gridView === false) {
        return <ListView products={filterProducts} />;
    }

}
