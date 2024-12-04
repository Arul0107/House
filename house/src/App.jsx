import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import UserDetails from './components/UserDetails';
import ForgotPassword from './components/ForgotPassword';
import EditProperty from './components/EditProperty';
import UpdateUserDetails from './components/UpdateUserDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <LandingPage />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/userdetails"
          element={
            <Layout>
              <UserDetails />
            </Layout>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Layout>
              <ForgotPassword />
            </Layout>
          }
        />
        <Route
          path="/edit-property"
          element={
            <Layout>
              <EditProperty />
            </Layout>
          }
        />
        <Route
          path="/update-user-details"
          element={
            <Layout>
              <UpdateUserDetails />
            </Layout>
          }
        />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
};

export default App;
