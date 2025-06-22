import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AdminPage from './AdminPage';
import Swal from 'sweetalert2';


function Adminlogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  //admin post method for login
  const adminLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/adminLogin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: '✅ Welcome Admin 🧑‍💼',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      localStorage.setItem('isAdminLoggedIn', 'true'); // ✅ set auth flag
      navigate('/adminpage'); // Navigate to Admin Page
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed ❌',
        text: data.message,
      });
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-gradient" style={{ background: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)" }}>
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-lg-8">
          <div className="row shadow-lg bg-white  overflow-hidden">

            {/* Left: Admin Info Section */}
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center p-5 bg-danger text-white position-relative">
              <img
                src="https://img.icons8.com/color/96/admin-settings-male.png"
                alt="Admin Icon"
                className="mb-3"
                style={{ width: 64, height: 64 }}
              />
              <h2 className="fw-bold mb-3 text-center">Admin Panel</h2>
              <h5 className="mb-3 text-center">Restricted Access</h5>
              <p className="text-center" style={{ fontSize: "1.1rem" }}>
                This section is strictly for authorized administrators of <strong>QualityPics</strong>. Please log in with valid admin credentials.
              </p>
              <div className="mt-auto text-center small" style={{ opacity: 0.8 }}>
                &copy; {new Date().getFullYear()} QualityPics Admin Access Only.
              </div>
            </div>

            {/* Right: Login Form */}
            <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
              <div className="mb-4 text-center">
                <h2 className="mb-2">Admin Login</h2>
                <p className="text-muted">Sign in to manage platform settings and data.</p>
              </div>
              <form onSubmit={adminLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-danger btn-lg w-100">
                  Login
                </button>
              </form>

              <div className="text-center mt-4">
                <Link to="/" className="text-decoration-none text-primary me-2">
                  User Login
                </Link>
                <span className="text-muted">|</span>
                <Link to="/register" className="text-decoration-none text-primary ms-2">
                  User Register
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>


  );
}

export default Adminlogin;
