import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  //Register
  const register = async (e) => {
    setLoad(true);
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/register`, {
        name,
        email
      });

      Swal.fire({
        icon: 'success',
        title: `🎉 Welcome, ${name}!`,
        text: 'Your registration was successful. Please login to continue.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
      });

      navigate('/login');

    } catch (error) {
      // Axios errors can be in response.data.message
      const errorMsg = error.response?.data?.message || 'Registration failed!';
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMsg,
        timer: 3500,
        timerProgressBar: true
      });
      setLoad(false);
    }
  };

//**************************Frontend User***********************************************************************************************/
  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #d9e4f5 100%)" }}
    >
      <div
        className="row shadow-lg bg-white rounded-4 overflow-hidden w-100"
        style={{ maxWidth: "900px" }}
      >
        {/* Left Info Panel */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center p-5 bg-primary text-white">
          <h2 className="fw-bold text-center">QualityPics</h2>
          <h5 className="text-center mt-2">Your Gateway to Quality</h5>
          <p className="text-center mt-3" style={{ fontSize: "1.1rem" }}>
            We save you time by testing and researching products so you can shop with confidence. Every item on our site has been carefully selected for its quality and value.
          </p>
          <div className="mt-auto text-center small" style={{ opacity: 0.8 }}>
            &copy; {new Date().getFullYear()} QualityPics. All rights reserved.
          </div>
        </div>

        {/* Register Form */}
        <div className="col-md-6 p-4 d-flex flex-column justify-content-center">
          <div className="mb-4 text-center">
            <img
              src="https://img.icons8.com/color/96/add-user-male--v1.png"
              alt="Welcome New User Icon"
              className="mb-2"
              style={{ width: 64, height: 64 }}
            />

            <h2 className="mb-2">Register</h2>
            <p className="text-muted">Create your free account to get started.</p>
          </div>
          <form onSubmit={register}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control form-control-lg"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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

            <button type="submit" className="btn btn-primary btn-lg w-100 shadow-sm">
              {load ? <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Register...
              </>
                :
                <>Register</>
              }
            </button>
          </form>

          <div className="text-center mt-4">
            <Link to="/login" className="text-decoration-none text-primary">
              Already Registered? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
