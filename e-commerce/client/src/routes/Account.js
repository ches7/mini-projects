import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Account = () => {

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const userState = useSelector((state) => state.userStore);

    const navigate = useNavigate();

    const getUser = async () => {
        try {
            // if (!userState.user) {navigate('/login')}
            const response = await fetch("/api/user", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            })
                .then(response => response.json())
                .then(response => {
                    setEmail(response.email);
                    setFirstName(response.firstname);
                    setLastName(response.lastname);
                });
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    const handleUpdate = () => {
        navigate('/account/update')
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column">
                <h1>user account</h1>
                <div className="d-flex flex-column mx-1">
                    <p className="mb-3 w-100">Email: {email}</p>
                    <p className="mb-3 w-100">First Name: {firstName}</p>
                    <p className="mb-3 w-100">Last Name: {lastName}</p>
                    <button onClick={handleUpdate} className="btn btn-dark mt-3 w-100">Update details</button>
                </div>
            </div>
        </div>
    );
};

export default Account;