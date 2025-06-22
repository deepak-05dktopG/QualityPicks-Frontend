
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';


const RequestProductPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    productName: '',
    productType: '',
    description: '',
    urgency: 'normal',
    preferredBrands: '',
    priceRange: '',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isListening, setIsListening] = useState(false);
  const [isListening1, setIsListening1] = useState(false);

  //Onchange for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear the error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  //for Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //For For Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        productName: '',
        productType: '',
        description: '',
        urgency: 'normal',
        preferredBrands: '',
        priceRange: '',
        additionalInfo: ''
      });
    }, 1500);

    const { name, email, productName, productType, description, urgency, preferredBrands, priceRange, additionalInfo } = formData;
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/requestproduct/request`, {
        name,
        email,
        productName,
        productType,
        description,
        urgency,
        preferredBrands,
        priceRange,
        additionalInfo
      });

      if (response.status === 201 || response.status === 200) {
        // alert('✅ Request submitted successfully!');
        // Optionally reset form or navigate
        setFormData({
          name: '',
          email: '',
          productName: '',
          productType: '',
          description: '',
          urgency: 'normal',
          preferredBrands: '',
          priceRange: '',
          additionalInfo: ''
        });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('An error occurred while submitting the request.');
      }
    }



  };

  //Speech to text for inputbox
  const handleVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition(); // for Chrome
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      setFormData({ additionalInfo: transcript });
      setTimeout(() => {
        recognition.stop();
        setIsListening(false);
      }, 5000);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setTimeout(() => {
        recognition.stop();
        setIsListening(false);
      }, 5000);
    };

    recognition.onend = () => {
      recognition.stop();
      setIsListening(false);
    };
    recognition.end();


  }
  //Speech to text for another inputbox
  const handleVoiceSearch1 = () => {
    const recognition = new window.webkitSpeechRecognition(); // for Chrome
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.start();
    setIsListening1(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      setFormData({ description: transcript });
      setTimeout(() => {
        recognition.stop();
        setIsListening1(false);
      }, 5000);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setTimeout(() => {
        recognition.stop();
        setIsListening1(false);
      }, 5000);
    };

    recognition.onend = () => {
      recognition.stop();
      setIsListening1(false);
    };
    recognition.end();


  }

  //********Frontend UI for after Form Submission***************/
  if (isSubmitted) {
    return (
      <div className="container py-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center p-5">
            <div className="mb-4">
              <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }}></i>
            </div>
            <h1 className="h3 mb-3">Thank You For Your Request!</h1>
            <p className="lead mb-4">
              We've received your product research request and our team will start working on it soon.
            </p>
            <p className="mb-4">
              We'll email you at {formData.email} once we've completed our research and added the product to our site.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link to="/" className="btn btn-outline-primary">
                Return to Home
              </Link>
              <Link to="/products/all" className="btn btn-primary">
                Browse Products
              </Link>
              <span onClick={() => { setIsSubmitted(false); setIsSubmitting(false) }} >
                <Link to="/request-product" className="btn btn-outline-warning">
                  Request One More Products
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //*****************************Frontend UI******************************************************************************************/
  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <h1 className="h3 mb-4 text-center">Request a Product Research</h1>
                <p className="text-muted text-center mb-4">
                  Can't find what you're looking for? Fill out this form, and we'll research the best options for you.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">Your Name*</label>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        id="name"
                        name="name"
                        placeholder='e.g. Deepakkumar'
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">Email Address*</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        placeholder='e.g. qualitypics@gmail.com'
                        onChange={handleChange}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="productName" className="form-label">Product Name*</label>
                      <input
                        type="text"
                        className={`form-control ${errors.productName ? 'is-invalid' : ''}`}
                        id="productName"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        placeholder="e.g. Wireless Earbuds, Office Chair"
                      />
                      {errors.productName && <div className="invalid-feedback">{errors.productName}</div>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="productType" className="form-label">Product Category</label>
                      <select
                        className="form-select"
                        id="productType"
                        name="productType"
                        value={formData.productType}
                        onChange={handleChange}
                      >
                        <option value="">Select a category</option>
                        <option value="electronics">Electronics</option>
                        <option value="home-kitchen">Home & Kitchen</option>
                        <option value="fashion">Fashion</option>
                        <option value="beauty">Beauty</option>
                        <option value="books">Books</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label htmlFor="description" className="form-label">Product Description*</label>
                      <div className='d-flex'>
                        <textarea
                          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                          id="description"
                          name="description"
                          rows="4"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="e.g. I want noise-canceling earbuds with at least 8 hours battery life, waterproof, under ₹3000."
                        ></textarea>
                        {/* <span className=' d-flex align-items-start '> <span className='border rounded btn btn-sm' > <span onClick={handleVoiceSearch1}>{isListening1 ? <>🔴</> : <>🎙️</>}</span> </span> </span> */}
                      </div>
                      {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="urgency" className="form-label">Research Urgency</label>
                      <select
                        className="form-select"
                        id="urgency"
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleChange}
                      >
                        <option value="low">Not urgent (within 1 weeks)</option>
                        <option value="normal">Normal (within 24 hours)</option>
                        <option value="high">Urgent (within 12 hours)</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="priceRange" className="form-label">Price Range</label>
                      <input
                        type="text"
                        className="form-control"
                        id="priceRange"
                        name="priceRange"
                        value={formData.priceRange}
                        onChange={handleChange}
                        placeholder="e.g. ₹500 – ₹1000"
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="preferredBrands" className="form-label">Preferred Brands (if any)</label>
                      <input
                        type="text"
                        className="form-control"
                        id="preferredBrands"
                        name="preferredBrands"
                        value={formData.preferredBrands}
                        onChange={handleChange}
                        placeholder="e.g. Samsung, boAt, JBL"
                      />
                    </div>

                    <div className="col-12 ">
                      <label htmlFor="additionalInfo" className="form-label">Additional Information</label>
                      <div className='d-flex'>
                        <textarea
                          className="form-control"
                          id="additionalInfo"
                          name="additionalInfo"
                          rows="3"
                          value={formData.additionalInfo}
                          onChange={handleChange}
                          placeholder="e.g. I want it to be available on Amazon, should support cash on delivery, color preference is black."
                        ></textarea>
                        {/* <span className=' d-flex align-items-start '> <span className='border rounded btn btn-sm' > <span onClick={handleVoiceSearch}>{isListening ? <>🔴</> : <>🎙️</>}</span> </span> </span> */}
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-text mb-3">
                        Fields marked with * are required
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Submitting...
                          </>
                        ) : 'Submit Request'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RequestProductPage;
