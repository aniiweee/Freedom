import { createBrowserRouter} from "react-router-dom";
import GuestLayout from "./components/GuestLayout/GuestLayout";
import ProtectedLayout from "./components/ProtectedLayout/ProtectedLayout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import About from "./pages/about/About";
import Profile from "./pages/profile/Profile";
import ProductList from "./pages/productlist/ProductList";
import AddProduct from "./pages/addproduct/AddProduct";
import EditProduct from "./pages/editproduct/EditProduct";
import AllProductList from "./pages/allproductList/AllProductList";
import ViewProduct from "./pages/viewproduct/ViewProduct";

const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/',
                element: <AllProductList/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: '/register',
                element: <Register/>,
            },
        ],
    },
    {
        path: '/',
        element: <ProtectedLayout/>,
        children: [
            {
                path: '/about',
                element: <About/>,
            },
            {
                path: '/profile',
                element: <Profile/>,
            },
            {
                path: '/addproduct',
                element: <AddProduct/>
            },
            {
                path: "/productlist",
                element: <ProductList/>,
            },
            {
                path: "/editproduct/:id/edit",
                element: <EditProduct/>,
            },
            {
                path: "/view/:id/view",
                element: <ViewProduct />,
            },
        ],
    },
]);

export default router;