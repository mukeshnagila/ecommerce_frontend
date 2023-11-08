import React, { useState, useEffect, useCallback } from 'react';
import "../carousel/carousel.css";

const Carousel = () => {
  // Define an array of image URLs
  const images = [
    'https://helloyubo.com/wp-content/uploads/2022/09/IMG-20220913-WA0040-1024x465.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF6vuuE-d3DukgRvBb_eXKRadw57B64Rx8MmicNTXXiQJtKLj80JYDfMTsurFLLWkaNcU&usqp=CAU',
    'https://img.freepik.com/free-vector/hand-drawn-winter-social-media-promo-template_23-2149135167.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); 

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="image-slider">
      <img className='slider' src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
            <button className="slider-arrow prev" onClick={prevSlide}>
                &#9664; 
            </button>
            <button className="slider-arrow next" onClick={nextSlide}>
                &#9654; 
            </button>
    </div>
  );
};

export default Carousel;
