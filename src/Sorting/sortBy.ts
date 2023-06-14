import {Product} from "../Utils/types";

enum SortOrder {
    DATE_DESC = "თარიღი კლებადი",
    DATE_ASC = "თარიღი ზრდადი",
    COST_DESC = "ფასი კლებადი",
    COST_ASC = "ფასი ზრდადი",
    MILEAGE_DESC = "გარბენი კლებადი",
    MILEAGE_ASC = "გარბენი ზრდადი",
}

export function sortBy(value: string, products: Product[]){
    let sortedProducts: Product[] = [...products]
    if (SortOrder.DATE_DESC === value){
        sortedProducts = products.sort((a, b) => {
            const dateA = new Date(a.order_date).getTime();
            const dateB = new Date(b.order_date).getTime();
            return dateB - dateA;
        })

    } else if (SortOrder.DATE_ASC === value){
        sortedProducts = products.sort((a, b) => {
            const dateA = new Date(a.order_date).getTime();
            const dateB = new Date(b.order_date).getTime();
            return dateA - dateB;
        })

    } else if (SortOrder.COST_DESC === value){
        sortedProducts = products.sort((a, b) => {
            return b.price_value - a.price_value;
        })

    } else if (SortOrder.COST_ASC === value){
        sortedProducts = products.sort((a, b) => {
            return a.price_value - b.price_value;
        })

    } else if (SortOrder.MILEAGE_DESC === value){
        sortedProducts = products.sort((a, b) => {
            return b.car_run_km - a.car_run_km;
        })

    } else if (SortOrder.MILEAGE_ASC === value){
        sortedProducts = products.sort((a, b) => {
            return a.car_run_km - b.car_run_km;
        })
    }
    return sortedProducts
}
