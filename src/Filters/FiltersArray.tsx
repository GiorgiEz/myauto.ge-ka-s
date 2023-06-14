import React from "react";
import "../Sorting/sorting.css"
import {useDispatch, useSelector} from "react-redux";
import {ProductsState} from "../Redux/redux-types";
import {setFiltersArray} from "../Redux/Actions";
import {periodConverter} from "../Utils/types";
import {Option} from "react-multi-select-component";
import {Icons} from "../Utils/Icons";

export function FiltersArray(){
    const dispatch = useDispatch()
    const filtersArray = useSelector((state: ProductsState) => state.filtersArray)

    function handlePeriodRemoval(){
        dispatch(setFiltersArray({...filtersArray, period: ""}))
    }

    function handleDealTypeRemoval(){
        dispatch(setFiltersArray({...filtersArray, dealType: []}))
    }

    function handleManufacturerFilterRemoval(manufacturer: Option) {
        const updatedManufacturers = filtersArray.manufacturers.filter((man) => man.value !== manufacturer.value);
        dispatch(setFiltersArray({ ...filtersArray, manufacturers: updatedManufacturers, models: [] }));
    }

    function handleModelFilterRemoval(model: Option){
        const updatedModels = filtersArray.models.filter((m) => m.value !== model.value);
        dispatch(setFiltersArray({ ...filtersArray, models: updatedModels }));
    }

    function handleCategoryFilterRemoval(category: Option){
        const updatedManufacturers = filtersArray.categories.filter((cat) => cat.value !== category.value);
        dispatch(setFiltersArray({ ...filtersArray, categories: updatedManufacturers }));
    }

    function handlePriceFromFilterRemoval(){
        dispatch(setFiltersArray({...filtersArray, priceFrom: ""}))
    }

    function handlePriceToFilterRemoval(){
        dispatch(setFiltersArray({...filtersArray, priceTo: ""}))
    }

    function deleteAllFilters(){
        dispatch(setFiltersArray({period: "", dealType: [], manufacturers: [],
            models: [], categories: [], priceTo: "", priceFrom: ""}))
    }

    function filterSize(){
        let size = filtersArray.manufacturers.length + filtersArray.models.length + filtersArray.categories.length
        if (filtersArray.period) size ++
        if (filtersArray.dealType) size++
        if (filtersArray.priceFrom) size++
        if (filtersArray.priceTo) size++
        return size
    }

    return (
        <div>
            {(filtersArray.period || filtersArray.dealType.length || filtersArray.manufacturers.length || filtersArray.models.length
                || filtersArray.categories.length || filtersArray.priceFrom || filtersArray.priceTo) ?
                <div className={"period-container"}>
                    <div className="tooltip">
                        <button className="period-container-delete-button"
                                onClick={deleteAllFilters}>{Icons.deleteIcon}
                        </button>
                        <span className="tooltip-text">ფილტრის გასუფთავება</span>
                    </div>
                    <div style={{marginLeft: "15px"}}>|</div>

                    {
                        filtersArray.period ?
                            <div className={"filters-button"}>
                                <div style={{marginLeft: "15px", padding: "5px"}}>{periodConverter[filtersArray.period]}</div>
                                <button className={"filters-delete-button"} onClick={handlePeriodRemoval}>x</button>
                            </div> : ""
                    }

                    {
                        filtersArray.dealType ?
                            filtersArray.dealType.map((deal, i) => (
                                <div key={i} className={"filters-button"}>
                                    <div style={{marginLeft: "15px"}}>{deal.label}</div>
                                    <button className={"filters-delete-button"} onClick={handleDealTypeRemoval}>x</button>
                                </div>
                            )) : ""
                    }

                    {
                        filtersArray.manufacturers.length ?
                            filtersArray.manufacturers.map((man, i) => (
                                <div key={i} className={"filters-button"}>
                                    <div style={{marginLeft: "15px"}}>{man.label}</div>
                                        <button className={"filters-delete-button"}
                                                onClick={() => handleManufacturerFilterRemoval(man)}>x
                                        </button>
                                </div>
                            )) : ""
                    }

                    {
                        filtersArray.categories.length ?
                            filtersArray.categories.map((cat, i) => (
                                <div key={i} className={"filters-button"}>
                                    <div style={{marginLeft: "15px"}}>{cat.label}</div>
                                        <button key={i} className={"filters-delete-button"}
                                                onClick={() => handleCategoryFilterRemoval(cat)}>x
                                        </button>
                                </div>
                            )) : ""
                    }

                    {
                        filtersArray.models.length ?
                            filtersArray.models.map((model, i) => (
                                <div key={i} className={"filters-button"}>
                                    <div style={{marginLeft: "15px"}}>{model.label}</div>
                                        <button key={i} className={"filters-delete-button"}
                                                onClick={() => handleModelFilterRemoval(model)}>x
                                        </button>
                                </div>
                            )) : ""
                    }

                    {
                        filtersArray.priceFrom ?
                            <div className={"filters-button"}>
                                <div style={{marginLeft: "15px"}}>{`ფასი: ${filtersArray.priceFrom} დან`}</div>
                                    <button className={"filters-delete-button"}
                                            onClick={handlePriceFromFilterRemoval}>x
                                    </button>
                            </div>: ""
                    }

                    {
                        filtersArray.priceTo ?
                            <div className={"filters-button"}>
                                <div style={{marginLeft: "15px"}}>{`ფასი: ${filtersArray.priceTo} მდე`}</div>
                                    <button className={"filters-delete-button"}
                                            onClick={handlePriceToFilterRemoval}>x
                                    </button>
                            </div>: ""
                    }
                    {filterSize() > 10 ? (
                        <div className={"filters-delete-button"}>
                            <div style={{ padding: "10px"}}>{`სულ ${filterSize()}`}</div>
                        </div>
                    ) : null}
                </div> : ""
            }
        </div>
    )
}
