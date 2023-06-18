import React, {useEffect} from 'react';
import {MultiSelect, Option} from 'react-multi-select-component';
import {useDispatch, useSelector} from "react-redux";
import {ProductsState} from "../../Redux/redux-types";
import {setDisplayedProducts} from "../../Redux/Actions";
import "./filters.css"
import {CustomItemRenderer, filterProducts} from "../../Filters/DisplayFilters";
import {useField, useFormikContext} from "formik";
import {sortBy} from "../../Sorting/sortBy";

export function ManufacturerFilter() {
    const [field, , helpers] = useField("manufacturers");
    const dispatch = useDispatch()
    const manufacturers = useSelector((state: ProductsState) => state.manufacturers)
    const products = useSelector((state: ProductsState) => state.products)
    const currency = useSelector((state: ProductsState) => state.currency)
    const sortValue = useSelector((state: ProductsState) => state.sortValue)
    const filtersArray = useSelector((state: ProductsState) => state.filtersArray)
    const showFiltersScreen = useSelector((state: ProductsState) => state.showFiltersScreen)
    const windowWidth = useSelector((state: ProductsState) => state.windowWidth)

    const { setFieldValue } = useFormikContext();

    function handleFilterDelete(){
        const filteredProducts = filterProducts(products, filtersArray, currency)
        dispatch(setDisplayedProducts([...sortBy(sortValue, filteredProducts)]))
    }

    useEffect(() => {
        setFieldValue("manufacturers", filtersArray.manufacturers);
        handleFilterDelete()
    }, [filtersArray.manufacturers])

    const displayPlaceholder = (selected: Option[]) => {
        if (selected.length === 0) return <div>მწარმოებელი</div>
    }

    return (
        <div>
            {showFiltersScreen || windowWidth > 1125 ?
                <div className="multiselect-container">
                    <label htmlFor="manufacturer-select">მწარმოებელი</label>
                    <MultiSelect
                        options={manufacturers.map((man) => ({ label: man.man_name, value: man.man_id }))}
                        value={field.value}
                        labelledBy="manufacturer-select"
                        className="dark"
                        onChange={(selected: Option[]) => helpers.setValue(selected)}
                        valueRenderer={displayPlaceholder}
                        hasSelectAll={false}
                        ItemRenderer={CustomItemRenderer}
                    />
                </div> : ""
            }
        </div>
    )
}
