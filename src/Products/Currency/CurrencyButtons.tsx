import React from "react";
import "./currency.css"
import {setCurrency} from "../../Redux/Actions";
import {useDispatch, useSelector} from "react-redux";
import {ProductsState} from "../../Redux/redux-types";

export function CurrencyButtons() {
    const dispatch = useDispatch()
    const currency = useSelector((state: ProductsState) => state.currency)

    return (
        <div>
            <button
                type={"button"}
                onClick={() => dispatch(setCurrency(!currency))}
                className={!currency ? "currency-button" : "disabled-currency-button"}>$
            </button>
            <button
                type={"button"}
                onClick={() => dispatch(setCurrency(!currency))}
                className={currency ? "currency-button" : "disabled-currency-button"}>₾
            </button>
        </div>
    )
}
