import React, {useEffect, useState, useSyncExternalStore} from "react"
import axios from "axios"
import {useNavigate, Link} from "react-router-dom"

const Signup = () => {

    const redirect = useNavigate();
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submit = async (e) => {
        e.preventDefault(); 

        console.log(name + '|' + email + '|' + password)

        try {
            const response = await axios.post("http://localhost:4000/signup", {
                name, email, password
            });

            const data = response.data;
            // Assuming backend sends specific status messages or codes:
            if (data.message === 'Email already in use') {
                alert("User already exists");
            } else {
                // Navigate to 'home' upon successful signup
                redirect('/home', { state: { id: email } });
            }
        } catch (e) {
            alert("Signup failed");
            console.log(e);
        }
    };

    return(
        <div className="login">
            <h1>Signup</h1>

            <form onSubmit={submit}>
                <input type = "text" onChange={(e)=>{setName(e.target.value)}} placeholder="name" name = "name" id = "name" value={name}/>
                <input type = "text" onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" name = "email" id = "email" value={email}/>
                <input type = "text" onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" name = "password" id = "password" value={password}/>
                <button type="submit">Signup</button>
            </form>

            <br />

            <Link to="/login">Already have an account? Login</Link>
        </div>
    )
}

export default Signup