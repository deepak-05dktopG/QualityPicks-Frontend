
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  //************************Frontend UI**********************************************************************************/
  return (
    <>
      <Navbar />
      <div className="container py-5 text-center">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm p-5">
              <h1 className="display-1 fw-bold text-primary">404</h1>
              <h2 className="h3 mb-4">Page Not Found</h2>
              <p className="lead mb-4">
                We couldn't find the page you were looking for. It might have been moved, deleted, or never existed.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Link to="/" className="btn btn-primary">
                  Return to Home
                </Link>
                <Link to="/products/all" className="btn btn-outline-primary">
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
