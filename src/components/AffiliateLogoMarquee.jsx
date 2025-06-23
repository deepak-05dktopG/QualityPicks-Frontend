import React from "react";
import ParallaxText from "../lib/VelocityScroll";
import flipcartlogo from '../assets/flipkart.svg';
import myntralogo from '../assets/myntra.svg';
import meeshologo from '../assets/Meesho Logo.jpg'
import amazonlogo from '../assets/amazonin-logo.jpg'

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
    <div className="logo-marquee-container ">
      <h2 data-aos="fade-up" className="text-center my-4">Our Affiliate Partners</h2>

      <div data-aos="zoom-in" className="logo-track ">
        <ParallaxText baseVelocity={-1.7} >
          {logos.map((logo, index) => (
            <span key={index} className="mx-5">
              <img
                src={logo.src}
                alt={logo.alt}
                className="mx-5 rounded-5"
                style={{ height: "150px", width: "250px", objectFit: "contain" }}
              />
            </span>
          ))}
        </ParallaxText>
      </div>
    </div>
  );
};

export default AffiliateMarquee;
