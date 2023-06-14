import {Product} from "../Utils/types";

export function gear_type_handler(product: Product){
    return product.gear_type_id === 1 ? "მექანიკა" : product.gear_type_id === 2 ? "ავტომატიკა" :
        product.gear_type_id === 3 ? "ტიპტრონიკი" : product.gear_type_id === 4 ? "ვარიატორი" : "..."
}

export function fuel_type_handler(product: Product){
    return product.fuel_type_id === 2 ? "ბენზინი"
        : product.fuel_type_id === 3 ? "დიზელი"
            : product.fuel_type_id === 4 ? "ელექტრო"
                : product.fuel_type_id === 5 || product.fuel_type_id === 6 ||
                product.fuel_type_id === 7 || product.fuel_type_id === 10 ? "ჰიბრიდი"
                    : product.fuel_type_id === 8 || product.fuel_type_id === 9 ? "გაზი"
                        : product.fuel_type_id === 11 ? "წყალბადი" : "..."
}

export function engine_volume_handler(product: Product){
    return `${(product.engine_volume / 1000).toFixed(1)} ${fuel_type_handler(product)}`
}

export function customs_passed_handler(product: Product){
    return product.customs_passed ? "განბაჟებული" : "განბაჟება"
}

export function date_handler(order_date: string): string {
    const now = Date.now();
    const postDate = new Date(order_date).getTime();
    const elapsed = now - postDate;

    // Convert milliseconds to minutes, hours, and days
    const minutes = Math.floor(elapsed / (1000 * 60))
    const hours = Math.floor(elapsed / (1000 * 60 * 60));
    const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes} წუთის წინ`
    else if (hours < 24) return `${hours} საათის წინ`
    else return `${days} დღის წინ`
}

export function currencyConverter(product: Product, currency: boolean) {
    return currency ? product.price_value?.toLocaleString()
        : product.price_usd?.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })
}
