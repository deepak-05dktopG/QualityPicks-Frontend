
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isListening, setIsListening] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  //Onchange for Input Field
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

  //Validate Input fields
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

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Form Submission from Contact Page
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact/post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        // alert('✅ Message sent successfully!');
        setIsSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert('❌ Failed: ' + (data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        toast: true,
        icon: 'error',
        title: '⚠️ Too many Messages. Please try again later/<br>🚨Server Error',
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
        position: 'top-end',
        customClass: {
          popup: 'swal2-toast-custom'
        }

      });
    } finally {
      setIsSubmitting(false);
    }


  };

  //Speech to Text
  const handleVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition(); // for Chrome
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      setFormData({ message: transcript });
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

  return (
    <>
      <Navbar />
      <div className="container py-5">

        <div className="row">
          <div className="col-lg-5 mb-4 mb-lg-0">
            <div className="mb-5">
              <h1 data-aos="fade-right" className="display-6 fw-bold mb-3 text-primary">
                📬 Get in Touch with Us
              </h1>
              <p
                data-aos="fade-right"
                data-aos-delay="100"
                className=" text-muted"
                style={{ maxWidth: "700px" }}
              >
                Have questions about our recommendations? Interested in partnerships or feedback?
                We're always happy to connect. Drop us a message — let’s make smarter shopping together!
              </p>
            </div>


            <div data-aos="fade-right" data-aos-delay="150" className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h2 className="h5 mb-4 fw-bold text-primary">📌 Contact Information</h2>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex align-items-start gap-3 mb-4">
                    <div className="fs-5 text-primary">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1">Email</h6>
                      <p className="mb-0 text-muted">support@qualitypicks.com</p>
                    </div>
                  </li>
                  <li className="d-flex align-items-start gap-3 mb-4">
                    <div className="fs-5 text-primary">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1">Phone</h6>
                      <p className="mb-0 text-muted">+91 90254 54148</p>
                    </div>
                  </li>
                  <li className="d-flex align-items-start gap-3">
                    <div className="fs-5 text-primary">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1">Address</h6>
                      <p className="mb-0 text-muted">123, Quality Street, Chennai, Tamil Nadu</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>


            <div data-aos="fade-right" data-aos-delay="200" className="card border-0 shadow-sm rounded-4">
              <div className="card-body">
                <h2 className="h5 fw-bold mb-3 text-primary">📲 Follow Us</h2>
                <p className="mb-4 text-muted">Stay updated with our latest product recommendations and research insights.</p>

                <div className="d-flex gap-3 justify-content-start flex-wrap">
                  <a href="#" className="btn btn-light border shadow-sm rounded-circle p-3 d-flex align-items-center justify-content-center social-icon-hover">
                    <i className="fab fa-facebook-f text-primary fs-5"></i>
                  </a>
                  <a href="#" className="btn btn-light border shadow-sm rounded-circle p-3 d-flex align-items-center justify-content-center social-icon-hover">
                    <i className="fab fa-twitter text-info fs-5"></i>
                  </a>
                  <a href="#" className="btn btn-light border shadow-sm rounded-circle p-3 d-flex align-items-center justify-content-center social-icon-hover">
                    <i className="fab fa-instagram text-danger fs-5"></i>
                  </a>
                  <a href="#" className="btn btn-light border shadow-sm rounded-circle p-3 d-flex align-items-center justify-content-center social-icon-hover">
                    <i className="fab fa-pinterest text-danger fs-5"></i>
                  </a>
                </div>
              </div>
            </div>

          </div>

          <div data-aos="fade-up" className="col-lg-7">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-lg-5">
                {isSubmitted ? (
                  <div className="text-center py-4">
                    <div className="mb-4" data-aos="zoom-in" data-aos-duration="2000">
                      <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }}></i>
                    </div>
                    <h2 className="h4 mb-3" data-aos="fade-up">Message Sent Successfully!</h2>
                    <p className="lead mb-4" data-aos="fade-up" data-aos-delay="200">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsSubmitted(false)}
                      data-aos="zoom-in" data-aos-delay="500"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2
                      data-aos="fade-up"
                      data-aos-delay="50"
                      className="h4 mb-4 fw-bold text-primary text-uppercase letter-spacing-1"
                    >
                      📬 Send Us a Message
                    </h2>
                    <form data-aos="fade-up" data-aos-delay="200" onSubmit={handleSubmit} method='POST'>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label htmlFor="name" className="form-label">Your Name*</label>
                          <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            id="name"
                            name="name"
                            placeholder="e.g. Deepakkumar"
                            value={formData.name}
                            onChange={handleChange}
                            required
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
                            placeholder="e.g. deepak@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        <div className="col-12">
                          <label htmlFor="subject" className="form-label">Subject*</label>
                          <input
                            type="text"
                            className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                            id="subject"
                            name="subject"
                            placeholder="e.g. Feedback about your product research service"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                          />
                          {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                        </div>
                        <input type="hidden" name="redirect" value="" />

                        <div className="col-12">
                          <label htmlFor="message" className="form-label">Message*</label>
                          <div className='d-flex'>
                            <textarea
                              className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                              id="message"
                              name="message"
                              rows="6"
                              placeholder="e.g. I loved your service, but I have a few suggestions for improvements. Here's what I think..."
                              value={formData.message}
                              onChange={handleChange}
                              required
                            ></textarea>
                            {/* <span className=' d-flex align-items-start '> <span className='border rounded btn btn-sm' > <span onClick={handleVoiceSearch}>{isListening ? <>🔴</> : <>🎙️</>}</span> </span> </span> */}

                          </div>
                          {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                        </div>

                        <div className="col-6">
                          <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={isSubmitting}
                            data-aos="zoom-in"
                          >
                            {isSubmitting ? (
                              <>

                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Sending...
                              </>
                            ) : 'Send Message'}
                          </button>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-5 py-5">
          <h2
            className="h3 text-center mb-4 fw-bold text-primary"
            data-aos="fade-up"
          >
            ❓ Frequently Asked Questions
          </h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="faqAccordion">
                <div data-aos="fade-up" className="accordion-item mb-3 border-0 shadow-sm">
                  <h3 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      How do you select which products to feature?
                    </button>
                  </h3>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      We have a rigorous research process that involves analyzing expert reviews, customer feedback, and hands-on testing when possible. We only feature products that meet our quality standards and provide excellent value.
                    </div>
                  </div>
                </div>

                <div data-aos="fade-up" className="accordion-item mb-3 border-0 shadow-sm">
                  <h3 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Do you make money from the products you recommend?
                    </button>
                  </h3>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      Yes, we use affiliate links which means we earn a small commission when you purchase a product through our links. This doesn't cost you anything extra, and it helps us maintain our site. Importantly, our recommendations are never influenced by these commissions - we always recommend what we believe is best.
                    </div>
                  </div>
                </div>

                <div data-aos="fade-up" className="accordion-item mb-3 border-0 shadow-sm">
                  <h3 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      How often do you update your product recommendations?
                    </button>
                  </h3>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      We regularly review and update our recommendations to ensure they remain current. When newer, better products are released, or when existing products no longer meet our standards, we update our listings accordingly.
                    </div>
                  </div>
                </div>

                <div data-aos="fade-up" className="accordion-item border-0 shadow-sm">
                  <h3 className="accordion-header" id="headingFour">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      Can I request a specific product to be reviewed?
                    </button>
                  </h3>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      Absolutely! We welcome product research requests. Just visit our <a href="/request-product">Request Product</a> page and fill out the form with details about what you're looking for. We'll research the best options and add them to our site.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;