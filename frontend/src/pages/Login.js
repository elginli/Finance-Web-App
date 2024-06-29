import React, {useEffect, useState, useSyncExternalStore} from "react"
import axios from "axios"
import {useNavigate, Link} from "react-router-dom"
import "./Login.css"

const Login = () => {

    const navigate = useNavigate()
    const[email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    async function submit(e) {
        e.preventDefault();

        console.log(email + '|' + password)

        try {
            const response = await axios.post("http://localhost:4000/login", {
                email, password
            });
            
            const data = response.data
            if (data.token && data.status === "exist") {
                sessionStorage.setItem('token', data.token)
                navigate("/home", { state: { id: data.email } })
            } else {
                setErrorMessage("Login failed, please check your credentials.")
            }

        } catch (e) {
            setErrorMessage("Login failed");
            console.log(e);
        }
    }

    return(
        <div className="login-container">
            <div className="login">
                <h1>Login</h1>

                <form onSubmit={submit}>
                    <input type = "text" onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" name = "email" id = "email"/>
                    <input type = "text" onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" name = "password" id = "password" />
                    <button type="submit">Login</button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                <br />

                <Link to="/signup">Don't have an Account? Sign Up</Link>
        
            </div>
        </div>
    )
}

export default Login