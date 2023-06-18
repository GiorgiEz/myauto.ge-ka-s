import "./search_filters.css"
import React from "react";
import {Icons} from "../Utils/Icons";
import {CustomCheckboxType, FilterType, Product} from "../Utils/types";
import {SearchForm} from "../Form/SearchForm";
import {
    filterByCategories,
    filterByDealType,
    filterByManufacturers,
    filterByModels,
    filterByPeriod,
    filterByPriceFrom, filterByPriceTo
} from "./filterBy";
import {useSelector} from "react-redux";
import {ProductsState} from "../Redux/redux-types";

//custom styles for react-select component
export const customStyles = {
    control: (provided:any) => ({
        ...provided,
        marginRight: "5px",
        backgroundColor: '#f2f3f6',
        borderColor: '#b4b6b6',
        borderRadius: "7px",
        boxShadow: 'none',
        ':hover': {
            borderRadius: "7px",
            borderColor: 'black',
        },
    }),
    option: (provided:any, state:any) => ({
        ...provided,
        color: state.isFocused ? 'black' : '#8b8d8d',
        backgroundColor: state.isDisabled ? '#f2f3f6' : 'transparent',
        cursor: 'pointer',
        display: state.data.isHidden ? 'none' : 'block',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    placeholder: (provided: any) => ({
        ...provided,
        color: 'black',
    }),
}

//Custom checkbox for MultiSelect components
export const CustomItemRenderer: React.FC<CustomCheckboxType> = ({ option, checked, onClick }) => {
    return (
        <div style={{ display: "flex" }}>
            <input
                type="checkbox"
                id={"deal-type-checkbox"}
                checked={checked}
                onChange={onClick}
                className={"custom-checkbox"}
            />
            <div className={"checkbox-label"}>{option.label}</div>
        </div>
    )
}

export function filterProducts(products: Product[], filtersArray: FilterType, currency: boolean){
    let filteredProducts: Product[] = [...products]
    if (filtersArray.dealType) filteredProducts = filterByDealType(filteredProducts, filtersArray.dealType)
    if (filtersArray.period) filteredProducts = filterByPeriod(filteredProducts, filtersArray.period)
    if (filtersArray.manufacturers.length) filteredProducts = filterByManufacturers(filteredProducts, filtersArray.manufacturers)
    if (filtersArray.models.length) filteredProducts = filterByModels(filteredProducts, filtersArray.models)
    if (filtersArray.categories.length) filteredProducts = filterByCategories(filteredProducts, filtersArray.categories)
    if (filtersArray.priceFrom) filteredProducts = filterByPriceFrom(filteredProducts, filtersArray.priceFrom, currency)
    if (filtersArray.priceTo) filteredProducts = filterByPriceTo(filteredProducts, filtersArray.priceTo, currency)

    return filteredProducts
}

//filter form
export function DisplayFilters() {
    const windowWidth = useSelector((state: ProductsState) => state.windowWidth)
    const showFiltersScreen = useSelector((state: ProductsState) => state.showFiltersScreen)

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            {windowWidth > 1125 ? <div style={{display: "flex", fontWeight: "100"}}>
                <button className={"menu-buttons"}>მთავარი</button><h6>{">"}</h6>
                <button className={"menu-buttons"}>ძიება</button><h6>{">"}</h6>
                <button className={"menu-buttons"}>იყიდება</button>
            </div> : ""}
            <div className={"search-container"}>
                {showFiltersScreen || windowWidth > 1125 ? <div className={"vehicle-buttons"}>
                    <button className={`type-button`} style={{borderTopLeftRadius: "5px"}}>
                        {Icons.carIcon}</button>
                    <button className={`type-button`}>
                        {Icons.specIcon}</button>
                    <button className={`type-button`} style={{borderTopRightRadius: "5px"}}>
                        {Icons.motoIcon}</button>
                </div> : ""}
                <SearchForm/>
            </div>
        </div>
    )
}
