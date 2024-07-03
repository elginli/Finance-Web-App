import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './sidebar.css'

function SideBar(){
    const [isOpen, setIsOpen] = useState(true)  
    const navigate = useNavigate()
    const toggleSidebar = () => setIsOpen(!isOpen)  
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        setIsLoggedIn(!!token)
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('token')
        sessionStorage.clear()
        setIsLoggedIn(false)
        navigate('/login')
    }

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <button onClick={toggleSidebar} className="toggle-button">
                {isOpen ? '✖️' : '☰'}
            </button>
            {isOpen && (
                <div className="links">
                    <Link to="/home">Home</Link>
                    <Link to="/home/view">View</Link>
                    {isLoggedIn ? (
                        <Link to="/" onClick={handleLogout}>Logout</Link>
                    ) : (
                        <Link to="/">Login</Link>
                    )}
                </div>
            )}
        </div>
    )
}

export default SideBar