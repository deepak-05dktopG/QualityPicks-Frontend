
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { motion, useScroll, useSpring } from "framer-motion";


const Navbar = () => {
  const navigate = useNavigate();

  //logout function
  const logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userId')
        // localStorage.removeItem('token');

        Swal.fire({
          title: 'Logged out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        navigate('/login');
      }
    });
  }


  return (
    <nav className="navbar z-4  shadow-sm navbar-expand-lg navbar-custom sticky-top">
      <div className="container ">
        <Link className="navbar-brand fw-bold" to="/">
          QualityPicks
        </Link>


        {/* for mobile devices */}
        <button
          className="navbar-toggler border-secondary  border-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasWithBothOptions"
          aria-controls="offcanvasWithBothOptions"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="text-secondary "><i className="fa-solid fa-bars "></i></span>
        </button>
        {/* <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">X</button> */}

        <div className="offcanvas offcanvas-end w-50 d-lg-none" style={{ backgroundColor: "#003366" }} data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
          <div className="offcanvas-header text-white">
            <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">QualityPicks</h5>
            <button type="button" className=" btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav  mb-2 mb-lg-0 d-flex flex-column justify-content-between align-items-center w-100">
              <span className='d-flex flex-column '>
                <hr />
                <li className="nav-item">
                  <NavLink className={({ isActive }) =>
                    isActive ? "nav-link text-warning fw-bold" : "nav-link text-white"} to="/">Home</NavLink>
                </li>
                <hr />
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </a>
                  <ul className="dropdown-menu mt-auto mt-sm-2 mt-md-2 mt-lg-5" aria-labelledby="navbarDropdown">
                    <li><NavLink className="dropdown-item" to="/products/electronics">Electronics</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/products/home-kitchen">Home & Kitchen</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/products/fashion">Fashion</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/products/beauty">Beauty</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/products/books">Books</NavLink></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><NavLink className="dropdown-item" to="/products/all">All Products</NavLink></li>
                  </ul>
                </li>
                <hr />
                <li className="nav-item">
                  <NavLink className={({ isActive }) =>
                    isActive ? "nav-link text-warning fw-bold" : "nav-link text-white"} to="/request-product">Request Product</NavLink>
                </li>
                <hr />
                <li className="nav-item">
                  <NavLink className={({ isActive }) =>
                    isActive ? "nav-link text-warning fw-bold" : "nav-link text-white"} to="/contact">Contact</NavLink>
                </li>
                <hr />
                {localStorage.getItem("isLoggedIn") === "true" && (
                  <li>
                    <NavLink to={'/cart'} className={({ isActive }) =>
                      isActive ? "nav-link text-warning fw-bold" : "nav-link text-white"} > 🛒 My Cart
                    </NavLink>
                  </li>
                )}
                <hr />
              </span>
              <span>
                <li className='mt-4'>
                  {localStorage.getItem("isLoggedIn") === "true" ? (
                    <div className='d-flex flex-column  '>
                      <br />
                      <button className='btn btn-outline-danger btn-sm ' onClick={logout}>
                        Logout
                      </button>
                    </div>
                  ) :
                    <button onClick={() => navigate('/login')} className="btn btn-outline-success">
                      Login
                    </button>
                  }
                </li>
              </span>

            </ul>
          </div>
        </div>




        {/* for large devices */}
        <div className="collapse navbar-collapse  ">
          <ul className="navbar-nav  mb-2 mb-lg-0 d-flex justify-content-between align-items-center w-100">
            <span className='d-flex'>
              <li className="nav-item">
                <NavLink className={({ isActive }) =>
                  isActive ? "nav-link text-warning fw-bold" : "nav-link text-white"} to="/">Home</NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <ul className="dropdown-menu mt-auto mt-sm-2 mt-md-2 " aria-labelledby="navbarDropdown">
                  <li><NavLink className="dropdown-item" to="/products/electronics">Electronics</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/products/home-kitchen">Home & Kitchen</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/products/fashion">Fashion</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/products/beauty">Beauty</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/products/books">Books</NavLink></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><NavLink className="dropdown-item" to="/products/all">All Products</NavLink></li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) =>
                  isActive ? "nav-link text-warning fw-bold" : "nav-link text-white"} to="/request-product">Request Product</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) =>
                  isActive ? "nav-link text-warning fw-bold" : "nav-link text-white"} to="/contact">Contact</NavLink>
              </li>
              {localStorage.getItem("isLoggedIn") === "true" && (
                <li className=" border border-0 ">
                  <NavLink to={'/cart'} className={({ isActive }) =>
                    isActive ? "nav-link text-warning fw-bold" : "nav-link text-white"}> 🛒 My Cart</NavLink>
                </li>
              )}
            </span>
            <span>
              <li className=''>
                {localStorage.getItem("isLoggedIn") === "true" ? (
                  <div className=''>
                    <button className='btn btn-outline-danger btn-sm  ms-2' onClick={logout}>
                      Logout
                    </button>
                  </div>
                ) :
                  <button onClick={() => navigate('/login')} className="btn btn-outline-success">
                    Login
                  </button>
                }
              </li>
            </span>

          </ul>
        </div>







      </div>
    </nav>
  );
};

export default Navbar;
