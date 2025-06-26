
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 mb-4 mb-md-0">
            <h5 data-aos="fade-right" className="text-uppercase fw-bold mb-3 text-primary">
              <i className="fas fa-star text-warning me-2"></i>QualityPicks
            </h5>

            <p data-aos="fade-right" data-aos-delay="100" className="">
              We help you shop smarter by researching and curating only the best-quality products.
              Trusted recommendations, tested for value — so you don’t have to scroll endlessly.
            </p>

            <div data-aos="zoom-in" data-aos-delay="150" className="mt-4 d-flex gap-3">
              <a href="#" className="text-primary fs-5" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-info fs-5" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-danger fs-5" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-warning fs-5" aria-label="Pinterest">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>


          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 data-aos="fade-right" className="text-uppercase fw-bold mb-3 text-primary">
              <i className="fas fa-link me-2 text-secondary"></i>Quick Links
            </h5>
            <ul data-aos="fade-right" data-aos-delay="150" className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/" className="text-white text-decoration-none d-flex align-items-center gap-2">
                  <i className="fas fa-home text-info"></i>Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products/all" className="text-white text-decoration-none d-flex align-items-center gap-2">
                  <i className="fas fa-boxes text-warning"></i>All Products
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/request-product" className="text-white text-decoration-none d-flex align-items-center gap-2">
                  <i className="fas fa-search text-success"></i>Request Product
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-white text-decoration-none d-flex align-items-center gap-2">
                  <i className="fas fa-envelope text-danger"></i>Contact Us
                </Link>
              </li>
              {localStorage.getItem("isLoggedIn") === "true" && (
                <li className="mb-2">
                  <Link to="/cart" className="text-white text-decoration-none d-flex align-items-center gap-2">
                    <i className="fas fa-shopping-cart text-primary"></i>My Cart
                  </Link>
                </li>
              )}
            </ul>
          </div>


          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 data-aos="fade-right" className="text-uppercase fw-bold mb-3 text-primary">
              <i className="fas fa-th-large me-2 text-secondary"></i>Categories
            </h5>
            <ul data-aos="fade-right" data-aos-delay="100" className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/products/electronics" className="text-white text-decoration-none d-flex align-items-center gap-2">
                  <i className="fas fa-tv text-info"></i>Electronics
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products/home-kitchen" className="text-white text-decoration-none d-flex align-items-center gap-2">
                  <i className="fas fa-blender text-warning"></i>Home & Kitchen
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products/fashion" className="text-white text-decoration-none d-flex align-items-center gap-2">
                  <i className="fas fa-tshirt text-pink"></i>Fashion
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products/beauty" className="text-white text-decoration-none d-flex align-items-center gap-2">
                  <i className="fas fa-spa text-danger"></i>Beauty
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products/books" className="text-white text-decoration-none d-flex align-items-center gap-2">
                  <i className="fas fa-book text-success"></i>Books
                </Link>
              </li>
            </ul>
          </div>


        </div>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {new Date().getFullYear()} QualityPicks. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
