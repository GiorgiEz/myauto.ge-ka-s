import React, {useEffect, useState} from "react";
import "./products.css"
import {Model, Product} from "../Utils/types";
import {ProductsSorter} from "../Sorting/ProductsSorter";
import {setDisplayedProducts, setFiltersArray, setLoading, setProducts} from "../Redux/Actions";
import {useDispatch, useSelector} from "react-redux";
import {Header} from "../Header/Header";
import {ProductsState} from "../Redux/redux-types";
import {DisplayFilters} from "../Filters/DisplayFilters";
import {CurrencyButtons} from "./Currency/CurrencyButtons";
import {
    currencyConverter,
    customs_passed_handler,
    date_handler,
    engine_volume_handler,
    gear_type_handler
} from "./ProductsInfo";
import {CarModelName} from "./CarModelName";
import {LoadingOverlay} from "./LoadingScreen/LoadingOverlay";
import {Icons} from "../Utils/Icons";

export function Products(){
    const dispatch = useDispatch()
    const displayedProducts = useSelector((state: ProductsState) => state.displayedProducts)
    const products = useSelector((state: ProductsState) => state.products)
    const currency = useSelector((state: ProductsState) => state.currency)
    const isLoading = useSelector((state: ProductsState) => state.isLoading)

    const [models, setModels] = useState<{ [key: number]: Model[] }>([])

    useEffect(() => {
        dispatch(setLoading(true))
        fetch("https://api2.myauto.ge/ka/products/")
            .then(response => response.json())
            .then(response => {
                dispatch(setProducts(response.data.items))
                dispatch(setDisplayedProducts(response.data.items))
            })
            .catch(error => console.log(error))
            .finally(() => dispatch(setLoading(false)))
    }, [dispatch])

    useEffect(() => {
        function fetchData(id: number) {
            dispatch(setLoading(true))
            fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${id}`)
                .then((response) => response.json())
                .then((response) => setModels((prevModels) => ({...prevModels, [id]: response.data})))
                .catch((error) => console.log(error))
                .finally(() => dispatch(setLoading(false)))
        }
        products.forEach((product) => fetchData(product.man_id));
    }, [dispatch, products])

    function getPhoto(photo: string, car_id: number, photo_ver:number){
        return `https://static.my.ge/myauto/photos/${photo}/thumbs/${car_id}_1.jpg?v=${photo_ver}`
    }
    
    return (
        <div>
            <div className={"main-container"}>
                <Header/>
                <div style={{display: "flex"}}>
                    <DisplayFilters/>

                    <div style={{display: "flex", flexDirection: "column"}}>
                    <ProductsSorter/>
                    <div className={"product-container"}>
                        {isLoading ? <LoadingOverlay isLoading={isLoading}/> : ""}
                        {displayedProducts.length ? displayedProducts.map((product: Product) => (
                            <div key={product.car_id} className={"product"}>
                                <img
                                    src={getPhoto(product.photo, product.car_id, product.photo_ver)}
                                    alt="Product"
                                />
                                <div style={{marginTop: "15px"}}>
                                    <div className={"name-year-customs"}>
                                        <CarModelName product={product} models={models}/>

                                        <div className={"year"}>{`${product.prod_year} წ`}</div>

                                        <div className={product.customs_passed ? "customs-passed" : "customs-not-passed"}>
                                            {product.customs_passed ? <div style={{marginRight: "5px"}}>{Icons.greenIcon}</div> : ""}
                                            <div>{customs_passed_handler(product)}</div>
                                        </div>
                                    </div>

                                    <div className={"car-info"}>
                                        <div style={{display:"flex", flexDirection:"column"}}>
                                            <div style={{display: "flex"}}>
                                                <div style={{marginTop: "2px"}}>{Icons.fuelIcon}</div>
                                                <div className={"engine-volume"}>{engine_volume_handler(product)}</div>
                                            </div>
                                            <div style={{display: "flex", marginTop: "10px"}}>
                                                <div style={{marginTop: "2px"}}>{Icons.gearIcon}</div>
                                                <div className={"gear-type"}>{gear_type_handler(product)}</div>
                                            </div>
                                        </div>

                                        <div style={{display:"flex", flexDirection:"column"}}>
                                            <div style={{display: "flex"}}>
                                                <div style={{marginTop: "2px"}}>{Icons.mileageIcon}</div>
                                                <div className={"mileage-covered"}>{product.car_run_km} კმ</div>
                                            </div>
                                            <div style={{display: "flex", marginTop: "10px"}}>
                                                <div style={{marginTop: "2px"}}>{Icons.wheelIcon}</div>
                                                <div style={{marginLeft: "10px"}}>{product.right_wheel ? "მარჯვენა" : "მარცხენა"}</div>
                                            </div>
                                        </div>

                                        <div style={{display:"flex", flexDirection:"column"}}>
                                            <div style={{marginBottom: "10px", display: "flex"}}>
                                                {product.price_value === 0 || !product.price_value ? "ფასი შეთანხმებით" :
                                                    <div style={{display: "flex"}}>
                                                        <div className={"money"}>{currencyConverter(product, currency)}</div>
                                                        <CurrencyButtons/>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className={"views-time-container"}>
                                        <div style={{display: "flex"}}>
                                            <div className={"views"}>{`${product.views}  ნახვა`}</div>
                                            <div style={{marginRight: "10px", fontWeight: "bold"}}>.</div>
                                            <div className={"order-date"}>{date_handler(product.order_date)}</div>
                                        </div>
                                        <div style={{display:"flex"}}>
                                            <div className={"comment-view-save-icons"}>{Icons.commentIcon}</div>
                                            <div className={"comment-view-save-icons"}>{Icons.viewIcon}</div>
                                            <div className={"comment-view-save-icons"}>{Icons.saveIcon}</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )) : !isLoading ?
                            <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop:"30px"}}>
                                {Icons.notFoundIcon}
                                <div style={{fontWeight: "bold", marginBottom: "10px", fontSize:"30px", marginTop: "20px"}}>
                                    განცხადებები ვერ მოიძებნა
                                </div>
                                <button className={"clear-filters"}
                                        onClick={() =>
                                            dispatch(setFiltersArray({period: "", dealType: [], manufacturers: [],
                                                models: [], categories: [], priceTo: "", priceFrom: ""}))}>
                                            ფილტრის გასუფთავება
                                </button>
                            </div> : ""
                        }
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
