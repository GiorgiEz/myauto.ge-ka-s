import React, {useEffect} from "react";
import "./filters.css"
import {MultiSelect, Option} from "react-multi-select-component";
import {CustomItemRenderer, filterProducts} from "../../Filters/DisplayFilters";
import {useField, useFormikContext} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {ProductsState} from "../../Redux/redux-types";
import {setDisplayedProducts} from "../../Redux/Actions";
import {sortBy} from "../../Sorting/sortBy";

const options = [
    { value: 'For Sale', label: 'For Sale' },
    { value: 'For Rent', label: 'For Rent' },
]

export function DealTypeFilter(){
    const dispatch = useDispatch()
    const products = useSelector((state: ProductsState) => state.products)
    const currency = useSelector((state: ProductsState) => state.currency)
    const sortValue = useSelector((state: ProductsState) => state.sortValue)
    const filtersArray = useSelector((state: ProductsState) => state.filtersArray)
    const showFiltersScreen = useSelector((state: ProductsState) => state.showFiltersScreen)
    const windowWidth = useSelector((state: ProductsState) => state.windowWidth)
    const [field, , helpers] = useField("dealType");

    const { setFieldValue } = useFormikContext();

    useEffect(() => {
        setFieldValue("dealType", filtersArray.dealType);
        setFieldValue("categories", filtersArray.categories);
        setFieldValue("manufacturers", filtersArray.manufacturers);
        setFieldValue("models", filtersArray.models);
        setFieldValue("priceTo", filtersArray.priceTo);
        setFieldValue("priceFrom", filtersArray.priceFrom);
        dispatch(setDisplayedProducts([...sortBy(sortValue, filterProducts(products, filtersArray, currency))]))
    }, [filtersArray])

    const displayPlaceholder = (selected: Option[]) => {
        if (selected.length === 0) return <div>Deal Type</div>
    }

    const handleChange = (selected: Option[]) => {
        if (selected.length === 2) helpers.setValue([selected[1]])
        else helpers.setValue(selected)
    }

    return (
        <div>
            {showFiltersScreen || windowWidth > 1125 ?
                <div style={{marginBottom: "10px"}}>
                    <label htmlFor="deal-type-select">Deal Type</label>
                    <MultiSelect
                        value={field.value}
                        options={options}
                        onChange={handleChange}
                        valueRenderer={displayPlaceholder}
                        className="dark"
                        hasSelectAll={false}
                        labelledBy={"deal-type-select"}
                        ItemRenderer={CustomItemRenderer}
                        disableSearch={true}
                    />
                </div> : ""
            }
        </div>
    )
}
