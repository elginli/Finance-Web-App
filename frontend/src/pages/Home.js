import React, {useEffect, useState} from "react"
import axios from "axios"
import {Navigate, Link} from "react-router-dom"

const Home = () => {

    const [budget, setBudget] = useState(0)
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [food, setFood] = useState(0)
    const [school, setSchool] = useState(0)
    const [home, setHome] = useState(0)
    const [transportation, setTransportation] = useState(0)
    const [fun, setFun] = useState(0)
    const [misc, setMisc] = useState(0)
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 11 }, (_, index) => currentYear - 5 + index); // Creates an array from 5 years ago to 5 years in the future

    /*
    useEffect( ()=>{
        let processing = true
        axiosFetchData(processing)
        return() => {
            processing = false
        }
    },[])

    const axiosFetchData = async(setName, processing) => {
        await axios.get("http://localhost:4000/user")
        .then(res => {
            if(processing){
                setName(res.data.name)
            }
        })
        .catch(err => console.log(err))
    }
    */

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/user");
                setName(response.data.name)
                setEmail(response.data.email)  
                console.log(response.data.name, response.data.email)
            } catch (error) {
                console.error('Failed to fetch name:', error)
            }
        };
    
        fetchData();
    });

    const axiosPostData = async() =>{
        const postData = {
            email: email,
            budget: budget || 0, 
            month: month,     
            year: year,
            food: food || 0,
            home: home || 0,
            school: school || 0,
            transportation: transportation || 0,
            fun: fun || 0,
            misc: misc || 0
        }

        await axios.post("http://localhost:4000/home", postData)
        console.log(email + '|' + budget + '|' + month + '|' + year + '|' + food + '|' + school + '|' + home + '|' + transportation + '|' + fun + '|' + misc)
        
    }

    async function submit(e) {
        e.preventDefault();

        if(budget === ''){
            setError(<p>Enter a Budget Amount.</p>)
        } else {
            setError('')
            axiosPostData()
        }
    }

    return(
        <div>
        <h1>Budget Chart</h1>
        <p>Welcome {name}!</p>
        <p>Enter Monthly Budget and Expenses</p>
        <form className = "BudgetForm">
            <label>
                Month:
                <select value={month} onChange={e => setMonth(e.target.value)}>
                    {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                    ))}
                </select>
            </label>
            <label>
                Year:
                <select value={year} onChange={e => setYear(e.target.value)}>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </label>
            <label>
                Budget:
                <input type="number" value={budget} onChange={e => setBudget(e.target.value)} />
            </label>
            <label>
                Food:
                <input type="number" value={food} onChange={e => setFood(e.target.value)} />
            </label>
            <label>
                Home:
                <input type="number" value={home} onChange={e => setHome(e.target.value)} />
            </label>
            <label>
                School:
                <input type="number" value={school} onChange={e => setSchool(e.target.value)} />
            </label>
            <label>
                Transportation:
                <input type="number" value={transportation} onChange={e => setTransportation(e.target.value)} />
            </label>
            <label>
                Fun:
                <input type="number" value={fun} onChange={e => setFun(e.target.value)} />
            </label>
            <label>
                Misc:
                <input type="number" value={misc} onChange={e => setMisc(e.target.value)} />
            </label>
            <button type="submit" onClick={submit}>Submit</button>
        </form>
    </div>
    )
}

export default Home;