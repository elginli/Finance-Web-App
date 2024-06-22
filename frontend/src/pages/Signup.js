import React, {useEffect, useState, useSyncExternalStore} from "react"
import axios from "axios"
import {useNavigate, Link} from "react-router-dom"

const Signup = () => {

    const history = useNavigate();
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submit = async (e) => {
        e.preventDefault(); 

        try {
            const response = await axios.post("http://localhost:3000/signup", {
                name, email, password
            });

            const data = response.data;
            // Assuming backend sends specific status messages or codes:
            if (data.message === 'Email already in use') {
                alert("User already exists");
            } else {
                // Navigate to 'home' upon successful signup
                navigate('/home', { state: { id: email } });
            }
        } catch (error) {
            alert("Signup failed");
            console.log(error);
        }
    };

    return(
        <div className="login">
            <h1>Signup</h1>

            <form onSubmit={submit}>
                <input type = "name" onChange={(e)=>{setName(e.target.value)}} placeholder="name" name = "name" id = "name"/>
                <input type = "email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" name = "email" id = "email"/>
                <input type = "password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" name = "password" id = "password" />
                <button type="submit">Signup</button>

            </form>
        </div>
    )
}

export default Signup