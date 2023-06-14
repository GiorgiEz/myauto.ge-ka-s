import React, {useEffect} from 'react';
import {MultiSelect, Option} from 'react-multi-select-component';
import {useDispatch, useSelector} from "react-redux";
import {ProductsState} from "../../Redux/redux-types";
import {setDisplayedProducts, setManufacturers} from "../../Redux/Actions";
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

    useEffect(() => {
        fetch("https://static.my.ge/myauto/js/mans.json")
            .then((response) => response.json())
            .then((response) => dispatch(setManufacturers(response)))
            .catch(error => console.log(error))
    }, [dispatch])

    const displayPlaceholder = (selected: Option[]) => {
        if (selected.length === 0) return <div>მწარმოებელი</div>
    }

    const { setFieldValue } = useFormikContext();

    function handleFilterDelete(){
        const filteredProducts = filterProducts(products, filtersArray, currency)
        dispatch(setDisplayedProducts([...sortBy(sortValue, filteredProducts)]))
    }

    useEffect(() => {
        setFieldValue("manufacturers", filtersArray.manufacturers);
        handleFilterDelete()
    }, [filtersArray.manufacturers])

    return (
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
        </div>
    )
}
