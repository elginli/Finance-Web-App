import Home from "../pages/Home"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import ViewPast from "../pages/ViewPast"
import SideBar from "./sidebar"
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

function Router(){
    const Layout = () =>{
        return(
          <>
            <SideBar />
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
                    <Route path="/home" element={<Layout />}> //SideBar
                        <Route index element={<Home />} />
                        <Route path="/home/view" element={<ViewPast />} />  // View Previous Budgets page
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }

    return(
        <BrowserRoutes />
    )
}

export default Router;