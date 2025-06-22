import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import RequestProductPage from './pages/RequestProductPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Login from './pages/Login';
import { ToastContainer, Toast } from 'react-bootstrap';
import Adminlogin from './pages/Adminlogin';
import AdminPage from './pages/AdminPage';
import { ProtectedRoute, ProtectedRouteforAdmin } from './components/ProtectedRoute';

const App = () => {

  //Scroll to Top
  function ScrollToTop() {
    const location = useLocation();
    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
    return null;
  }

  return (
    <>
      <ScrollToTop />
      <div className="d-flex flex-column min-vh-100">

        <main className="flex-grow-1">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:category" element={<ProtectedRoute> <ProductsPage /> </ProtectedRoute>} />
            <Route path="/product/:id" element={<ProtectedRoute> <ProductDetailsPage /> </ProtectedRoute>} />
            <Route path="/request-product" element={<ProtectedRoute> <RequestProductPage />  </ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute> <ContactPage /> </ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute> <CartPage /> </ProtectedRoute>} />
            <Route path="/adminLogin" element={<Adminlogin />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/adminpage" element={<ProtectedRouteforAdmin>  <AdminPage />  </ProtectedRouteforAdmin>} />
          </Routes>
        </main>

      </div>
    </>
  );
};

export default App;
