import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import { SocketProvider } from "./context/SocketContext"; // Updated to use the new provider
import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import Dashboard from "./pages/FreelancerDashboard";
import CreateGig from "./pages/CreateGig";
import EditGig from "./pages/EditGig";
import FreelancerGigDetails from "./pages/FreelancerGigDetails";
import ClientGigDetails from "./pages/ClientGigDetails";
import ClientDashboard from "./pages/ClientDashboard";
import ClientProfile from "./pages/ClientProfile";
import Favorites from "./pages/Favorites";
import FreelancerProfile from "./pages/FreelancerProfile";
import OrdersDashboard from "./pages/OrdersDashboard";
import FreelancerOrdersDashboard from "./pages/FreelancerOrdersDashboard";
import Cart from "./pages/Cart";
import ChatPage from "./pages/ChatPage";
import MyOrders from "./pages/MyOrders";

// Configure axios defaults
const backendBaseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
axios.defaults.baseURL = backendBaseURL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const App = () => {
  return (
    <SocketProvider>
      <Router>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Splash />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          
          {/* Freelancer Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-gig" element={<CreateGig />} />
          <Route path="/edit-gig/:id" element={<EditGig />} />
          <Route path="/freelancer-profile" element={<FreelancerProfile />} />
          
          {/* Gig Routes */}
          <Route
            path="/gig/:gigId"
            element={
              (() => {
                const userRole = localStorage.getItem('userRole');
                if (userRole === 'freelancer') {
                  return <FreelancerGigDetails />;
                } else if (userRole === 'client') {
                  return <ClientGigDetails />;
                } else {
                  return <Home />; // Redirect to home if no role
                }
              })()
            }
          />
          
          {/* Client Routes */}
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/client-profile" element={<ClientProfile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/my-orders" element={<MyOrders />} />
          
          {/* Orders Route */}
          <Route path="/orders" element={<OrdersDashboard />} />
          <Route path="/freelancer-orders-dashboard" element={<FreelancerOrdersDashboard />} />
          
          {/* Cart Route */}
          <Route path="/cart" element={<Cart />} />
          
          {/* Chat Route */}
          <Route path="/chat" element={<ChatPage />} />

          {/* Fallback Route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </SocketProvider>
  );
};

export default App;