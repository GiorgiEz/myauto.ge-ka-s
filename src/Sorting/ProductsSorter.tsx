import React from "react";
import {useDispatch, useSelector} from "react-redux";
import "./sorting.css"
import {ProductsState} from "../Redux/redux-types";
import {setDisplayedProducts, setSortValue} from "../Redux/Actions";
import {PeriodFilter} from "../Filters/PeriodFilter";
import {FiltersArray} from "../Filters/FiltersArray";
import {sortBy} from "./sortBy";
import Select from "react-select";
import {Option} from "react-multi-select-component";
import {customStyles} from "../Filters/DisplayFilters";

const options = [
    { value: 'Date Desc', label: 'Date Desc' },
    { value: 'Date Asc', label: 'Date Asc' },
    { value: 'Cost Desc', label: 'Cost Desc' },
    { value: 'Cost Asc', label: 'Cost Asc' },
    { value: 'Mileage Desc', label: 'Mileage Desc' },
    { value: 'Mileage Asc', label: 'Mileage Asc' },
]

export function ProductsSorter(){
    const dispatch = useDispatch()
    const sortValue = useSelector((state: ProductsState) => state.sortValue)
    const displayedProducts = useSelector((state: ProductsState) => state.displayedProducts)
    const showFiltersScreen = useSelector((state: ProductsState) => state.showFiltersScreen)

    const handleSortingSelect = (selectedOption: Option | null) => {
        const selectedValue = selectedOption ? selectedOption.value : '';
        dispatch(setSortValue(selectedValue));
        dispatch(setDisplayedProducts([...sortBy(selectedOption?.value, displayedProducts)]));
    }

    const { control, ...otherStyles } = customStyles;

    const customStylesSort = {
        ...otherStyles,
        control: (provided:any) => ({
            ...provided,
            ...control,
            backgroundColor: '#f2f3f6',
            borderColor: '#b4b6b6',
            borderRadius: '7px',
            boxShadow: 'none',
            ':hover': {
                borderRadius: '7px',
                borderColor: 'black',
            },
        }),
    }

    return (
        <div className={"sorting-container"}>
            <div className={"sorting"}>
                <div className={"posts"}>{displayedProducts.length} Listing</div>

                {!showFiltersScreen ? <div style={{display: "flex"}}>
                    <PeriodFilter/>
                    <Select
                        id="sort-select"
                        value={options.find(option => option.value === sortValue)}
                        options={options.filter(option => option.value !== sortValue)}
                        onChange={handleSortingSelect}
                        styles={customStylesSort}
                        placeholder="Date Desc"
                        isSearchable={false}
                        className={"sort-select"}
                    />
                </div> : ""}
            </div>
            <FiltersArray/>
        </div>
    )
}
