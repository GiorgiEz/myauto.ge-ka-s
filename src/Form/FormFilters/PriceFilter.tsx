import React, {ChangeEvent} from "react";
import {CurrencyButtons} from "../../Products/Currency/CurrencyButtons";
import {useField} from "formik";
import {useSelector} from "react-redux";
import {ProductsState} from "../../Redux/redux-types";

export function PriceFilter(){
    const [fieldFrom, , helpersFrom] = useField("priceFrom");
    const [fieldTo, , helpersTo] = useField("priceTo");
    const showFiltersScreen = useSelector((state: ProductsState) => state.showFiltersScreen)
    const windowWidth = useSelector((state: ProductsState) => state.windowWidth)

    return (
        <div>{showFiltersScreen || windowWidth > 1125 ?
                <div>
                    <div style={{display: "flex", marginBottom: "10px", justifyContent: "space-between", marginTop: "10px"}}>
                        <div style={{fontSize: "15px"}}>Cost</div>
                        <CurrencyButtons/>
                    </div>

                    <div className={"price-container"}>
                        <input
                            type={"number"}
                            value={fieldFrom.value}
                            className={"search-price-inputs"}
                            placeholder={"From"}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => helpersFrom.setValue(event.target.value)}
                        />
                        <div className={"line-between-price"}>-</div>
                        <input
                            type={"number"}
                            value={fieldTo.value}
                            className={"search-price-inputs"}
                            placeholder={"To"}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => helpersTo.setValue(event.target.value)}
                        />
                    </div>
                </div>
            : ""}
        </div>
    )
}
