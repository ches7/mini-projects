import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { clearCart, setCart } from "../cartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Cart(){

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cartStore);

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

    const handleCheckout = async () => {
        try {
            const checkout = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            })
            .then(checkout => checkout.json())
            .then(dispatch(clearCart()))
            .then(navigate('/orders'));
        } catch (error) {
            console.error(error.message)
        }
    }
    
    return(
        <div>
            {products.map(product => (
                cart.cart.find((item) => item.productid === product.id) ?
                <ProductCard key={product.id} id={product.id} name={product.name} description={product.description} price={product.price}/>
                : null
            ))}
            <div className="d-flex justify-content-center">
            <button onClick={handleCheckout} className="btn btn-dark">Checkout</button>
        </div>
        </div>
    )
}

export default Cart;