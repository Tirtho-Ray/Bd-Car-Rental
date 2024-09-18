import { createBrowserRouter } from 'react-router-dom';
import Main from '../MainUi/Main';
import Home from '../User/Pages/Home/Home';
import About from '../User/Pages/About/About';
import VehiclesMainPage from '../User/Pages/Vehicles/VehiclesMainPage';
import Loader from '../Loader/Loader';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Booking from '../User/Pages/booking/booking';
import MyBooking from '../User/Pages/booking/showBooking';
import Dashboard from '../Admin/Dashboard/Dashboard';
import DashContent from '../Admin/Dashboard/DashContent';
import DashHome from '../Admin/Dashboard/DashHome';
import DashProduct from '../Admin/Dashboard/DashProduct';
import CreateCar from '../Admin/Dashboard/CreateCar';
import UpdateCar from '../Admin/Dashboard/UpdateCar';
import BookingData from '../Admin/Dashboard/Booking/BookingData';
import ReturnBooking from '../Admin/Dashboard/Booking/ReturnBooking';
import GoBd from '../User/Pages/GOBD/GoBd';
import ProtectedRoute from '../layout/ProtectedRoute';
// import BookingWithPayment from '../User/Pages/booking/showBookWithPayment';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Loader />,
    element: <Main />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/all-cars', element: <VehiclesMainPage /> },
      { path: '/sign-up', element: <Register /> },
      { path: '/sign-in', element: <Login /> },
      { path: '/booking', element: <Booking /> },
      { path: '/my-bookings', element: <MyBooking /> },
      { path: '/go-bangladesh', element: <GoBd /> },
      // { path: '/payment-book', element: <BookingWithPayment /> },
      
      {
        path: '/admin-dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          { path: '/admin-dashboard/home', element: <DashHome /> },
          { path: '/admin-dashboard/cars', element: <DashContent /> },
          { path: '/admin-dashboard/bookings-data', element: <BookingData /> },
          { path: '/admin-dashboard/product', element: <DashProduct /> },
          { path: '/admin-dashboard/create-car', element: <CreateCar /> },
          { path: '/admin-dashboard/update-car/:id', element: <UpdateCar /> },
          { path: '/admin-dashboard/return-booking/:id', element: <ReturnBooking /> },
        ],
      },
    ],
  },
]);

export default router;
