import React, {useEffect, useState} from "react";
import {Category} from "../../Utils/types";
import {MultiSelect, Option} from "react-multi-select-component";
import {CustomItemRenderer} from "../../Filters/DisplayFilters";
import {useField} from "formik";
import {useSelector} from "react-redux";
import {ProductsState} from "../../Redux/redux-types";

export function CategoryFilter(){
    const [field, , helpers] = useField("categories");
    const [categories, setCategories] = useState<Category[]>([])
    const showFiltersScreen = useSelector((state: ProductsState) => state.showFiltersScreen)
    const windowWidth = useSelector((state: ProductsState) => state.windowWidth)

    useEffect(() => {
        fetch("https://api2.myauto.ge/ka/cats/get")
            .then((response) => response.json())
            .then((response) => setCategories(response.data))
            .catch(error => console.log(error))
    }, [])

    const displayPlaceholder = (selected: Option[]) => {
        if (selected.length === 0) return <div>კატეგორია</div>
    }

    return (
        <div>
            {showFiltersScreen || windowWidth > 1125 ?
                <div className="multiselect-container">
                    <label htmlFor="category-select">კატეგორია</label>
                    <MultiSelect
                        options={categories.map((cat) => ({label: cat.title, value: cat.category_id,}))}
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
