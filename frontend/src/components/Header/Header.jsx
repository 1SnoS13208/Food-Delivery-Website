import React, { useState, useEffect } from 'react'
import './Header.css'

const Header = () => {
    // Array of background images. 
    // To add more, put images in 'frontend/public' and add their filenames here.
    const backgrounds = [
        '/header_img.png', 
        '/banner_2.png', // Duplicate for demo. Replace with e.g., '/hero_2.png'
        '/banner_3.png'  // Duplicate for demo. Replace with e.g., '/hero_3.png'
    ];

    const [currentBg, setCurrentBg] = useState(0);

    const nextSlide = () => {
        setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    };

    const prevSlide = () => {
        setCurrentBg((prev) => (prev === 0 ? backgrounds.length - 1 : prev - 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBg((prev) => (prev + 1) % backgrounds.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [backgrounds.length]);

  return (
    <div className='header' data-aos="zoom-in" data-aos-duration="1500">
      {backgrounds.map((bg, index) => (
        <div 
          key={index}
          className={`header-slide ${index === currentBg ? 'active' : ''}`}
          style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${bg})` }}
        ></div>
      ))}
      <div className="header-arrow header-arrow-left" onClick={prevSlide}>&#10094;</div>
      <div className="header-contents">
        <h2 data-aos="fade-up" data-aos-delay="200">Order your favourite food here</h2>
        <p data-aos="fade-up" data-aos-delay="400">Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
        <a href='#explore-menu'><button data-aos="fade-up" data-aos-delay="600">View Menu</button></a>
      </div>
      <div className="header-arrow header-arrow-right" onClick={nextSlide}>&#10095;</div>
    </div>
  )
}

export default Header
