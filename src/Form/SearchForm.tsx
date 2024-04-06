import React from "react"
import {Formik, Form, Field} from "formik";
import {DealTypeFilter} from "./FormFilters/DealTypeFilter";
import {ManufacturerFilter} from "./FormFilters/MansFilter";
import {ModelFilter} from "./FormFilters/ModelFilter";
import {CategoryFilter} from "./FormFilters/CategoryFilter";
import {PriceFilter} from "./FormFilters/PriceFilter";
import {useDispatch, useSelector} from "react-redux";
import {ProductsState} from "../Redux/redux-types";
import {FormFilterType, Product} from "../Utils/types";
import {setDisplayedProducts, setFiltersArray, setLoading, setShowFiltersScreen} from "../Redux/Actions";
import {sortBy} from "../Sorting/sortBy";
import {filterProducts} from "../Filters/DisplayFilters";

export function SearchForm(){
    const dispatch = useDispatch()
    const products = useSelector((state: ProductsState) => state.products)
    const currency = useSelector((state: ProductsState) => state.currency)
    const filtersArray = useSelector((state: ProductsState) => state.filtersArray)
    const sortValue = useSelector((state: ProductsState) => state.sortValue)
    const showFiltersScreen = useSelector((state: ProductsState) => state.showFiltersScreen)
    const windowWidth = useSelector((state: ProductsState) => state.windowWidth)

    const handleSubmit = (values: typeof initialValues) => {
        let filteredProducts: Product[] = filterProducts(products, filtersArray, currency)
        dispatch(setFiltersArray({...filtersArray, ...values}))
        dispatch(setDisplayedProducts([...sortBy(sortValue, filteredProducts)]))
    }

    const initialValues: FormFilterType = {
        dealType: [],
        manufacturers: [],
        models: [],
        categories: [],
        priceFrom: "",
        priceTo: "",
    }

    const onSubmit = (values: typeof initialValues) => {
        dispatch(setLoading(true))
        setTimeout(() => {
            handleSubmit(values)
            dispatch(setLoading(false))
            dispatch(setShowFiltersScreen(false))
        }, 500)
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form>
                <Field name={"dealType"} as={DealTypeFilter}></Field>
                <Field name={"manufacturers"} as={ManufacturerFilter}></Field>
                <Field name={"models"} as={ModelFilter}></Field>
                <Field name={"categories"} as={CategoryFilter}></Field>
                <Field name={"price"} as={PriceFilter}></Field>

                {showFiltersScreen || windowWidth > 1125 ? <button className={"button-search"} type={"submit"}>search</button> : ""}
            </Form>
        </Formik>
    )
}
