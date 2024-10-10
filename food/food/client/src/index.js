import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { CartProvider } from "./context/cart"; // Import the CartProvider
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// User Pages
import Home from "./pages/Home/Home";
import Section2 from "./pages/Home/Section2";
import Section3 from "./pages/Home/Section3";
import Section5 from "./pages/Home/Section5";
import Register_user from './pages/Registerpage';
import Login_user from './pages/Loginpage';
import UserGetById from "./pages/Admin/Food/Get_by_id";
import BillDetails from './components/Layouts/BillDetails'; // Import the BillDetails component

// Admin Pages
import Layout from './pages/Admin/Layout';
import Dashboard from './pages/Admin/Dashboard';
import Get_all_item from "./pages/Admin/Food/Get_all";
import AdminGetById from "./pages/Admin/Food/Get_by_id";
import Add_Edit from './pages/Admin/Food/Insert_update';
import UserManagement from './pages/Admin/User/UserManagement';
import UserDetail from './pages/Admin/User/UserDetail';

// Order Details Page
import OrderDetails from './pages/OrderDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ToastContainer />
    <AuthProvider>
      <CartProvider> {/* Wrap the app in CartProvider */}
        <BrowserRouter>
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Section2 />} />
            <Route path="/menu" element={<Section3 />} />
            <Route path="/contact" element={<Section5 />} />
            <Route path="/register" element={<Register_user />} />
            <Route path="/login" element={<Login_user />} />
            <Route path="/:id" element={<UserGetById />} />
            <Route path="/order-details" element={<OrderDetails />} /> {/* Order details page route */}
            <Route path="/bill-details" element={<BillDetails />} /> {/* Add BillDetails page route */}
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="food" element={<Get_all_item />} />
              <Route path="food/add" element={<Add_Edit />} />
              <Route path="food/:id" element={<AdminGetById />} />
              <Route path="food/:id/edit" element={<Add_Edit />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="users/add" element={<UserDetail />} />
              <Route path="users/:id" element={<UserDetail />} /> 
            </Route>
            
            {/* Fallback route for 404 Not Found */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </>
);
