import React, {useEffect, useState, useSyncExternalStore} from "react"
import axios from "axios"
import {useNavigate, Link} from "react-router-dom"
import "./Signup.css"

const Signup = () => {

    const redirect = useNavigate();
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const submit = async (e) => {
        e.preventDefault(); 

        console.log(name + '|' + email + '|' + password)

        if (!isValidEmail(email)) {
            setErrorMessage("Please enter a valid email address.")
            return
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
                name, email, password
            });

            const data = response.data;
            if (data.message === 'Email already in use') {
                setErrorMessage("User already exists")
            } else {
                redirect('/', { state: { id: data.email } })
            }
        } catch (e) {
            setErrorMessage("Signup failed")
            console.log(e)
        }
    };

    return(
        <div className="signup-container">
            <div className="signup">
                <h1>Sign Up</h1>

                <form onSubmit={submit}>
                    <input type = "text" onChange={(e)=>{setName(e.target.value)}} placeholder="name" name = "name" id = "name" value={name}/>
                    <input type = "text" onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" name = "email" id = "email" value={email}/>
                    <input type = "text" onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" name = "password" id = "password" value={password}/>
                <button type="submit">Sign Up</button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                <br />

                <Link to="/">Already have an account? Login</Link>
            </div>
        </div>
    )
}

export default Signup