import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";

function Product(){

    const [product, setProduct] = useState([]);
    const params = useParams();

    const getProduct = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${params.id}`)
            const jsonData = await response.json()

            setProduct(jsonData);
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getProduct();
    }, []);
    


    return(
        <div>
                <ProductCard key={product.id} id={product.id} name={product.name} description={product.description} price={product.price}/>
        </div>
    )
}

export default Product;