import {
    createBrowserRouter
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import AboutUs from "../pages/About/AboutUs";
import Product from "../pages/Products/Product";
import Blog from "../pages/Blogs/Blog";
import ContactUs from "../pages/Contact/ContactUs";
import Signup from "../components/SignUp"
import UpdateProfile from "../pages/dashboard/UpdateProfile"
import CartPage from "../pages/Products/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard"
import Users from "../pages/dashboard/admin/Users"
import AddItems from "../pages/dashboard/admin/AddItems";
import ManageItems from "../pages/dashboard/admin/ManageItems"
import UpdateProduct from '../pages/dashboard/admin/UpdateProduct'
import Payment from "../pages/Products/Payment"
import Order from "../pages/dashboard/Order"
import ManageBookings from "../pages/dashboard/admin/ManageBookings"

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
          path: "/about",
          element: <AboutUs/>
        },
        {
          path: "/product",
          element: <Product/>
        },
        {
          path: "/blog",
          element: <Blog/>
        },
        {
          path: "/contact",
          element: <ContactUs/>
        },
        {
          path: "/cart-page",
          element: <CartPage/>
        },
        {
          path: "/payment-checkout",
          element: <Payment/>
        },
        {
          path: "/update-profile",
          element: <UpdateProfile/>
        },
        {
          path: '/order',
          element: <Order/>
        }
      ]
    },
    {
      path: "/dashboard",
      element: <DashboardLayout/>,
      children: [
        {
          path: '',
          element: <Dashboard/>
        },
        {
          path: 'users',
          element: <Users/>
        },
        {
          path: 'add-items',
          element: <AddItems/>
        },
        {
          path: 'manage-items',
          element: <ManageItems/>
        },
        {
          path: 'update-product/:id',
          element: <UpdateProduct/>, 
          loader: ({params}) => fetch(`http://localhost:6003/product/${params.id}`)
        },
        {
          path: "manage-bookings",
          element: <ManageBookings/>
        }
      ]
    },
    {
      path: "/signup",
      element: <Signup/>
    }
  ]);

export default router;