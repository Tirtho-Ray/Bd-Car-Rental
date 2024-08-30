import { createBrowserRouter } from "react-router-dom";
import Main from "../MainUi/Main";
import Home from "../User/Pages/Home/Home";
import About from "../User/Pages/About/About";
import VehiclesMainPage from "../User/Pages/Vehicles/VehiclesMainPage";

import Loader from "../Loader/Loader";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

const router = createBrowserRouter([
    // user content
    {
        path: '/',
        errorElement:<Loader />,
        element:<Main />,
        children:[
            {
                path:'/',
                element:<Home />
            },
            {
                path:'/about',
                element:<About />
            },
            {
                path:'/all-cars',
                element:<VehiclesMainPage />
            },
            {
                path:'/sign-up',
                element:<Register />
            },
            {
                path:'/sign-in',
                element:<Login />
            },
        ]  
    }

])

export default router;