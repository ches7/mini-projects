import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { setCart } from "../cartSlice";
import { useDispatch } from "react-redux";

function Orders() {

    const [orders, setOrders] = useState([]);

    const retrieveOrders = async () => {
        try {
            const getOrders = await fetch("/api/orders", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            })
                .then(getOrders => getOrders.json())
                // .then(getOrders => console.log(getOrders))
                .then(getOrders => setOrders(getOrders))
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        retrieveOrders();
    }, []);



    return (
        <div>
            {orders.map((order, index) => (
                <div className="product-card d-flex justify-content-center" key={index} >
                    <div className="border rounded m-4 cardwidth p-2">
                        <div>
                            <h2>Order ID: {order.id}</h2>
                            {order.orderItems.map((orderItem, i) => (
                                <div className="d-flex" key={i}>
                                    <p className="m-2">£{orderItem.price}</p>
                                    <p className="m-2">{orderItem.name}</p>
                                    <p className="m-2">x{orderItem.qty}</p>
                                </div>
                            ))}
                        </div>
                    <p className="m-2">total: £{order.total}</p>
                    </div>
                </div>
            ))}
        </div>
    )


    // {orders.map((order, index) => (
    //   <div key={index}>
    //     <h1>{order.id}</h1>
    //     {order.orderItems.map((orderItem, i) => (
    //       <div key={i}>
    //         <h3>{orderItem.name}</h3>
    //         <h3>{orderItem.description}</h3>
    //         <hr />
    //       </div>
    //     ))}
    //   </div>
    // ))}
    //         </div>
    //     )
}

export default Orders;