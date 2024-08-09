import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../userSlice";
import { clearCart } from "../cartSlice";

function Navbar() {
    const userState = useSelector((state) => state.userStore);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginButton = () => { navigate('/login') }
    const handleRegisterButton = () => { navigate('/register') }
    const handleHomeClick = () => { navigate('/') }
    const handleAccountButton = () => { navigate('/account') }
    const handleCartButton = () => { navigate('/cart') }
    const handleOrdersButton = () => { navigate('/orders') }
    const handleLogOut = async () => { 
        try {
            const response = await fetch("/api/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            })
            .then(dispatch(clearUser()))
            .then(dispatch(clearCart()))
        } catch (error) {
            console.log(error.message)
        }
    }

    if (!userState.user) {
        return (
            <header id="header">
                <h1 onClick={handleHomeClick} className="title">E-Commerce App</h1>
                <button onClick={handleLoginButton} className='login-button btn btn-dark'>Login</button>
                <button onClick={handleRegisterButton} className='register-button btn btn-dark'>Register</button>
            </header>
        )
    } else {
        return (
            <header id="header">
                <h1 onClick={handleHomeClick} className="title">E-Commerce App</h1>
                <button onClick={handleAccountButton} className='login-button btn btn-dark'>Account</button>
                <button onClick={handleCartButton} className='login-button btn btn-dark'>Cart</button>
                <button onClick={handleOrdersButton} className='login-button btn btn-dark'>Orders</button>
                <button onClick={handleLogOut} className='register-button btn btn-dark'>Log Out</button>
            </header>
        )
    }
}

export default Navbar;