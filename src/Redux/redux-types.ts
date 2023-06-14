import {FilterType, Manufacturer, Product} from "../Utils/types";

export interface ProductsState {
    readonly products: Product[];
    readonly displayedProducts: Product[];
    readonly filtersArray: FilterType
    readonly manufacturers: Manufacturer[]
    readonly currency: boolean
    readonly isLoading: boolean
    readonly sortValue: string
}

export type ProductsActionType =
    | { type: 'SET_PRODUCTS'; payload: Product[] }
    | { type: 'SET_DISPLAYED_PRODUCTS'; payload: Product[] }
    | { type: 'SET_FILTERS_ARRAY'; payload: FilterType }
    | { type: "SET_MANUFACTURERS"; payload: Manufacturer[] }
    | { type: 'SET_CURRENCY'; payload: boolean }
    | { type: "SET_LOADING"; payload: boolean }
    | { type: "SET_SORT_VALUE"; payload: string }
