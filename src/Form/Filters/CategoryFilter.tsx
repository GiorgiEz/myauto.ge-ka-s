import React, {useEffect, useState} from "react";
import {Category} from "../../Utils/types";
import {MultiSelect, Option} from "react-multi-select-component";
import {CustomItemRenderer, filterProducts} from "../../Filters/DisplayFilters";
import {useField, useFormikContext} from "formik";
import {setDisplayedProducts} from "../../Redux/Actions";
import {sortBy} from "../../Sorting/sortBy";
import {useDispatch, useSelector} from "react-redux";
import {ProductsState} from "../../Redux/redux-types";

export function CategoryFilter(){
    const dispatch = useDispatch()
    const [field, , helpers] = useField("categories");
    const [categories, setCategories] = useState<Category[]>([])
    const products = useSelector((state: ProductsState) => state.products)
    const currency = useSelector((state: ProductsState) => state.currency)
    const sortValue = useSelector((state: ProductsState) => state.sortValue)
    const filtersArray = useSelector((state: ProductsState) => state.filtersArray)

    useEffect(() => {
        fetch("https://api2.myauto.ge/ka/cats/get")
            .then((response) => response.json())
            .then((response) => setCategories(response.data))
            .catch(error => console.log(error))
    }, [])

    const displayPlaceholder = (selected: Option[]) => {
        if (selected.length === 0) return <div>კატეგორია</div>
    }

    const { setFieldValue } = useFormikContext();

    function handleFilterDelete(){
        const filteredProducts = filterProducts(products, filtersArray, currency)
        dispatch(setDisplayedProducts([...sortBy(sortValue, filteredProducts)]))
    }

    useEffect(() => {
        setFieldValue("categories", filtersArray.categories);
        handleFilterDelete()
    }, [filtersArray.categories])

    return (
        <div className="multiselect-container">
            <label htmlFor="category-select">კატეგორია</label>
            <MultiSelect
                options={categories.map((cat) => ({label: cat.title, value: cat.category_id,}))}
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
