import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../userSlice";
import { setCart } from "../cartSlice";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userState = useSelector((state) => state.userStore);
    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();
        const user = { email, password };
        // console.log(user);
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
                credentials: 'include'
            })
            .then(response => response.json())
            .then(response => dispatch(setUser(response)));

            const getCart = await fetch("/api/cart", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            })
            .then(getCart => getCart.json())
            // .then(getCart => console.log(getCart))
            .then(getCart => dispatch(setCart(getCart)))
            .then(navigate('/'));
        } catch (error) {
            console.log(error.message)
        }
    }

    const google = () => {
        window.open("http://localhost:5000/api/google", "_self")
      };

    const facebook = () => {
        window.open("http://localhost:5000/api/facebook", "_self")
      };

    return(
        <div className="d-flex justify-content-center">
        <div className="d-flex flex-column">

            <h2 className="mb-3 mx-1 w-100">Not registered? </h2>
            <h2 className="mx-1 w-100"><Link to="/register">Register</Link></h2>

                <form onSubmit={handleSubmit} className="d-flex flex-column mx-1">

                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        name="email"
                        required
                        id="email"
                        onChange={(e) => { setEmail(e.target.value); }}
                        className="mb-3 w-100"
                    ></input>

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        id="password"
                        className="mb-3 w-100"
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <button className="btn btn-dark mt-3 w-100" type="submit">Login</button>
                </form>
                <div className="w-100 d-flex justify-content-center mt-3">
                <p>Sign in with</p>
              </div>
              <div className="d-flex w-100 justify-content-center">              
                <button className="btn btn-dark m-2" onClick={facebook}>Facebook</button>
                <button className="btn btn-dark m-2" onClick={google}>Google</button>
              </div>
        </div>
        </div>
    );
};

export default Login;