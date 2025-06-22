
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">QualityPicks</h5>
            <p>
              We save your time by doing the product research for you.
              Every product on our site has been thoroughly vetted for quality and value.
            </p>
            <div className="social-icons mt-4">
              <a href="#" className="me-3"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="me-3"><i className="fab fa-twitter"></i></a>
              <a href="#" className="me-3"><i className="fab fa-instagram"></i></a>
              <a href="#" className="me-3"><i className="fab fa-pinterest"></i></a>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Quick Links</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/" className="text-white text-decoration-none">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/products/all" className="text-white text-decoration-none">All Products</Link>
              </li>
              <li className="mb-2">
                <Link to="/request-product" className="text-white text-decoration-none">Request Product</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-white text-decoration-none">Contact Us</Link>
              </li>
              {localStorage.getItem("isLoggedIn") === "true" && (
                <Link to="/cart" className="text-decoration-none text-white mb-auto">
                  My Cart
                </Link>
              )}
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Categories</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/products/electronics" className="text-white text-decoration-none">Electronics</Link>
              </li>
              <li className="mb-2">
                <Link to="/products/home-kitchen" className="text-white text-decoration-none">Home & Kitchen</Link>
              </li>
              <li className="mb-2">
                <Link to="/products/fashion" className="text-white text-decoration-none">Fashion</Link>
              </li>
              <li className="mb-2">
                <Link to="/products/beauty" className="text-white text-decoration-none">Beauty</Link>
              </li>
              <li className="mb-2">
                <Link to="/products/books" className="text-white text-decoration-none">Books</Link>
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
