import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { getProductsByCategory, searchProducts } from '../data/products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import '../App.css'
import Swal from 'sweetalert2';


const ProductsPage = () => {
  const { category } = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useState('');
  const searchQuery = new URLSearchParams(location.search).get('search');
  const [isListening, setIsListening] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase())) ||
    product.affiliateLink.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.price.toString().includes(searchTerm)
  );
  //Speech to Text
  const handleVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition(); // for Chrome
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = true;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
      setIsListening(false);
      recognition.stop();

    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      recognition.stop();

    };

    recognition.onend = () => {
      setIsListening(false);
      recognition.stop();

    };

  }

  // Fetch products from backend API
  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products/items`)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
    console.log("product length: " + filteredProducts.length);
  }, []);

  //push product to the cart
  const [cartItems, setCartItems] = useState([false]);
  const handleAddToCart = async (productId) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first!");
      return;
    }

    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/cart/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId })
    });
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart 🛍️',
      text: 'This product has been added to your cart!',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
    });
  };

  //get all products from cart
  useEffect(() => {
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

    fetchCart();
  }, [cartItems]);

  //remove product from cart
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

  //For getting last path of URL For Identify Category
  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1].toLowerCase();
  const placeholder = `Search products in ${lastSegment} category...🔎`;

  //For Filtering Products
  // useEffect(() => {
  // //   let productsData;

  // //   // If there's a search query, search across all products $
  // //   if (searchQuery) { 
  // //     productsData = searchProducts(searchQuery);
  // //   } else { 
  // //     // Otherwise get products by category
  // //     productsData = getProductsByCategory(category);
  // //   }

  // //   // Find min and max prices for the range filter
  // //   if (productsData.length > 0) {
  // //     const prices = productsData.map(product => product.price);
  // //     const minProductPrice = Math.floor(Math.min(...prices));
  // //     const maxProductPrice = Math.ceil(Math.max(...prices));

  // //     setMinPrice(minProductPrice);
  // //     setMaxPrice(maxProductPrice);
  // //     setPriceRange([minProductPrice, maxProductPrice]);
  // //   }

  // //   setProducts(productsData);
  // //   setFilteredProducts(productsData);
  // //   setLoading(false);
  // // }, [category, searchQuery]);

  // useEffect(() => {
  //   // Apply filters
  //   let result = [...products];

  //   // Filter by price range
  //   result = result.filter(product => 
  //     product.price >= priceRange[0] && product.price <= priceRange[1]
  //   );

  //   // Apply sorting
  //   switch (sortBy) {
  //     case 'price-low-high':
  //       result.sort((a, b) => a.price - b.price);
  //       break;
  //     case 'price-high-low':
  //       result.sort((a, b) => b.price - a.price);
  //       break;
  //     case 'rating':
  //       result.sort((a, b) => b.rating - a.rating);
  //       break;
  //     default: // 'featured'
  //       // Keep original order (which we assume is featured)
  //       break;
  //   }

  //   setFilteredProducts(result);
  // }, [products, sortBy, priceRange]);

  // // Format category name for display
  // const formatCategoryName = (categoryId) => {
  //   if (categoryId === 'all') return 'All Products';
  //   return categoryId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  // };

  // const handlePriceChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === 'min') {
  //     setPriceRange([parseInt(value), priceRange[1]]);
  //   } else {
  //     setPriceRange([priceRange[0], parseInt(value)]);
  //   }
  // };

  //**********************Frontend UI*********************************************************************************/
  return (
    <>
      <Navbar />
      <div className='blur-bg sticky-top py-2 bg-light  '>
        <form className=" container col-12 col-sm-10 col-md-8 col-lg-6 d-flex mt-1" >
          <input
            className="form-control me-2"
            type="search"
            placeholder={placeholder}
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <span className="btn border-secondary ">
            <i className="fas fa-search"></i>
          </span> */}

          <span
            className="btn border"
            onClick={handleVoiceSearch}
            title="Search by voice"
          >
            {isListening ? <span onClick={() => setIsListening(false)}>🎤</span> : <>🎙️</>}
          </span>
        </form>
      </div>

      <div className="container py-4">
        <div className="row g-4">

          {lastSegment != "all" &&
            <h6> <span className='h4'> {lastSegment.toUpperCase()} /</span>   <span> <Link to="/products/all">ALL PRODUCTS</Link></span></h6>
          }

          {loading ? (
            <div className="d-flex flex-wrap gap-3 justify-content-center">
              <div className="card placeholder-glow col-12 col-sm-6 col-md-4 col-lg-3" aria-hidden="true">
                <div className="placeholder card-img-top " style={{ minHeight: "180px" }}></div>
                <div className="card-body">
                  <h6 className="card-title placeholder-glow">
                    <span className="placeholder col-8"></span>
                  </h6>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-7"></span>
                  </p>
                  <a className="btn btn-secondary disabled placeholder col-6" aria-disabled="true"></a>
                </div>
              </div>

              <div className="card placeholder-glow col-12 col-sm-6 col-md-4 col-lg-3" aria-hidden="true">
                <div className="card-img-top placeholder" style={{ height: "180px" }}></div>
                <div className="card-body">
                  <h6 className="card-title placeholder-glow">
                    <span className="placeholder col-8"></span>
                  </h6>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-7"></span>
                  </p>
                  <a className="btn btn-secondary disabled placeholder col-6" aria-disabled="true"></a>
                </div>
              </div>

              <div className="card placeholder-glow col-12 col-sm-6 col-md-4 col-lg-3"  aria-hidden="true">
                <div className="card-img-top placeholder" style={{ height: "180px" }}></div>
                <div className="card-body">
                  <h6 className="card-title placeholder-glow">
                    <span className="placeholder col-8"></span>
                  </h6>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-7"></span>
                  </p>
                  <a className="btn btn-secondary disabled placeholder col-6" aria-disabled="true"></a>
                </div>
              </div>

              <div className="card placeholder-glow col-12 col-sm-6 col-md-4 col-lg-3" aria-hidden="true">
                <div className="card-img-top placeholder" style={{ height: "180px" }}></div>
                <div className="card-body">
                  <h6 className="card-title placeholder-glow">
                    <span className="placeholder col-8"></span>
                  </h6>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-7"></span>
                  </p>
                  <a className="btn btn-secondary disabled placeholder col-6" aria-disabled="true"></a>
                </div>
              </div>

              <div className="card placeholder-glow col-12 col-sm-6 col-md-4 col-lg-3" aria-hidden="true">
                <div className="card-img-top placeholder" style={{ height: "180px" }}></div>
                <div className="card-body">
                  <h6 className="card-title placeholder-glow">
                    <span className="placeholder col-8"></span>
                  </h6>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-7"></span>
                  </p>
                  <a className="btn btn-secondary disabled placeholder col-6" aria-disabled="true"></a>
                </div>
              </div>

              <div className="card placeholder-glow col-12 col-sm-6 col-md-4 col-lg-3" aria-hidden="true">
                <div className="card-img-top placeholder" style={{ height: "180px" }}></div>
                <div className="card-body">
                  <h6 className="card-title placeholder-glow">
                    <span className="placeholder col-8"></span>
                  </h6>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-7"></span>
                  </p>
                  <a className="btn btn-secondary disabled placeholder col-6" aria-disabled="true"></a>
                </div>
              </div>
            </div>

          ) : (
            <>
              {
                filteredProducts.length < 1 ? (
                  <div className="col-12 text-center">
                    {/* <i className="fas fa-search fa-3x mb-3 text-muted"></i> */}
                    <h1 className='fs-1'>☹️</h1>
                    <h3>  No products found for <span className='h3 text-danger'>{searchTerm}</span></h3>
                    <p className="text-muted">
                      Search for something else.
                    </p>
                    <Link to="/request-product" className="btn btn-primary mt-3">
                      Create a request to add {searchTerm}
                    </Link>
                  </div>
                ) : ("")
              }
            </>
          )}


          {filteredProducts.slice().reverse().map(product => (



            (lastSegment === product.category || lastSegment === "all") && (
              (
                <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div className="card h-100 shadow-sm">
                    <div className='d-flex w-100 justify-content-between position-absolute' > <span className='p-1 border border-light rounded shadow-sm '> {cartItems.some(item => item._id === product._id) ? <span onClick={() => handleRemove(product._id)}>💖</span> : <span onClick={() => handleAddToCart(product._id)}>🤍</span>} </span>                       <span className=''><img src={product.affiliatefrom} width={30} alt="" /></span></div>
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={product.image}
                        className="card-img-top"
                        alt={product.name}
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                    </Link>

                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title">{product.name}</h6>
                      {/* <span className="badge bg-secondary mb-2">{product.category}</span> */}
                      <div className='d-flex justify-content-between align-items-center'>
                        <div className="text-primary fw-bold ">₹{product.price.toFixed(2)}</div>
                        <div className={` fw-bold ${product.stock > 3 ? 'text-success' : 'text-danger'}`}>
                          {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                        </div>
                      </div>
                      <div className="mb-2">
                        <span className="text-warning">
                          {'★'.repeat(Math.round(product.rating))}
                        </span>
                        <span className="text-muted ms-2">
                          ({product.reviewCount} reviews)
                        </span>
                      </div>

                      <p className="card-text small mb-2">{product.description}</p>
                      {/* {product.features && (
                        <ul className="list-unstyled mb-2">
                          {product.features.map((feature, idx) => (
                            <li key={idx} className="small">
                              <i className="bi bi-check-circle text-success me-1"></i>
                              ✔️{feature}
                            </li>
                          ))}
                        </ul>
                      )} */}

                      <Link
                        to={`/product/${product._id}`}
                        className="btn btn-primary mt-auto"
                      >
                        Explore & Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              )
            )

          ))}

        </div>
      </div >


      <Footer />
    </>
  )
};
export default ProductsPage;
