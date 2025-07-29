import React, { useState, useEffect } from 'react';

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto Slide: Change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3000ms = 3 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [images.length]);

  // Manual Previous/Next Handlers (optional)
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-[400px] border-2 border-black rounded-2xl p-4 text-center">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="w-full h-[300px] object-cover rounded"
      />

      <div className="flex justify-between mt-4">
        
        
      </div>
    </div>
  );
};

export default ImageGallery;
