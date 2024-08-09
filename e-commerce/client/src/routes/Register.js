import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const user = { email, password, firstName, lastName };
        console.log(user);
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            }).then(navigate('/login'))
        } catch (error) {
            console.log(error.message)
        }
    }

    return(
        <div className="d-flex justify-content-center">
        <div className="d-flex flex-column">

            <h2 className="mb-3 mx-1 w-100">Already registered? </h2>
            <h2 className="mx-1 w-100"><Link to="/login">Log in</Link></h2>

                <form onSubmit={handleSubmit} className="d-flex flex-column mx-1">
                <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        required
                        id="firstName"
                        onChange={(e) => { setFirstName(e.target.value); }}
                        className="mb-3 w-100"
                    ></input>

                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        required
                        id="lastName"
                        onChange={(e) => { setLastName(e.target.value); }}
                        className="mb-3 w-100"
                    ></input>

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
                    <button className="btn btn-dark mt-3 w-100" type="submit">Register</button>
                </form>
                
        </div>
        </div>
    );
};

export default Register;