import React, {useEffect, useState} from "react"
import axios from "axios"
import {useNavigate, Link} from "react-router-dom"

const Home = () => {

    const [budget, setBudget] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [food, setFood] = useState('')
    const [school, setSchool] = useState('')
    const [home, setHome] = useState('')
    const [transportation, setTransportation] = useState('')
    const [fun, setFun] = useState('')
    const [misc, setMisc] = useState('')

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 11 }, (_, index) => currentYear - 5 + index); // Creates an array from 5 years ago to 5 years in the future


    return(
        <div>
        <h1>Home</h1>
        <p>Enter Monthly Budget and Expenses</p>
        <form>
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
        </form>
        <form>
            <label>
                Budget:
                <input type="number" value={budget} onChange={e => setBudget(e.target.value)} />
            </label>
            <label>
                Food:
                <input type="number" value={food} onChange={e => setFood(e.target.value)} />
            </label>
            <label>
                Home Expenses:
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
                Miscellaneous:
                <input type="number" value={misc} onChange={e => setMisc(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
        </form>
    </div>
    )
}

export default Home;