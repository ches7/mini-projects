import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeItem, setQuantity } from "../cartSlice";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function ProductCard(props) {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cartStore);
    const [value, setValue] = useState(0)

    useEffect(() => {
        if(!cart.cart[0]){return}
        const item = cart.cart.find((item) => item.productid === props.id);
        if (!item){
        return;
        }
        setValue(item.qty);
    }, [cart])

    const handleClick = () => {
        navigate(`/products/${props.id}`)
    }

    const handleAddToCart = async () => {
        setValue(value=>value++);
        try {
            const response = await fetch(`/api/cart/${props.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            })
            .then(response => response.json())
            .then(response => {
                if(response.qty === 1){
                dispatch(addToCart(response))
            } else {
                dispatch(setQuantity(response))
            }
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleInputChange = async (e) => {
        setValue(e.target.value)        
        try {
            const response = await fetch(`/api/cart/${props.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({qty: e.target.value})
            })
            .then(response => response.json())
            .then(response => {
                if(response.qty == 0){
                    dispatch(removeItem(response));
                } else {
                    dispatch(setQuantity(response));
                }
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    return(
        <div className="product-card d-flex justify-content-center" >
            <div className="border rounded m-4 cardwidth p-2">
            <div onClick={handleClick} style={{cursor: "pointer"}}>
            <p>{props.name}</p>
            <p>{props.description}</p>
            <p>£{props.price}</p>
            </div>
            <div className="d-flex justify-content-center">
            <button onClick={handleAddToCart} className="btn btn-dark">Add to Cart</button>
            <input type="number" min={0} onChange={handleInputChange} value={value} className="form-control w-50"></input>
        </div>
        </div>
        </div>
    );
}

export default ProductCard;