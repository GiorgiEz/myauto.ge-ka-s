import {Option} from "react-multi-select-component";

export type Period = "1" | "2" | "3" | "24" | "48" | "72" | "168" | "336" | "504" | ""

export type FilterType = {
    period: Period,
    dealType: Option[],
    manufacturers: Option[],
    models: Option[],
    categories: Option[],
    priceFrom: string,
    priceTo: string
}

export type FormFilterType = Omit<FilterType, "period">

export type CustomCheckboxType = {
    option: any;
    checked: boolean;
    onClick: () => void;
}

export type Product = {
    car_id: number;
    photo: string;
    photo_ver: number;
    car_model: string
    prod_year: number
    car_desc: string
    customs_passed: boolean
    engine_volume: number
    car_run_km: number
    price_value: number
    price_usd: number
    gear_type_id: number
    right_wheel: boolean
    for_rent: boolean
    views: number
    order_date: string
    man_id: number
    fuel_type_id: number
    category_id: number
    model_id: number
}

export type Manufacturer = {
    man_id: string,
    man_name: string,
    is_car: string,
    is_spec: string,
    is_moto: string
}

export type Category = {
    category_id: number,
    category_type: number,
    has_icon: number,
    title: string,
    seo_title: string,
    vehicle_types: number[]
}

export type Model = {
    model_id: number,
    man_id: number,
    model_name: string,
    model_group: string,
    sort_order: number,
    cat_man_id: number,
    cat_model_id: number,
    cat_modif_id: number,
    is_car: boolean,
    is_moto: boolean,
    is_spec: boolean,
    show_in_salons: number,
    shown_in_slider: number
}
