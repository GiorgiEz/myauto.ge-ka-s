import React, {useEffect} from "react";
import "../Sorting/sorting.css"
import {setDisplayedProducts, setFiltersArray} from "../Redux/Actions";
import {useDispatch, useSelector} from "react-redux";
import {ProductsState} from "../Redux/redux-types";
import Select from 'react-select';
import {Period, Product} from "../Utils/types";
import {customStyles, filterProducts} from "./DisplayFilters";
import {sortBy} from "../Sorting/sortBy";
import {Option} from "react-multi-select-component";

const options = [
    {value: '', label: 'Period', isHidden: true, isDisabled: true},
    {value: '1', label: '1 hour'},
    {value: '2', label: '2 hours'},
    {value: '3', label: '3 hours'},
    {value: '24', label: '1 day'},
    {value: '48', label: '2 days'},
    {value: '72', label: '3 days'},
    {value: '168', label: '1 week'},
    {value: '336', label: '2 weeks'},
    {value: '504', label: '3 weeks'},
]

export function PeriodFilter() {
    const dispatch = useDispatch()
    const filtersArray = useSelector((state: ProductsState) => state.filtersArray)
    const products = useSelector((state: ProductsState) => state.products)
    const currency = useSelector((state: ProductsState) => state.currency)
    const sortValue = useSelector((state: ProductsState) => state.sortValue)

    useEffect(() => {
        let filteredProducts: Product[] = filterProducts(products, filtersArray, currency)
        dispatch(setDisplayedProducts([...sortBy(sortValue, filteredProducts)]))
    }, [filtersArray.period])

    const handlePeriodSelect = (selectedOption: Option | null) => {
        const selectedValue = selectedOption ? selectedOption.value : '';
        dispatch(setFiltersArray({ ...filtersArray, period: selectedValue as Period }));
    }

    return (
        <div>
            <Select
                id="period-select"
                value={options.find(option => option.value === filtersArray.period)}
                onChange={handlePeriodSelect}
                options={options.filter(option => option.value !== filtersArray.period)}
                placeholder="Period"
                styles={customStyles}
                isSearchable={false}
                className={"period-select"}
            />
        </div>
    )
}
