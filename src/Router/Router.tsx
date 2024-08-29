import { createBrowserRouter } from "react-router-dom";
import Main from "../MainUi/Main";
import Home from "../User/Pages/Home/Home";
import About from "../User/Pages/About/About";
import VehiclesMainPage from "../User/Vehicles/VehiclesMainPage";
import SignIn from "../Auth/SignIn";
import SignUp from './../Auth/SignUp';

const router = createBrowserRouter([
    // user content
    {
        path: '/',
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
                element:<SignUp />
            },
            {
                path:'/sign-in',
                element:<SignIn />
            },
        ]  
    }

])

export default router;