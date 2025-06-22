
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AffiliateLogoMarquee from '../components/AffiliateLogoMarquee';
import axios from 'axios';


const HomePage = () => {

  const [categories, setCategories] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  //READ User by their ID
  const fetchUser = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/get/${userId}`);
      setUserInfo(res.data); // ✅ Store user data

    } catch (err) {
      console.error("Error fetching user:", err);
      setUserInfo(null); // ✅ Reset user data on error
    }
  };
  //mount for User
  useEffect(() => {
    fetchUser();
  }, []);

  //READ Categories
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/categories/category`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/users/login')
  //     .then((res) => res.json())
  //     .then((data) => setName(data));
  //     console.log(name);
  // }, [name]);


  //corousel items for affiliate partners
  const carouselItems = [
    {
      src: "https://purepng.com/public/uploads/large/29637/logos-amazon-logo.png",
      alt: "Amazon"
    },
    {
      src: "https://www.citypng.com/public/uploads/preview/hd-flipkart-round-logo-icon-transparent-png-27954.png",
      alt: "Flipkart"
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Myntra_Logo.png",
      alt: "Myntra"
    },
    {
      src: "https://seeklogo.com/images/A/ajio-logo-3489464374-seeklogo.com.png",
      alt: "Ajio"
    },
    {
      src: "https://seeklogo.com/images/M/mamaearth-logo-487672A1B6-seeklogo.com.png",
      alt: "Mamaearth"
    },
    {
      src: "https://seeklogo.com/images/T/tata-cliq-logo-405612A2B0-seeklogo.com.png",
      alt: "Tata CLiQ"
    },
    {
      src: "https://www.nicepng.com/png/detail/2170-2170_pepperfry-furniture-logo.png",
      alt: "Pepperfry"
    },
    {
      src: "https://seeklogo.com/images/M/makemytrip-logo-3361110F3E-seeklogo.com.png",
      alt: "MakeMyTrip"
    },
    {
      src: "https://seeklogo.com/images/F/firstcry-logo-3866785A0F-seeklogo.com.png",
      alt: "FirstCry"
    },
    {
      src: "https://seeklogo.com/images/I/indiamart-logo-349456C9E8-seeklogo.com.png",
      alt: "IndiaMART"
    },
    {
      src: "https://inrdeals.com/assets/img/logo.png",
      alt: "INRdeals"
    },
    {
      src: "https://earnkaro.com/static/media/logo.9e8c5d66.svg",
      alt: "EarnKaro"
    },
    {
      src: "https://www.vcommission.com/wp-content/uploads/2020/04/vcommission-logo.png",
      alt: "vCommission"
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
      alt: "eBay"
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Shopify_logo_2018.svg",
      alt: "Shopify"
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Rakuten_Global_Brand_Logo.png",
      alt: "Rakuten"
    },
    {
      src: "https://www.clickbank.com/wp-content/themes/clickbank/assets/images/clickbank-logo.svg",
      alt: "ClickBank"
    }
  ];


  //*************Frontend UI******************************************************************************************/
  return (
    <div>
        <Navbar />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container text-center py-5">
          {userInfo && (
            <div
              className="mx-auto mb-4 p-4 shadow rounded-4 "
              style={{
                maxWidth: '600px',
                borderLeft: '6px solid #0d6efd',
              }}
            >
              <h4 className="fw-semibold mb-2 text-light">
                👋 Hello, <span className="text-warning">{userInfo.name.toUpperCase()} </span>!
              </h4>
              <p className="text-secondary mb-0" style={{ fontSize: '1rem' }}>
                Ready to discover smart shopping choices? We've handpicked the best for you. 🛍️
              </p>
            </div>
          )}
          <h1 className="display-4 fw-bold mb-4">Quality Products, Thoroughly Researched</h1>
          <p className="lead mb-4">
            We save you time by testing and researching products so you can shop with confidence.
            Every item on our site has been carefully selected for its quality and value.
          </p>
          <Link to="/products/all" className="btn btn-lg btn-accent border border-warning">
            Explore Products
          </Link>
        </div>

      </section>
      <div className='mt-5'>
        <AffiliateLogoMarquee />
      </div>

      {/* How It Works */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">How QualityPicks Works</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-search"></i>
                  </div>
                  <h3 className="h5 card-title">Research</h3>
                  <p className="card-text">
                    We spend hours researching products, reading reviews, and testing items to find the best ones.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h3 className="h5 card-title">Curate</h3>
                  <p className="card-text">
                    Only products that meet our quality standards make it to our site, saving you from endless scrolling.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-tag"></i>
                  </div>
                  <h3 className="h5 card-title">Shop Confidently</h3>
                  <p className="card-text">
                    When you purchase through our links, you get the best products and we earn a small Affiliate commission.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Shop By Category</h2>
          <div className="row g-4">
            {categories.map((category, index) => (
              <div key={index} className="col-md-4 col-lg-4 mb-4">
                <Link to={`/products/${category.name}`} className="text-decoration-none">
                  <div className="card category-card h-100 shadow-sm border-0 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="card-img-top category-image"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h3 className="h5 card-title">{category.name}</h3>
                      <p className="card-text text-muted">{category.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">What Our Customers Say</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="mb-3 text-warning">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="card-text">
                    "I purchased the wireless headphones based on QualityPicks' recommendation and they're amazing. 
                    I love knowing that everything has been thoroughly researched."
                  </p>
                  <div className="d-flex align-items-center mt-3">
                    <div className="flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format" 
                        className="rounded-circle" 
                        alt="Customer" 
                        width="50" 
                        height="50"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">Sarah J.</h6>
                      <small className="text-muted">Music Producer</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="mb-3 text-warning">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="card-text">
                    "QualityPicks has saved me so much time. Instead of reading countless reviews, I 
                    just check what they recommend. The stand mixer I bought is perfect!"
                  </p>
                  <div className="d-flex align-items-center mt-3">
                    <div className="flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format" 
                        className="rounded-circle" 
                        alt="Customer" 
                        width="50" 
                        height="50"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">Michael T.</h6>
                      <small className="text-muted">Home Chef</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="mb-3 text-warning">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="card-text">
                    "I trust QualityPicks because they explain why they recommend each product. The hiking boots 
                    I purchased have been amazing for all my adventures."
                  </p>
                  <div className="d-flex align-items-center mt-3">
                    <div className="flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format" 
                        className="rounded-circle" 
                        alt="Customer" 
                        width="50" 
                        height="50"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0">Emily R.</h6>
                      <small className="text-muted">Outdoor Enthusiast</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-5 bg-secondary text-white">
        <div className="container text-center">
          <h2 className="mb-4">Looking for a specific product?</h2>
          <p className="lead mb-4">
            Can't find what you're looking for? We're happy to research it for you!
          </p>
          <Link to="/request-product" className="btn btn-lg btn-accent">
            Request a Product Review
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
