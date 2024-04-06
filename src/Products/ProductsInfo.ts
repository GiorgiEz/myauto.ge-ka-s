import {Period, Product} from "../Utils/types";

export function gear_type_handler(product: Product){
    return product.gear_type_id === 1 ? "Manual" : product.gear_type_id === 2 ? "Automatic" :
        product.gear_type_id === 3 ? "Tiptronic" : product.gear_type_id === 4 ? "Variator" : "..."
}

export function fuel_type_handler(product: Product){
    return product.fuel_type_id === 2 ? "Petrol"
        : product.fuel_type_id === 3 ? "Diesel"
            : product.fuel_type_id === 4 ? "Electric"
                : product.fuel_type_id === 5 || product.fuel_type_id === 6 ||
                product.fuel_type_id === 7 || product.fuel_type_id === 10 ? "Hybrid"
                    : product.fuel_type_id === 8 || product.fuel_type_id === 9 ? "Gas"
                        : product.fuel_type_id === 11 ? "hydrogen" : "..."
}

export function engine_volume_handler(product: Product){
    return `${(product.engine_volume / 1000).toFixed(1)} ${fuel_type_handler(product)}`
}

export function customs_passed_handler(product: Product){
    return product.customs_passed ? "Customs-cleared" : "Customs"
}

export function date_handler(order_date: string): string {
    const now = Date.now();
    const postDate = new Date(order_date).getTime();
    const elapsed = now - postDate;

    // Convert milliseconds to minutes, hours, and days
    const minutes = Math.floor(elapsed / (1000 * 60))
    const hours = Math.floor(elapsed / (1000 * 60 * 60));
    const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes} minutes ago`
    else if (hours < 24) return `${hours} hours ago`
    else return `${days} days ago`
}

export function currencyConverter(product: Product, currency: boolean) {
    return currency ? product.price_value?.toLocaleString()
        : product.price_usd?.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })
}

export const periodConverter: Record<Period, string> = {
    "1" : "1 hour",
    "2" : "2 hours",
    "3" : "3 hours",
    "24" : "1 day",
    "48" : "2 days",
    "72" : "3 days",
    "168" : "1 week",
    "336" : "2 weeks",
    "504" : "3 weeks",
    "" : ""
}
