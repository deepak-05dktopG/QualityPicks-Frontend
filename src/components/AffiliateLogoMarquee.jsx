import React from "react";
import ParallaxText from "../lib/VelocityScroll";
import flipcartlogo from '/assets/flipkart.svg';
import myntralogo from '/assets/myntra.svg';
import meeshologo from '/assets/Meesho Logo.jpg'
import amazonlogo from '/assets/amazonin-logo.jpg'

const logos = [
  {
    src: amazonlogo,
    alt: "Amazon"
  },
  {
    src: myntralogo,
    alt: "Myntra"
  },
  {
    src: flipcartlogo,
    alt: "Flipkart"
  },
  {
    src: meeshologo,
    alt: "Meesho"
  }
];

const AffiliateMarquee = () => {
  return (
    <div className="logo-marquee-container py-5 bg-light rounded-4 shadow-sm">
      <h2
        data-aos="fade-up"
        className="text-center fw-bold mb-5 text-primary display-6"
        style={{ letterSpacing: '0.5px' }}
      >
        🤝 <span className="text-warning">Trusted</span> Affiliate Partners
      </h2>


      <div data-aos="zoom-in" className="logo-track overflow-hidden">
        <ParallaxText baseVelocity={-1.7}>
          {logos.map((logo, index) => (
            <span
              key={index}
              className="mx-5 d-inline-flex align-items-center justify-content-center bg-white rounded-4 shadow-sm p-3"
              style={{
                width: "240px",
                height: "140px",
                marginRight: "30px",
                transition: "transform 0.3s ease",
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="img-fluid"
                style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
              />
            </span>
          ))}
        </ParallaxText>
      </div>
    </div>

  );
};

export default AffiliateMarquee;
