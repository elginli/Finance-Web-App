import React, {useEffect, useState} from "react"
import axios from "axios"
import {useNavigate, Link} from "react-router-dom"

const Home = () => {

    const [budget, setBudget] = useState('')

    return(
     <div>
       <h1>Home</h1>
       <p>This is the Home Page</p>
    </div>
    )
}

export default Home;