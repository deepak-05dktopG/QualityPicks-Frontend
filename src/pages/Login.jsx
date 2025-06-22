import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Adminlogin from './Adminlogin';
import Swal from 'sweetalert2';

function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  //POST method for login
  const login = async (e) => {
    e.preventDefault();

    setLoad(true)

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setLoad(false)

    if (res.ok) {
      Swal.fire({
        icon: 'success',
        title: `Welcome, ${data.name} 👋`,
        text: 'You have successfully logged in!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });
      setLoad(false)
      localStorage.setItem("userId", data._id);
      localStorage.setItem('isLoggedIn', 'true'); // ✅ set auth flag
      navigate('/');
      setLoad(false)

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed ❌',
        text: data.message || 'Invalid email or account not found',
      });
    }
  };

  //******************Frontend UI********************************************************************************************/
  return (
    // <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
    //   <div className="row shadow bg-white rounded overflow-hidden w-100" style={{ maxWidth: '900px' }}>



    //     {/* Login Form */}
    //     <div className="col-md-6 p-4">
    //       <h2 className="text-center mb-4">Login</h2>
    //       <form onSubmit={login}>
    //         <div className="mb-3">
    //           <label htmlFor="email" className="form-label">Email</label>
    //           <input
    //             type="email"
    //             id="email"
    //             className="form-control"
    //             placeholder="Enter your email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //             required
    //           />
    //         </div>

    //         <button type="submit" className="btn btn-primary w-100">
    //           Login
    //         </button>
    //       </form>

    //       <div className="text-center mt-3">
    //         <Link to="/adminLogin" className="text-decoration-none text-primary">
    //           Admin Login
    //         </Link>
    //         <Link to="/register" className="text-decoration-none text-primary">
    //           /  Need to Register?
    //         </Link>
    //       </div>
    //     </div>
    //     {/* Content Section */}
    //     <div className="col-md-6 d-flex flex-column justify-content-center p-4 bg-primary text-white">
    //       <h2 className="fw-bold">Quality Products, Thoroughly Researched</h2>
    //       <p className="mt-3">
    //         We save you time by testing and researching products so you can shop with confidence. Every item on our site has been carefully selected for its quality and value.
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
      }}
    >
      <div className="row shadow-lg bg-white rounded-4 overflow-hidden w-100" style={{ maxWidth: "900px" }}>
        {/* Left: Info & Marquee */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center p-5 bg-primary text-white">
          <h2 className="fw-bold mb-3 text-center">QualityPics</h2>
          <h5 className="mb-3 text-center">Quality Products, Thoroughly Researched</h5>
          <p className="mb-3 text-center" style={{ fontSize: "1.1rem" }}>
            We save you time by testing and researching products so you can shop with confidence. Every item on our site has been carefully selected for its quality and value.
          </p>
          <div className="mt-auto text-center small" style={{ opacity: 0.8 }}>
            &copy; {new Date().getFullYear()} QualityPics. All rights reserved.
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
          <div className="mb-4 text-center">
            <img
              src="https://img.icons8.com/color/96/login-rounded-right--v1.png"
              alt="Login Icon"
              className="mb-2"
              style={{ width: 64, height: 64 }}
            />

            <h2 className="mb-2">Login</h2>
            <p className="text-muted">Welcome back! Please login to your account.</p>
          </div>
          <form onSubmit={login}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-control form-control-lg"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100 mt-2 shadow-sm">
              {load ? <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Login...
              </>
                :
                <>Login</>
              }
            </button>
          </form>

          <div className="text-center mt-4">
            <Link to="/adminLogin" className="text-decoration-none text-primary opacity-50 me-2">
              Admin Login
            </Link>
            <span className="text-muted">|</span>
            <Link to="/register" className="text-decoration-none text-primary ms-2">
              Need to Register?
            </Link>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Login;
