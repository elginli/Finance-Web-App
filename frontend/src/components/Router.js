import Home from "../pages/Home"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

function Router(){
    const Layout = () =>{
        return(
          <>
    
            <Outlet />
            
          </>
        )
    }

    const BrowserRoutes = () =>{
        return(
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />  // Login page route
                    <Route path="/signup" element={<Signup />} />  // Sign Up page route
                    <Route path="/home" element={<Home />} />  // Home page
                </Routes>
            </BrowserRouter>
        )
    }

    return(
        <BrowserRoutes />
    )
}

export default Router;