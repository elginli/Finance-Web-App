import React, {useEffect, useState, useSyncExternalStore} from "react"
import axios from "axios"
import {useNavigate, Link} from "react-router-dom"

const Login = () => {

    const[email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function submit(e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/login", {
                email, password
            });

            const data = response.data;
            if (data.status === "exist") {
                navigate("/home", { state: { id: data.user.email } }); // Passing user email as state to home
            } else if (data.status === "notexist") {
                alert("User has not signed up");
            }
        } catch (error) {
            alert("Login failed");
            console.log(error);
        }
    }

    return(
        <div className="login">
            <h1>Login</h1>

            <form onSubmit={submit}>
                <input type = "email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" name = "email" id = "email"/>
                <input type = "password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" name = "password" id = "password" />
                <button type="submit">Login</button>
            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/signup">Sign Up</Link>
        
        </div>
    )
}

export default Login