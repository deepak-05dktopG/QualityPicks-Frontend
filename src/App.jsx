import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
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
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, useScroll, useSpring } from "framer-motion";

//for chatbot
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

import Chatbot from './components/Chatbot';


const App = () => {
  //for chatbot



  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // const divRef = useRef(null);
  // useEffect(() => {

  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     const windowHeight = window.innerHeight;
  //     const documentHeight = document.documentElement.scrollHeight;

  //     // Show button if scrolled more than halfway
  //     if (scrollPosition < 500) {
  //       divRef.current.style.display = 'none';
  //       divRef.current.style.opacity = "0%";

  //     } else {
  //       divRef.current.style.display = 'block'; // Hide the div
  //       divRef.current.style.opacity = "50%";
  //     }
  //   };


  //   window.addEventListener('scroll', handleScroll);

  //   // Cleanup event listener on component unmount
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth',
  //   });
  // };




  //AOS
  useEffect(() => {
    AOS.init({
      disable: false,
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,

      offset: 120,
      delay: 0,
      duration: 1000,
      easing: 'ease',
      once: true, // ✅ boolean, not string
      mirror: false,
      anchorPlacement: 'top-bottom',
    });
  }, []);
  // Refresh AOS on route change
  useEffect(() => {
    setTimeout(() => {
      AOS.refresh();
    }, 200);
  }, [location]);



  //Scroll to Top
  function ScrollToTop() {
    const location = useLocation();
    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
    return null;
  }

  //for disabling right click
  // useEffect(() => {
  //   const handleContextMenu = (e) => e.preventDefault();
  //   document.addEventListener("contextmenu", handleContextMenu);
  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //   };
  // }, []);


  return (
    <>
      <motion.div className="z-5 progress-bar-top " style={{ scaleX }} ></motion.div>

      <ScrollToTop />
      <div className="d-flex flex-column min-vh-100">
        {/* <div
          ref={divRef}
          style={{
            position: "fixed",
            bottom: "80px",
            right: "23px",
            opacity: "1",
            transition: "opacity 0.3s ease",
          }}
          className="bg-light opacity-1 shadow rounded-circle d-flex align-items-center justify-content-center"
        >
          <div
            onClick={scrollToTop}
            className="text-primary"
            style={{
              cursor: "pointer",
              padding: "12px",
              zIndex: 9999,
            }}
          >
            🔝
          </div>
        </div> */}

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
        <Chatbot /> 
      </div>
    </>
  );
};

export default App;
