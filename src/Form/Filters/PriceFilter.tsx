import React, {ChangeEvent, useEffect} from "react";
import {CurrencyButtons} from "../../Products/Currency/CurrencyButtons";
import {useField, useFormikContext} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {ProductsState} from "../../Redux/redux-types";
import {filterProducts} from "../../Filters/DisplayFilters";
import {setDisplayedProducts} from "../../Redux/Actions";
import {sortBy} from "../../Sorting/sortBy";

export function PriceFilter(){
    const dispatch = useDispatch()
    const [fieldFrom, , helpersFrom] = useField("priceFrom");
    const [fieldTo, , helpersTo] = useField("priceTo");
    const products = useSelector((state: ProductsState) => state.products)
    const currency = useSelector((state: ProductsState) => state.currency)
    const sortValue = useSelector((state: ProductsState) => state.sortValue)
    const filtersArray = useSelector((state: ProductsState) => state.filtersArray)

    const { setFieldValue } = useFormikContext();

    function handleFilterDelete(){
        const filteredProducts = filterProducts(products, filtersArray, currency)
        dispatch(setDisplayedProducts([...sortBy(sortValue, filteredProducts)]))
    }

    useEffect(() => {
        setFieldValue("priceTo", filtersArray.priceTo);
        setFieldValue("priceFrom", filtersArray.priceFrom);
        handleFilterDelete()
    }, [filtersArray.priceTo, filtersArray.priceFrom])

    return (
        <div>
            <div style={{display: "flex", marginBottom: "10px", justifyContent: "space-between", marginTop: "10px"}}>
                <div style={{fontSize: "15px"}}>ფასი</div>
                <CurrencyButtons/>
            </div>

            <div style={{display: "flex"}}>
                <input
                    type={"number"}
                    value={fieldFrom.value}
                    className={"search-price-inputs"}
                    placeholder={"დან"}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => helpersFrom.setValue(event.target.value)}
                />
                <div style={{marginTop: "8px", marginLeft: "2px", marginRight: "2px"}}>-</div>
                <input
                    type={"number"}
                    value={fieldTo.value}
                    className={"search-price-inputs"}
                    placeholder={"მდე"}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => helpersTo.setValue(event.target.value)}
                />
            </div>
        </div>
    )
}
