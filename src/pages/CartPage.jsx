import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  //READ and DELETE Operation for Cart Products
  const fetchCart = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/cart/${userId}`, {
        method: 'GET',
        // credentials: 'include', // important for cookies
      });

      const data = await res.json();
      setCartItems(data || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleRemove = async (productId) => {
    const userId = localStorage.getItem("userId");
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/cart/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // credentials: 'include',
        body: JSON.stringify({ userId, productId }),
      });
      Swal.fire({
        icon: 'success',
        title: 'Removed from Cart 🛒',
        text: 'The product has been successfully removed!',
        showConfirmButton: false,
        timer: 4000,
        toast: true,
        position: 'top-end',
        timerProgressBar: true,
      });
      setCartItems((prev) => prev.filter((item) => item._id !== productId));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Something went wrong while removing the item.',
      });
      console.error('Remove failed:', error);
    }
  };

  //Mount Cart Products
  useEffect(() => {
    fetchCart();
  }, []);

  //***************************Frontend UI*********************************************************************************8
  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 data-aos="fade-right" className="mb-4">🛒 Your Cart</h2>

        {loading ? (
          <div className="d-flex flex-wrap gap-3 justify-content-around">
            <div className="card placeholder-glow col-12 col-sm-6 col-md-4 col-lg-3 border-info shadow-sm" aria-hidden="true">
              <div className="placeholder card-img-top bg-primary bg-opacity-25" style={{ minHeight: "180px", borderRadius: "8px" }}></div>
              <div className="card-body">
                <h6 className="card-title placeholder-glow">
                  <span className="placeholder col-8 bg-info bg-opacity-50"></span>
                </h6>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-6 bg-success bg-opacity-50"></span>
                  <span className="placeholder col-4 bg-warning bg-opacity-50"></span>
                  <span className="placeholder col-7 bg-danger bg-opacity-50"></span>
                </p>
                <a className="btn btn-primary disabled placeholder col-12 bg-opacity-75" aria-disabled="true"></a>
              </div>
            </div>

            <div className="card placeholder-glow col-12 col-sm-6 col-md-4 col-lg-3 border-info shadow-sm" aria-hidden="true">
              <div className="placeholder card-img-top bg-primary bg-opacity-25" style={{ minHeight: "180px", borderRadius: "8px" }}></div>
              <div className="card-body">
                <h6 className="card-title placeholder-glow">
                  <span className="placeholder col-8 bg-info bg-opacity-50"></span>
                </h6>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-6 bg-success bg-opacity-50"></span>
                  <span className="placeholder col-4 bg-warning bg-opacity-50"></span>
                  <span className="placeholder col-7 bg-danger bg-opacity-50"></span>
                </p>
                <a className="btn btn-primary disabled placeholder col-12 bg-opacity-75" aria-disabled="true"></a>
              </div>
            </div>

            <div className="card placeholder-glow col-12 col-sm-6 col-md-4 col-lg-3 border-info shadow-sm" aria-hidden="true">
              <div className="placeholder card-img-top bg-primary bg-opacity-25" style={{ minHeight: "180px", borderRadius: "8px" }}></div>
              <div className="card-body">
                <h6 className="card-title placeholder-glow">
                  <span className="placeholder col-8 bg-info bg-opacity-50"></span>
                </h6>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-6 bg-success bg-opacity-50"></span>
                  <span className="placeholder col-4 bg-warning bg-opacity-50"></span>
                  <span className="placeholder col-7 bg-danger bg-opacity-50"></span>
                </p>
                <a className="btn btn-primary disabled placeholder col-12 bg-opacity-75" aria-disabled="true"></a>
              </div>
            </div>

            <div className="card placeholder-glow col-12 col-sm-6 col-md-4 col-lg-3 border-info shadow-sm" aria-hidden="true">
              <div className="placeholder card-img-top bg-primary bg-opacity-25" style={{ minHeight: "180px", borderRadius: "8px" }}></div>
              <div className="card-body">
                <h6 className="card-title placeholder-glow">
                  <span className="placeholder col-8 bg-info bg-opacity-50"></span>
                </h6>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-6 bg-success bg-opacity-50"></span>
                  <span className="placeholder col-4 bg-warning bg-opacity-50"></span>
                  <span className="placeholder col-7 bg-danger bg-opacity-50"></span>
                </p>
                <a className="btn btn-primary disabled placeholder col-12 bg-opacity-75" aria-disabled="true"></a>
              </div>
            </div>

            <div className="card placeholder-glow col-12 col-sm-6 col-md-4 col-lg-3 border-info shadow-sm" aria-hidden="true">
              <div className="placeholder card-img-top bg-primary bg-opacity-25" style={{ minHeight: "180px", borderRadius: "8px" }}></div>
              <div className="card-body">
                <h6 className="card-title placeholder-glow">
                  <span className="placeholder col-8 bg-info bg-opacity-50"></span>
                </h6>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-6 bg-success bg-opacity-50"></span>
                  <span className="placeholder col-4 bg-warning bg-opacity-50"></span>
                  <span className="placeholder col-7 bg-danger bg-opacity-50"></span>
                </p>
                <a className="btn btn-primary disabled placeholder col-12 bg-opacity-75" aria-disabled="true"></a>
              </div>
            </div>

            <div className="card placeholder-glow col-12 col-sm-6 col-md-4 col-lg-3 border-info shadow-sm" aria-hidden="true">
              <div className="placeholder card-img-top bg-primary bg-opacity-25" style={{ minHeight: "180px", borderRadius: "8px" }}></div>
              <div className="card-body">
                <h6 className="card-title placeholder-glow">
                  <span className="placeholder col-8 bg-info bg-opacity-50"></span>
                </h6>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-6 bg-success bg-opacity-50"></span>
                  <span className="placeholder col-4 bg-warning bg-opacity-50"></span>
                  <span className="placeholder col-7 bg-danger bg-opacity-50"></span>
                </p>
                <a className="btn btn-primary disabled placeholder col-12 bg-opacity-75" aria-disabled="true"></a>
              </div>
            </div>
          </div>

        ) : cartItems.length === 0 ? (
          <div className='d-flex flex-column justify-content-center' data-aos="zoom-in" style={{ height: "50vh" }}>
            <div className="alert alert-info text-center" >
              Your cart is empty. Start adding some products by Clicking 🤍!
            </div>
            <Link data-aos="zoom-in" data-aos-delay="300" to="/products/all" className="btn btn-lg btn-accent ">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {cartItems.map((item, index) => (
              <div className="col-md-6 col-lg-4" key={item._id}>
                <div
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="card h-100 border-0 rounded-4 shadow-sm position-relative overflow-hidden"
                
                >
                  <Link to={`/product/${item._id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="card-img-top"
                      style={{
                        height: '220px',
                        objectFit: 'cover',
                        borderTopLeftRadius: '0.75rem',
                        borderTopRightRadius: '0.75rem',
                        filter: 'brightness(0.95)',
                      }}
                    />
                  </Link>

                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h6
                        className="card-title fw-semibold text-truncate"
                        style={{ maxWidth: '100%' }}
                        title={item.name}
                      >
                        🛍️ {item.name}
                      </h6>
                      <p className="text-dark mb-2 fw-bold">₹{item.price.toFixed(2)}</p>
                    </div>

                    <div className="d-flex flex-column gap-2 mt-3">
                      <button
                        className="btn btn-outline-danger w-100"
                        onClick={() => handleRemove(item._id)}
                      >
                        🗑️ Remove from Cart
                      </button>

                      <Link to={`/product/${item._id}`}>
                        <button className="btn btn-primary w-100 shadow-sm">
                          🔍 View Details & Buy
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>


        )}
      </div>

      <Footer />
    </>
  );
};

export default CartPage;
