import {Product} from "../Utils/types";
import {Option} from "react-multi-select-component";

export function filterByPeriod(products: Product[], value: string){
    function filter_by_order_date(now: any, period: number) {
        return products.filter((product) => {
            const orderDate = new Date(product.order_date).getTime();
            const elapsed = now - orderDate;
            return elapsed < period * 60 * 60 * 1000; // 1 hour in milliseconds
        })
    }

    const now = Date.now();
    let filteredProducts = filter_by_order_date(now, Infinity);

    if (value === "1") filteredProducts = filter_by_order_date(now, 1);
    else if (value === "2") filteredProducts = filter_by_order_date(now, 2);
    else if (value === "3") filteredProducts = filter_by_order_date(now, 3);
    else if (value === "24") filteredProducts = filter_by_order_date(now, 24);
    else if (value === "48") filteredProducts = filter_by_order_date(now, 48);
    else if (value === "72") filteredProducts = filter_by_order_date(now, 72);
    else if (value === "168") filteredProducts = filter_by_order_date(now, 168);
    else if (value === "336") filteredProducts = filter_by_order_date(now, 336);
    else if (value === "504") filteredProducts = filter_by_order_date(now, 504);

    return filteredProducts
}

export function filterByDealType(products: Product[], options: Option[]){
    const allProducts = [...products]

    let filteredProducts: Product[] = [...products]
    for (let option of options) {
        if (option.value === "For Rent") filteredProducts = allProducts.filter((product) => product.for_rent)
        else if (option.value === "For Sale") filteredProducts = allProducts.filter((product) => !product.for_rent)
    }
    return filteredProducts
}

export function filterByManufacturers(products: Product[], selectedManufacturers: Option[]){
    const updatedSelected = selectedManufacturers.map((m) => m.value)
    return products.filter((product) => updatedSelected.includes(product.man_id.toString()))
}

export function filterByModels(products: Product[], selectedModels: Option[]){
    const updatedSelected = selectedModels.map((m) => m.value)
    return products.filter((product) => updatedSelected.includes(product.model_id))
}

export function filterByCategories(products: Product[], selectedCategories: Option[]){
    const updatedSelected = selectedCategories.map((cat) => cat.value)
    return products.filter((product) => updatedSelected.includes(product.category_id))
}

export function filterByPriceFrom(products: Product[], priceFrom: string, currency: boolean){
    return products.filter((product) => currency ?
        product.price_value >= parseFloat(priceFrom) : product.price_usd >= parseFloat(priceFrom))
}

export function filterByPriceTo(products: Product[], priceTo: string, currency: boolean){
    return products.filter((product) => currency ?
        product.price_value <= parseFloat(priceTo) : product.price_usd <= parseFloat(priceTo))
}
