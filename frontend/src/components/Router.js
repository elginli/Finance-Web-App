import Home from "../pages/Home"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import ViewPast from "../pages/ViewPast"
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
                    <Route path="/" element={<Login />} />  // Login page route
                    <Route path="/signup" element={<Signup />} />  // Sign Up page route
                    <Route path="/home" element={<Home />} />  // Home page
                    <Route path="/view" element={<ViewPast />} />  // View Previous Budgets page
                </Routes>
            </BrowserRouter>
        )
    }

    return(
        <BrowserRoutes />
    )
}

export default Router;