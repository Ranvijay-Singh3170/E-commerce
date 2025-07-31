import React, { useState, useEffect } from 'react';

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return <div className="text-center p-4">No images available</div>;
  }

  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto border-2 border-black rounded-2xl p-4 text-center">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="w-full h-[250px] sm:h-[300px] object-cover rounded transition-all duration-500"
      />
    </div>
  );
};

export default ImageGallery;
