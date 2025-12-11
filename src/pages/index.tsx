import { useState, useEffect } from 'react';
import boulderCreek from '/stream-Boulder_Creek.jpg';
import cherryCreek from '/stream-Cherry_Creek.jpg';
import sandersonGulch from '/stream-Sanderson_Gulch.jpg';
import kenneysRun from '/stream-Kenneys_Run.jpg';
import bearCreek from '/stream-Bear_Creek.jpg';
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const formatAltText = (filename: string) => {
    const parts = filename.split('/');
    filename = parts[parts.length - 1];
    
    return filename
      .replace('stream-', '')
      .replace(/_/g, ' ')
      .replace('.jpg', '')
      .trim();
  }

  const carouselImages = [
    { src: boulderCreek, alt: formatAltText(boulderCreek) },
    { src: cherryCreek, alt: formatAltText(cherryCreek) },
    { src: sandersonGulch, alt: formatAltText(sandersonGulch) },
    { src: kenneysRun, alt: formatAltText(kenneysRun) },
    { src: bearCreek, alt: formatAltText(bearCreek) },
  ]

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length);
  }

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(id);
  }, [carouselImages.length]);

  return (
    <div className="relative">
      <div className="relative overflow-hidden w-full h-173 xl:h-163 2xl:h-193">
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={carouselImages[currentImageIndex].src} alt={carouselImages[currentImageIndex].alt} className="w-full h-full object-cover opacity-65" />
        </div>

        <button
          type="button"
          aria-label="Previous image"
          onClick={handlePrevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-mhfd-dark-blue text-white rounded-full p-2 hover:scale-105 hover:shadow-lg transition-transform duration-150 ease-in-out cursor-pointer focus:outline-none"
        >
          <FaAngleLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label="Next image"
          onClick={handleNextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-mhfd-dark-blue text-white rounded-full p-2 hover:scale-105 hover:shadow-lg transition-transform duration-150 ease-in-out cursor-pointer focus:outline-none"
        >
          <FaAngleRight className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Dots: active page indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {carouselImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Show ${img.alt}`}
              aria-current={currentImageIndex === idx ? 'true' : 'false'}
              onClick={() => setCurrentImageIndex(idx)}
              className={
                `cursor-pointer w-3 h-3 rounded-full transition-transform duration-150 focus:outline-none ` +
                (currentImageIndex === idx
                  ? 'bg-mhfd-dark-blue scale-110 shadow-lg'
                  : 'border border-mhfd-dark-blue hover:bg-white hover:scale-110')
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home;