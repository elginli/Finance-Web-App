import React, {useEffect, useState} from "react"
import axios from "axios"
import {useNavigate, Link} from "react-router-dom"
import { Chart as ChartJS } from "chart.js/auto"
import { Bar, Doughnut, Line } from "react-chartjs-2"
import moment from 'moment'
import "./ViewPast.css"

const ViewPast = () => {
    const [budget, setBudget] = useState(0)
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
    const [expenses, setExpenses] = useState('')
    const [userData, setUserData] = useState({})
    const [creationDate, setCreationDate] = useState('');
    const [message, setMessage] = useState(''); 


    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 11 }, (_, index) => currentYear + index); // Creates an array from this year to next 10 years

    const [month, setMonth] = useState('January')
    const [year, setYear] = useState(currentYear)

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

    const getUserData = async () => {
        try {
            const response = await axios.post('http://localhost:4000/userData', { email, month, year });
            if (response.data) {
                const { budget, food, school, home, transportation, entertainment, personal, savings, createdAt } = response.data;
    
                setUserData(response.data)
                setBudget(budget)
                setFood(food);
                setSchool(school)
                setHome(home)
                setTransportation(transportation)
                setEntertainment(entertainment)
                setPersonal(personal)
                setSavings(savings)
                setCreationDate(createdAt)
                
                console.log(budget + '|' + month + '|' + year + '|' + food + '|' + school + '|' + home + '|' + transportation + '|' + entertainment + '|' + personal + '|' + savings)

                setExpenses(parseFloat(food) + parseFloat(home) + parseFloat(school) + parseFloat(transportation) + parseFloat(entertainment) + parseFloat(personal) + parseFloat(savings))

                setMessage('');
            }
        } catch(error){
            console.error('Failed to fetch budget data:', error);
            setUserData(null);
            setMessage('No data found for the selected month and year.')
        }
    };

    const formattedDate = creationDate ? moment(creationDate).format('MMMM Do YYYY, h:mm:ss a') : 'Loading...'

    async function submit(e) {
        e.preventDefault();

        getUserData()
    }

    const chartData = {
        labels: ['Food', 'Home', 'School', 'Transportation', 'Entertainment', 'Personal', 'Savings'],
        datasets: [
            {
                label: 'Spending',
                data: [food, home, school, transportation, entertainment, personal, savings],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',  // Red
                    'rgba(54, 162, 235, 1)',  // Blue
                    'rgba(255, 206, 86, 1)',  // Yellow
                    'rgba(75, 192, 192, 1)',  // Green
                    'rgba(153, 102, 255, 1)',  // Purple
                    'rgba(255, 159, 64, 1)'   // Orange
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    const chartOptions = {
        plugins: {
          legend: {
            labels: {
              color: 'black' 
            }
          },
          tooltip: {
            titleColor: 'white', 
            bodyColor: 'white', 
          }
        },
      };


    return(
        <div>

            <div className="container">
                <h1>View Past Charts</h1>
                <p className="welcome">Welcome {name}!</p>
            </div>

            <form className="BudgetForm">
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
            <button type="submit" onClick={submit}>Submit</button>
            </form>

            <div className="parent-chart-container">
                {userData ? (
                    <>
                    <div className="chart-container">
                        <h2>Budget Distribution: ${budget}</h2>
                        <Doughnut data={chartData} options={chartOptions} />
                    </div>
                    <div className="chart-container">
                        <h2>Total Spending: ${expenses}</h2>
                        <Bar data={chartData} options={chartOptions} />
                        <p className="create-date">Created on: {formattedDate}</p>
                    </div>
                    </>
                ) : (
                    <p className="no-data">No data available. Please adjust month and year.</p>
                )}
            </div>
        
        </div>
    )
}

export default ViewPast;