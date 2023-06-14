import React from "react";
import "./products.css"
import {Model, Product} from "../Utils/types";
import {useSelector} from "react-redux";
import {ProductsState} from "../Redux/redux-types";

interface Props {
    product: Product
    models: { [key: number]: Model[] }
}

export function CarModelName(props: Props) {
    const manufacturers = useSelector((state: ProductsState) => state.manufacturers)

     function car_model_name() {
        for (let man of manufacturers) {
            if (man.man_id === props.product.man_id.toString()) {
                let model_name = ""
                if (props.models[props.product.man_id]) {
                    for (let model of props.models[props.product.man_id]){
                        if (model.model_id === props.product.model_id) {model_name = model.model_name; break}
                    }
                }
                const manufacturerName = man.man_name.toLowerCase().split(' ')
                    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                return `${manufacturerName} ${model_name} ${props.product.car_model}`;
            }
        }
        return "";
    }

    return (
        <div style={{ marginTop: "1px", fontWeight: "bold" }}>
            {props.product.for_rent && (
                <div style={{ display: "flex" }}>
                    <div className="for-rent">ქირავდება</div>
                    {car_model_name()}
                </div>
            )}
            {!props.product.for_rent && car_model_name()}
        </div>
    )
}
