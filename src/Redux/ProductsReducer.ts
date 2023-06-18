import {ProductsActionType, ProductsState} from "./redux-types";

const initialState: ProductsState = {
    products: [],
    displayedProducts: [],
    manufacturers: [],
    filtersArray: {
        period: "",
        dealType: [],
        manufacturers: [],
        models: [],
        categories: [],
        priceFrom: "",
        priceTo: ""
    },
    isLoading: true,
    currency: true,
    sortValue: "",
    windowWidth: window.innerWidth,
    showFiltersScreen: false
}

export const ProductsReducer = (state = initialState, action: ProductsActionType) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload}
        case 'SET_DISPLAYED_PRODUCTS':
            return { ...state, displayedProducts: action.payload}
        case "SET_MANUFACTURERS":
            return { ...state, manufacturers: action.payload}
        case "SET_FILTERS_ARRAY":
            return { ...state, filtersArray: action.payload}
        case 'SET_CURRENCY':
            return { ...state, currency: action.payload}
        case "SET_LOADING":
            return { ...state, isLoading: action.payload}
        case "SET_SORT_VALUE":
            return { ...state, sortValue: action.payload}
        case "SET_WINDOW_WIDTH":
            return { ...state, windowWidth: action.payload}
        case "SET_SHOW_FILTERS_SCREEN":
            return { ...state, showFiltersScreen: action.payload}
        default:
            return state;
    }
}
