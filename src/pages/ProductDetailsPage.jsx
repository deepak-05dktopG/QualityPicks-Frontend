
import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../data/products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');


  // READ Product data by ID and Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products/item/${id}`) // Call your backend API here
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));

    console.log("Product ID:", id);
    console.log("Product Data:", product);
    setLoading(false);
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
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
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
            <li className="breadcrumb-item"><Link to="/main">Home</Link></li>
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
            <div className="card border-2 shadow-sm">
              <div id="carouselExampleAutoplaying" className="carousel carousel-dark slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {product.productimages.map((item, index) => (
                    <div key={index} className="carousel-item active" data-bs-interval="2000">
                      <img src={item} className="card-img-top img-fluid" style={{ objectFit: "cover", maxHeight: "400px" }} alt="" />
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon  text-dark rounded-circle" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                  <span className="carousel-control-next-icon  text-dark rounded-circle" aria-hidden="true"> </span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="col-md-7 mb-4">
            <h1 className="h2 mb-3">{product.name}</h1>

            <div className="d-flex align-items-center mb-3">
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

            <p className="lead mb-4">{product.description}</p>

            <div className="mb-4">
              <h2 className="h4 mb-3">Why We Recommend It</h2>
              <p>{product.details}</p>
            </div>

            <div className="mb-4">
              <h3 className="h5 mb-3">Key Features</h3>
              <ul className="list-group list-group-flush">
                {product.features.map((feature, index) => (
                  <li key={index} className="list-group-item bg-transparent ps-0">
                    <i className="fas fa-check text-success me-2"></i> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="d-flex align-items-center mb-4">
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
        <div className="card border-0 shadow-sm mt-4">
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
                <h3 className="h4 mb-4">About {product.name}</h3>
                <p>{product.description}</p>
                <p>{product.details}</p>

                <h4 className="h5 mt-4 mb-3">Features</h4>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'research' && (
              <div>
                <h3 className="h4 mb-4">Our Research Process</h3>
                <p>
                  At QualityPicks, we don't recommend products lightly. Here's why we believe the {product.name} is worth your money:
                </p>

                <div className="card bg-light border-0 mb-4">
                  <div className="card-body">
                    <h4 className="h5 mb-3">Research Findings</h4>
                    <ul className="list-group list-group-flush">
                      {product.research.map((finding, index) => (
                        <li key={index} className="list-group-item bg-transparent">
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
          <h3 className="h4 mb-4">You Might Also Like</h3>
          <div className="row g-4">
            {/* We would dynamically load similar products here */}
            <div className="col-12 text-center">
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

