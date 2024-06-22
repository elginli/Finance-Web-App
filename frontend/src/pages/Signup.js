import React, {useEffect, useState, useSyncExternalStore} from "react"
import axios from "axios"
import {useNavigate, Link} from "react-router-dom"

const Signup = () => {

    const history = useNavigate();
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function submit(e){
        e.preventDefault()

        try{
            await axios.post("http://localhost:3000/signup",{
                email, password
            })
            .then(res=>{
                if(res.data == "exist"){
                    alert("User already exists")
                }
                else if(res.data == "notexist"){
                    history('/home', {state:{id:email}})
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })
            
        }
        catch(e){
            console.log(e);
        }
    }

    return(
        <div className="login">
            <h1>Signup</h1>

            <form action = "POST">
                <input type = "name" onChange={(e)=>{setName(e.target.value)}} placeholder="name" name = "name" id = "name"/>
                <input type = "email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" name = "email" id = "email"/>
                <input type = "password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" name = "password" id = "password" />
                <input type="submit" onClick={submit}/>

            </form>
        </div>
    )
}

export default Signup