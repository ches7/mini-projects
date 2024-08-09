import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { setCart } from "../cartSlice";
import { useDispatch } from "react-redux";

function Home(){

    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    const getProducts = async () => {
        try {
            const response = await fetch("/api/products")
            const jsonData = await response.json()
            setProducts(jsonData);

            const getCart = await fetch("/api/cart", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            })
            .then(getCart => getCart.json())
            // .then(getCart => console.log(getCart))
            .then(getCart => dispatch(setCart(getCart)))
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getProducts();
    }, []);
    


    return(
        <div>
            {products.map(product => (
                <ProductCard key={product.id} id={product.id} name={product.name} description={product.description} price={product.price}/>
            ))}
        </div>
    )
}

export default Home;