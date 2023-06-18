import React, { useEffect, useState } from 'react';
import { MultiSelect, Option } from 'react-multi-select-component';
import {FormFilterType, Model} from "../../Utils/types";
import {CustomItemRenderer} from "../../Filters/DisplayFilters";
import {useField} from "formik";
import { useFormikContext } from 'formik';
import {useSelector} from "react-redux";
import {ProductsState} from "../../Redux/redux-types";

export function ModelFilter() {
    const showFiltersScreen = useSelector((state: ProductsState) => state.showFiltersScreen)
    const windowWidth = useSelector((state: ProductsState) => state.windowWidth)

    const [field, , helpers] = useField("models");
    const { values } = useFormikContext<FormFilterType>();
    const [models, setModels] = useState<Model[]>([]);

    useEffect(() => {
        function fetchData(manufacturerId: string) {
            fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${manufacturerId}`)
                .then((response) => response.json())
                .then((response) => setModels((prevModels) => [...prevModels, ...response.data]))
                .catch((error) => console.log(error))
        }
        setModels([]); // Clear previous models
        values.manufacturers.map((man) => fetchData(man.value));
    }, [values.manufacturers])

    const displayPlaceholder = (selected: Option[]) => {
        if (selected.length === 0) return <div>მოდელი</div>
    }

    return (
        <div>
            {showFiltersScreen || windowWidth > 1125 ?
                <div className="multiselect-container">
                    <label htmlFor="model-select">მოდელი</label>
                    <MultiSelect
                        disabled={!values.manufacturers.length}
                        options={models.map((model) => ({ label: model.model_name, value: model.model_id }))}
                        value={field.value}
                        labelledBy="model-select"
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
