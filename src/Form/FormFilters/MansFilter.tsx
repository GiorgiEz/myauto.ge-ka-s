import React from 'react';
import {MultiSelect, Option} from 'react-multi-select-component';
import {useSelector} from "react-redux";
import {ProductsState} from "../../Redux/redux-types";
import "./filters.css"
import {CustomItemRenderer} from "../../Filters/DisplayFilters";
import {useField} from "formik";

export function ManufacturerFilter() {
    const [field, , helpers] = useField("manufacturers");
    const manufacturers = useSelector((state: ProductsState) => state.manufacturers)
    const showFiltersScreen = useSelector((state: ProductsState) => state.showFiltersScreen)
    const windowWidth = useSelector((state: ProductsState) => state.windowWidth)

    const displayPlaceholder = (selected: Option[]) => {
        if (selected.length === 0) return <div>მწარმოებელი</div>
    }

    return (
        <div>
            {showFiltersScreen || windowWidth > 1125 ?
                <div className="multiselect-container">
                    <label htmlFor="manufacturer-select">მწარმოებელი</label>
                    <MultiSelect
                        options={manufacturers.map((man) => ({ label: man.man_name, value: man.man_id }))}
                        value={field.value}
                        labelledBy="manufacturer-select"
                        className="dark"
                        onChange={(selected: Option[]) => helpers.setValue(selected)}
                        valueRenderer={displayPlaceholder}
                        hasSelectAll={false}
                        ItemRenderer={CustomItemRenderer}
                    />
                </div> : ""
            }
        </div>
    )
}
