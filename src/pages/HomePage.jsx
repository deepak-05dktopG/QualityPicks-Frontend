
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
      setUserInfo(res.data); // Store user data

    } catch (err) {
      console.error("Error fetching user:", err);
      setUserInfo(null); // Reset user data on error
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
    <div >
      <Navbar />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container text-center py-4">
          {userInfo && (
            <div
              data-aos="flip-right"
              className="mx-auto mb-5 p-4 bg-dark text-white rounded-4 shadow-lg"
              style={{
                maxWidth: '700px',
                background: 'linear-gradient(135deg, #0d6efd 0%, #020d1f 100%)',
                boxShadow: '0 0 20px rgba(0,0,0,0.3)',
              }}
            >
              <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                <div
                  className="bg-white text-dark d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: '60px',
                    height: '60px',
                    fontSize: '1.5rem',
                    boxShadow: '0 0 10px rgba(255,255,255,0.3)',
                  }}
                >
                  🛍️
                </div>
                <div className="text-center text-md-start">
                  <h4 className="fw-bold mb-1">
                    Welcome Back, <span className="text-warning">{userInfo.name.toUpperCase()}</span>
                  </h4>
                  <p className="mb-0 text-light small">
                    Your smart shopping assistant is ready. Let’s explore top picks just for you. ✨
                  </p>
                </div>
              </div>
            </div>
          )}

          <h1 className="display-4 fw-bold mb-4" data-aos="fade-up">Quality Products, Thoroughly Researched</h1>
          <p className="lead mb-4" data-aos="fade-up" data-aos-delay="300">
            We save you time by testing and researching products so you can shop with confidence.
            Every item on our site has been carefully selected for its quality and value.
          </p>

          <Link to="/products/all" data-aos="zoom-in" data-aos-delay="700" className="btn btn-lg btn-accent border border-warning">
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
          <h2
            className="text-center mb-5 fw-bold display-6 text-primary"
            data-aos="fade-up"
            style={{ letterSpacing: '1px' }}
          >
            🛍️ How <span className="text-warning">QualityPicks</span> Works
          </h2>
          <div className="row g-4" style={{ overflowX: 'hidden', scrollbarWidth: 'none' }}>
            {[
              {
                icon: "fas fa-search",
                title: "Research",
                desc: "We spend hours researching products, reading reviews, and testing items to find the best ones.",
                aos: "fade-right",
                delay: 0,
                bg: "bg-primary-subtle text-primary"
              },
              {
                icon: "fas fa-star",
                title: "Curate",
                desc: "Only products that meet our quality standards make it to our site, saving you from endless scrolling.",
                aos: "fade-up",
                delay: 200,
                bg: "bg-warning-subtle text-warning"
              },
              {
                icon: "fas fa-bag-shopping",
                title: "Shop Confidently",
                desc: "When you purchase through our links, you get the best products and we earn a small Affiliate commission.",
                aos: "fade-left",
                delay: 0,
                bg: "bg-success-subtle text-success"
              }
            ].map((feature, idx) => (
              <div className="col-md-4" data-aos={feature.aos} data-aos-delay={feature.delay} key={idx}>
                <div className={`card h-100 border-0 shadow rounded-4 ${feature.bg} position-relative`}>
                  <div className="card-body text-center px-4 py-5">
                    <div className="feature-icon mb-4">
                      <i className={`${feature.icon} fs-2`}></i>
                    </div>
                    <h3 className="h5 fw-bold mb-3">{feature.title}</h3>
                    <p className="text-muted">{feature.desc}</p>
                  </div>
                  <div
                    className="position-absolute top-0 start-50 translate-middle-x"
                    style={{
                      width: "70px",
                      height: "6px",
                      backgroundColor: "#0d6efd",
                      borderRadius: "0 0 10px 10px",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Categories Section */}
      <section className="py-5">
        <div className="container">
          <h2
            className="text-center fw-bold mb-5 text-primary display-6"
            data-aos="fade-up"
            style={{ letterSpacing: "0.5px" }}
          >
            🛍️ Explore by Category
          </h2>

          <div className="row g-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="col-md-6 col-lg-4"
                data-aos="zoom-in-up"
                data-aos-delay={`${index * 100}`}
              >
                <Link
                  to={`/products/${category.name}`}
                  className="text-decoration-none"
                >
                  <div
                    className="card h-100 shadow border-0 overflow-hidden category-hover"
                    style={{ borderRadius: "16px", transition: "transform 0.3s ease" }}
                  >
                    <div className="position-relative">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="card-img-top"
                        style={{
                          height: "220px",
                          objectFit: "cover",
                          filter: "brightness(90%)",
                        }}
                      />
                      <div
                        className="position-absolute top-0 end-0 bg-dark bg-opacity-50 text-white px-3 py-1 rounded-start"
                        style={{ fontSize: "0.85rem", fontWeight: "500" }}
                      >
                        {category.name}
                      </div>
                    </div>

                    <div className="card-body text-center">
                      <h5 className="card-title fw-bold text-dark">
                        {category.name}
                      </h5>
                      <p className="card-text text-muted small">
                        {category.description}
                      </p>
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
      <section className="py-5 text-white">
        <div className="container text-center py-5 bg-light rounded-4 shadow" data-aos="fade-up">
          <h2 className="fw-bold mb-3 text-primary" data-aos="fade-down">
            🧐 Looking for a Specific Product?
          </h2>

          <p className="lead text-muted mb-4" data-aos="fade-down" data-aos-delay="200">
            Can't find what you're searching for? Let us help — we’ll research and review it just for you!
          </p>

          <Link
            to="/request-product"
            className="btn btn-lg btn-warning px-4 py-2 fw-semibold shadow-sm"
            data-aos="zoom-in"
            data-aos-delay="400"
            style={{ borderRadius: "12px", letterSpacing: "0.5px" }}
          >
            🔍 Request a Product Review
          </Link>
        </div>

      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
