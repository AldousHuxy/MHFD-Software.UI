import { useState, useEffect, type MouseEventHandler, useRef } from 'react';
import boulderCreek from '/stream-Boulder_Creek.jpg';
import cherryCreek from '/stream-Cherry_Creek.jpg';
import sandersonGulch from '/stream-Sanderson_Gulch.jpg';
import kenneysRun from '/stream-Kenneys_Run.jpg';
import bearCreek from '/stream-Bear_Creek.jpg';
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { When } from '@/hocs/When';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const searchRef = useRef<HTMLInputElement>(null);
  const toolsDropdown = [
    {
      id: 1,
      module: 'Hydraulics & Hydrology Tools',
      submodules: ['CUHP', 'UDSWMM', 'UD-Sewer']
    },
    {
      id: 2,
      module: 'Design Tools [USDCM] Vol.1 & 2',
      submodules: ['Rational', 'Inlet', 'Detention', 'Culvert']
    },
    {
      id: 3,
      module: 'Design Tools [USDCM] Vol.3',
      submodules: ['Preliminary', 'Detailed']
    },
    {
      id: 4,
      module: 'Planning & Construction Tools',
      submodules: ['Bid Item Pricing', 'UD-MP Cost']
    },
    {
      id: 5,
      module: 'Floodplain Management Tools',
      submodules: ['AI Chatbot']
    },
  ]

  const formatAltText = (filename: string) => {
    const parts = filename.split('/');
    filename = parts[parts.length - 1]
      .replace('stream-', '')
      .replace(/_/g, ' ')
      .replace('.jpg', '')
      .trim();
    
    return `${filename} by David Skoudas`
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

  const search: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    console.log(searchRef.current?.value);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(id);
  }, [carouselImages.length]);

  return (
    <div className="relative">
      <div className="relative overflow-hidden w-full h-[88vh]">
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={carouselImages[currentImageIndex].src} alt={carouselImages[currentImageIndex].alt} className="w-full h-full object-cover opacity-65" />
          {/* Search bar container */}
          <p className="absolute top-3 left-[36%] flex flex-col">
            <span className="inline-flex items-center rounded-full shadow-2xl drop-shadow-2xl overflow-hidden">
              <button
                type="button"
                onClick={search}
                className="cursor-pointer bg-medium-green text-white rounded-l-full hover:bg-dark-green transition-colors duration-150 px-6 py-3 text-lg font-semibold hover:text-mhfd-dark-blue hover:bg-soft-blue"
              >
                Search
              </button>
              <div className="bg-mhfd-dark-blue bg-opacity-75 text-white rounded-r-full">
                <input
                  type="text"
                  ref={searchRef}
                  placeholder="Find Floodware..."
                  aria-label="Search"
                  className="bg-white w-[420px] h-12 bg-opacity-20 placeholder-black placeholder-opacity-60 text-black text-lg px-4 rounded-r-full focus:ring-2 focus:ring-mhfd-dark-blue focus:outline-none"
                />
              </div>
            </span>
          </p>
        </div>

        <button
          type="button"
          aria-label="Previous image"
          onClick={handlePrevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-mhfd-dark-blue text-white rounded-full p-2 hover:scale-105 hover:shadow-lg transition-transform duration-150 ease-in-out cursor-pointer"
        >
          <FaAngleLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label="Next image"
          onClick={handleNextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-mhfd-dark-blue text-white rounded-full p-2 hover:scale-105 hover:shadow-lg transition-transform duration-150 ease-in-out cursor-pointer"
        >
          <FaAngleRight className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {carouselImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Show ${img.alt}`}
              aria-current={currentImageIndex === idx ? 'true' : 'false'}
              onClick={() => setCurrentImageIndex(idx)}
              className={
                `cursor-pointer w-3 h-3 rounded-full transition-transform duration-150 ` +
                (currentImageIndex === idx
                  ? 'bg-mhfd-dark-blue scale-110 shadow-lg'
                  : 'border border-mhfd-dark-blue hover:bg-white hover:scale-110')
              }
            />
          ))}
        </div>

        {/* Current image alt text (bottom-right) */}
        <div
          className="absolute bottom-4 right-4 bg-mhfd-dark-blue bg-opacity-80 text-white px-4 py-2 rounded-full text-sm max-w-xs truncate"
          aria-live="polite"
        >
          {carouselImages[currentImageIndex].alt}
        </div>
      </div>
    </div>
  )
}

export default Home;