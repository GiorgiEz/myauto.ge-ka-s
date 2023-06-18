import {FilterType, Manufacturer, Product} from "../Utils/types";
import {ProductsActionType} from "./redux-types";

export const setProducts = (products: Product[]): ProductsActionType => ({
    type: 'SET_PRODUCTS',
    payload: products
})

export const setDisplayedProducts = (products: Product[]): ProductsActionType => ({
    type: 'SET_DISPLAYED_PRODUCTS',
    payload: products
})

export const setManufacturers = (manufacturers: Manufacturer[]): ProductsActionType => ({
    type: "SET_MANUFACTURERS",
    payload: manufacturers
})

export const setFiltersArray = (filters: FilterType): ProductsActionType => ({
    type: "SET_FILTERS_ARRAY",
    payload: filters
})

export const setCurrency = (currency: boolean): ProductsActionType => ({
    type: "SET_CURRENCY",
    payload: currency
})

export const setLoading = (isLoading: boolean): ProductsActionType => ({
    type: "SET_LOADING",
    payload: isLoading
})

export const setSortValue = (sortValue: string): ProductsActionType => ({
    type: "SET_SORT_VALUE",
    payload: sortValue
})

export const setWindowWidth = (windowWidth: number): ProductsActionType => ({
    type: "SET_WINDOW_WIDTH",
    payload: windowWidth
})

export const setShowFiltersScreen = (filtersScreen: boolean): ProductsActionType => ({
    type: "SET_SHOW_FILTERS_SCREEN",
    payload: filtersScreen
})