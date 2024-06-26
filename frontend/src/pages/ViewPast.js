import React, {useEffect, useState} from "react"
import axios from "axios"
import {Navigate, Link} from "react-router-dom"
import { Chart as ChartJS } from "chart.js/auto"
import { Bar, Doughnut, Line } from "react-chartjs-2"
import "./ViewPast.css"

const ViewPast = () => {
    const [budget, setBudget] = useState(0)
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [food, setFood] = useState(0)
    const [school, setSchool] = useState(0)
    const [home, setHome] = useState(0)
    const [transportation, setTransportation] = useState(0)
    const [entertainment, setEntertainment] = useState(0)
    const [personal, setPersonal] = useState(0)
    const [savings, setSavings] = useState(0)
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [showCharts, setShowCharts] = useState(false)
    const [expenses, setExpenses] = useState('')

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 11 }, (_, index) => currentYear + index); // Creates an array from this year to next 10 years

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

    



    return(
        <div>


        </div>
    )
}

export default ViewPast;