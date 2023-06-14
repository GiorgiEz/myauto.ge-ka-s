import React, {useEffect} from "react";
import "./filters.css"
import {MultiSelect, Option} from "react-multi-select-component";
import {CustomItemRenderer, filterProducts} from "../../Filters/DisplayFilters";
import {useField, useFormikContext} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {ProductsState} from "../../Redux/redux-types";
import {setDisplayedProducts} from "../../Redux/Actions";
import {sortBy} from "../../Sorting/sortBy";

const options = [
    { value: 'იყიდება', label: 'იყიდება' },
    { value: 'ქირავდება', label: 'ქირავდება' },
]

export function DealTypeFilter(){
    const dispatch = useDispatch()
    const products = useSelector((state: ProductsState) => state.products)
    const currency = useSelector((state: ProductsState) => state.currency)
    const sortValue = useSelector((state: ProductsState) => state.sortValue)
    const filtersArray = useSelector((state: ProductsState) => state.filtersArray)
    const [field, , helpers] = useField("dealType");

    const { setFieldValue } = useFormikContext();

    function handleFilterDelete(){
        const filteredProducts = filterProducts(products, filtersArray, currency)
        dispatch(setDisplayedProducts([...sortBy(sortValue, filteredProducts)]))
    }

    useEffect(() => {
        setFieldValue("dealType", filtersArray.dealType);
        handleFilterDelete()
    }, [filtersArray.dealType])

    const displayPlaceholder = (selected: Option[]) => {
        if (selected.length === 0) return <div>გარიგების ტიპი</div>
    }

    const handleChange = (selected: Option[]) => {
        if (selected.length === 2) helpers.setValue([selected[1]])
        else helpers.setValue(selected)
    }

    return (
        <div style={{marginBottom: "10px"}}>
            <label htmlFor="deal-type-select">გარიგების ტიპი</label>
            <MultiSelect
                value={field.value}
                options={options}
                onChange={handleChange}
                valueRenderer={displayPlaceholder}
                className="dark"
                hasSelectAll={false}
                labelledBy={"deal-type-select"}
                ItemRenderer={CustomItemRenderer}
                disableSearch={true}
            />
        </div>
    )
}
