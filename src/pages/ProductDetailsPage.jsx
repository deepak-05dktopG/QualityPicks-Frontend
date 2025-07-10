
import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../data/products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('description');


  // READ Product data by ID and Scroll to top when component mounts
  useEffect(() => {
    setLoading(true);

    window.scrollTo(0, 0);
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products/item/${id}`) // Call your backend API here
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching product:", err));

    console.log("Product ID:", id);
    console.log("Product Data:", product);
  }, [id]);

  //BUY NOW Button Function
  const handleBuyNow = () => {
    // In a real implementation, you'd track this click
    console.log("Buy now clicked, redirecting to affiliate link");
    // For demo purposes, we'll just open the affiliate link in a new tab
    if (product && product.affiliateLink) {
      window.open(product.affiliateLink, '_blank');
    }
  };
  //Loading Frontend UI
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container py-5">
          <div className="row g-4 align-items-center">
            {/* Left Column - Image Placeholder */}
            <div className="col-md-6 mb-4">
              <div className="placeholder-glow w-100">
                <div
                  className="placeholder w-100 bg-gradient"
                  style={{
                    height: '360px',
                    borderRadius: '12px',
                    backgroundColor: '#dee2e6',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
                  }}
                ></div>
              </div>
            </div>

            {/* Right Column - Details Placeholder */}
            <div className="col-md-6">
              <div className="placeholder-glow mb-3">
                <h4 className="fw-bold">
                  <span
                    className="placeholder col-10 rounded"
                    style={{ height: '24px' }}
                  ></span>
                </h4>
              </div>

              <div className="placeholder-glow mb-3">
                <p>
                  <span className="placeholder col-6 me-2 rounded-pill"></span>
                  <span className="placeholder col-4 me-2 rounded-pill"></span>
                  <span className="placeholder col-5 rounded-pill"></span>
                </p>
              </div>

              <div className="placeholder-glow mb-3">
                <div className="d-flex gap-2">
                  <span className="placeholder col-2 rounded-pill"></span>
                  <span className="placeholder col-2 rounded-pill"></span>
                  <span className="placeholder col-2 rounded-pill"></span>
                </div>
              </div>

              <div className="placeholder-glow mb-4">
                <span className="placeholder col-7 rounded-pill"></span>
              </div>

              <div className="d-grid">
                <button
                  className="btn btn-outline-primary disabled placeholder col-6 mx-auto"
                  aria-disabled="true"
                ></button>
              </div>
            </div>
          </div>
        </div>

      </>

    );
  }
  //Product Not Found Frontend UI
  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products/all" className="btn btn-primary mt-3">
          Browse All Products
        </Link>
      </div>
    );
  }

  //*****************************Frontend UI****************************************************************************88*/
  return (
    <>
      <Navbar />
      <div className="container py-5">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item">
              <Link to={`/products/${product.category}`}>
                {product.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className="row">
          {/* Product Image */}
          <div className="col-md-5 mb-4">
            <div className="card border border-0 shadow-sm">
              <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" style={{ background: 'linear-gradient(to right, #f8f9fa, #e0e0e0)', borderRadius: '12px', padding: '1rem' }}>
                <div className="carousel-inner rounded-4">
                  {product.productimages.map((item, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 ? 'active' : ''}`}
                      data-bs-interval="3000"
                    >
                      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px', background: 'linear-gradient(to bottom right, #ffffff, #f1f1f1)', borderRadius: '12px' }}>
                        <img
                          src={item}
                          data-aos="zoom-in"
                          data-aos-delay="100"
                          className="img-fluid shadow-sm"
                          alt=""
                          style={{
                            objectFit: 'contain',
                            maxHeight: '350px',
                            padding: '10px',
                            borderRadius: '8px',
                            backgroundColor: '#ffffff',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Controls */}
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleAutoplaying"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                    style={{
                      backgroundColor: '#000',
                      borderRadius: '50%',
                      padding: '10px',
                      filter: 'invert(1)',
                    }}
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>

                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleAutoplaying"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                    style={{
                      backgroundColor: '#000',
                      borderRadius: '50%',
                      padding: '10px',
                      filter: 'invert(1)',
                    }}
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>

            </div>
          </div>

          {/* Product Info */}
          <div className="col-md-7 mb-4" style={{ overflowX: 'hidden', scrollbarWidth: 'none' }}>
            <h1 data-aos="fade-right" className="h2 mb-3">{product.name}</h1>

            <div data-aos="fade-right" data-aos-delay="50" className="d-flex align-items-center mb-3">
              <div className="text-warning me-2">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fas fa-star${i < Math.floor(product.rating) ? '' : (i < product.rating ? '-half-alt' : '-o')}`}
                  ></i>
                ))}
              </div>
              <span className="text-muted">{product.rating} ({product.reviewCount} reviews) <img src={product.affiliatefrom} width={70} alt="Product From" /></span>
            </div>

            <p data-aos="fade-right" data-aos-delay="100" className="lead mb-4">{product.description}</p>

            <div data-aos="fade-right" data-aos-delay="300" className="mb-4">
              <h2
                className="h4 mb-3 fw-semibold text-success d-flex align-items-center gap-2"
                data-aos="fade-right"
              >
                💡 Why We Recommend It
              </h2>
              <p>{product.details}</p>
            </div>

            <div data-aos="fade-right" data-aos-delay="150" className="mb-4">
              <h3
                className="h5 mb-3 fw-semibold text-primary d-flex align-items-center gap-2"
                data-aos="fade-left"
              >
                🔧 Key Features
              </h3>
              <ul className="list-group list-group-flush">
                {product.features.map((feature, index) => (
                  <li data-aos="fade-right" data-aos-delay={index * 100} key={index} className="list-group-item bg-transparent ps-0">
                    <i className="fas fa-check text-success me-2"></i> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div data-aos="fade-left" className="d-flex align-items-center mb-4">
              <h3 className="h2 mb-0 me-3"> ₹{product.price.toFixed(2)}</h3>
              <span className={`badge ${product.stock > 10 ? 'bg-success' : (product.stock > 0 ? 'bg-warning' : 'bg-danger')}`}>
                {product.stock > 10 ? `In Stock ${product.stock}` : (product.stock > 0 ? 'Low Stock' : 'Out of Stock')}
              </span>
            </div>

            <div className="d-flex flex-wrap gap-2">
              {/* <button
                className="btn btn-lg btn-primary"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <i className="fas fa-cart-plus me-2"></i> Add to Cart
              </button> */}
              <button
                data-aos="zoom-in"
                className="btn btn-lg btn-secondary"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
              >
                <i className="fas fa-shopping-bag me-2"></i> Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div data-aos="fade-up" data-aos-delay="200" className="card border-0 shadow-sm mt-4">
          <div className="card-header bg-white">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
                  onClick={() => setActiveTab('description')}
                >
                  Description
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'research' ? 'active' : ''}`}
                  onClick={() => setActiveTab('research')}
                >
                  Our Research
                </button>
              </li>
            </ul>
          </div>
          <div className="card-body p-4">
            {activeTab === 'description' && (
              <div>
                <h3
                  className="h4 mb-4 text-dark fw-bold d-flex align-items-center gap-2"
                  data-aos="fade-up"
                >
                  📦 About {product.name}
                </h3>
                <p>{product.description}</p>
                <p>{product.details}</p>

                <h4
                  className="h5 mt-4 mb-3 text-success fw-semibold d-flex align-items-center gap-2"
                  data-aos="fade-right"
                >
                  🚀 Features
                </h4>
                <ul>
                  {product.features.map((feature, index) => (
                    <li data-aos="fade-right" data-aos-delay={index * 100} key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'research' && (
              <div>
                <h3
                  className="h4 mb-4 text-primary fw-semibold d-flex align-items-center gap-2"
                  data-aos="fade-up"
                >
                  🔍 Our Research Process
                </h3>
                <p>
                  At QualityPicks, we don't recommend products lightly. Here's why we believe the {product.name} is worth your money:
                </p>

                <div className="card bg-light border-0 mb-4">
                  <div className="card-body">
                    <h4
                      className="h5 mb-3 text-primary fw-semibold d-flex align-items-center gap-2"
                      data-aos="fade-up"
                    >
                      🔍 Research Findings
                    </h4>
                    <ul className="list-group list-group-flush">
                      {product.research.map((finding, index) => (
                        <li data-aos="fade-right" data-aos-delay={index * 100} key={index} className="list-group-item bg-transparent">
                          <i className="fas fa-clipboard-check text-primary me-2"></i> {finding}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p>
                  Based on these findings, we confidently recommend this product as one of the best in its category.
                  If you have any questions about our research process, please <Link to="/contact">contact us</Link>.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        <section className="mt-5">
          <h3
            className="h4 mb-4 text-success fw-semibold d-flex align-items-center gap-2"
            data-aos="zoom-in"
          >
            💡 You Might Also Like
          </h3>
          <div className="row g-4">
            {/* We would dynamically load similar products here */}
            <div data-aos="zoom-in" className="col-12 text-center">
              <Link to={`/products/${product.category}`} className="btn btn-outline-primary">
                View More {product.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Products
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailsPage;

