import React, { useState,  } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './sidebar.css'

function SideBar(){
    const [isOpen, setIsOpen] = useState(true)  
    const navigate = useNavigate()
    const toggleSidebar = () => setIsOpen(!isOpen)  

    const handleLogout = () => {
        sessionStorage.removeItem('token')
        sessionStorage.clear()
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
                    <Link to="/" onClick={handleLogout}>Logout</Link>
                </div>
            )}
        </div>
    )
}

export default SideBar