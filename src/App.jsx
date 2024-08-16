import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser, login, logout } from "./store/userSlice/userSlice";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import OrderConfirmation from "./pages/user/OrderConfirmation";
import ManageOrders from "./pages/admin/ManageOrders";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/user/Dashboard"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CreateCategory = lazy(() => import("./pages/admin/CreateCategory"));
const AdminHome = lazy(() => import("./pages/admin/AdminHome"));
const CreateProduct = lazy(() => import("./pages/admin/CreateProduct"));
const Users = lazy(() => import("./pages/admin/Users"));
const Profile = lazy(() => import("./pages/user/Profile"));
const Orders = lazy(() => import("./pages/user/Orders"));
const Cart = lazy(() => import("./pages/Cart"));
const ManageProducts = lazy(() => import("./pages/admin/ManageProducts"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("userToken");
  useEffect(() => {
    if (token === null) {
      return dispatch(logout());
    }

    const fetchUser = async () => {
      try {
        const reponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/auth/verify`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("verify user: ", reponse);
        dispatch(login());
        dispatch(setUser(reponse.data.user));
      } catch (error) {
        dispatch(logout());
      }
      dispatch(login());
    };
    fetchUser();
  }, [token]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/dashboard" element={<ProtectedRoutes />}>
            <Route path="" element={<Dashboard />}>
              <Route index element={<Profile />} />
              <Route path="orders" element={<Orders />} />
            </Route>
          </Route>
          <Route path="/admin-dashboard" element={<AdminRoutes />}>
            <Route path="" element={<AdminDashboard />}>
              <Route index element={<AdminHome />} />
              <Route path="users" element={<Users />} />
              <Route path="create-product" element={<CreateProduct />} />
              <Route path="create-category" element={<CreateCategory />} />
              <Route path="manage-products" element={<ManageProducts />} />
              <Route path="manage-orders" element={<ManageOrders />} />

              {/* <Route path="orders" element={<ManageOrders />} /> */}
            </Route>
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/about" element={<Contact />} />
          <Route path="order-confirmation" element={<OrderConfirmation />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
