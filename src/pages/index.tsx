import { useState, useEffect, type MouseEventHandler, useRef, type ReactNode } from 'react';
import boulderCreek from '/stream-Boulder_Creek.jpg';
import cherryCreek from '/stream-Cherry_Creek.jpg';
import sandersonGulch from '/stream-Sanderson_Gulch.jpg';
import kenneysRun from '/stream-Kenneys_Run.jpg';
import bearCreek from '/stream-Bear_Creek.jpg';
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { When } from '@/hocs/When';
import { IoIosClose } from "react-icons/io";
import ROUTES from '@/routes'
import { useNavigate } from 'react-router-dom';

type Tool = {
  id: number
  module: {  name: ReactNode, label: string, route: string  }
  submodules: { name: ReactNode, label: string, route: string }[]
}

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>('');
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const toolsDropdown: Tool[] = [
    {
      id: 1,
      module: { name: <>Hydraulics & Hydrology Tools</>, label: 'Hydraulics & Hydrology Tools', route: '/hydraulics-hydrology' },
      submodules: [
        { name: <>Colorado Urban Hydrograph Procedure <sup className="text-medium-green">v3</sup></>, label: 'CUHP', route: '/cuhp' },
        { name: <>Urban Drainage Storm Water Management Model <sup className="text-medium-green">v2</sup></>, label: 'UDSWMM', route: '/udswwm' },
        { name: <>Urban Drainage Sewer <sup className="text-medium-green">v2</sup></>, label: 'UD-Sewer', route: '/ud-sewer' }
      ]
    },
    {
      id: 2,
      module: { name: <>Design Tools [USDCM] Vol.1 & 2</>, label: 'Design Tools [USDCM] Vol.1 & 2', route: '/design-tools-vol1-2' },
      submodules: [
        { name: <>Peak Runoff Prediction by the Rational Method <sup className="text-medium-green">v4</sup></>, label: 'Rational', route: ROUTES.RATIONAL.HOME },
        { name: <>Street Capacity and Inlet Sizing</>, label: 'Inlet', route: '/inlet' },
        { name: <>Detention Design <sup className="text-medium-green">v5</sup></>, label: 'Detention', route: '/detention' },
        { name: <>Culvert Hydraulics <sup className="text-medium-green">v3</sup></>, label: 'Culvert', route: ROUTES.CULVERT.HOME }
      ]
    },
    {
      id: 3,
      module: { name: <>Design Tools [USDCM] Vol.3</>, label: 'Design Tools [USDCM] Vol.3', route: '/design-tools-vol3' },
      submodules: [
        { name: <>Bioretention Media Mix Analysis</>, label: 'Bioretention', route: '/bioretention' },
        { name: <>Stormwater Control Measure Design <sup className="text-medium-green">v5</sup></>, label: 'SMC', route: '/smc' },
        { name: <>BMP Life Cycle Cost Analysis</>, label: 'BMP', route: '/bmp' }
      ]
    },
    {
      id: 4,
      module: { name: <>Planning & Construction Tools</>, label: 'Planning & Construction Tools', route: '/planning-construction' },
      submodules: [
        { name: <>Bid Item Pricing</>, label: 'Bid Item Pricing', route: ROUTES.BID_ITEM.HOME },
        { name: <>Urban Drainage Master Plan Cost <sup className="text-medium-green">v3</sup></>, label: 'UD-MP Cost', route: '/ud-mp-cost' }
      ]
    },
    {
      id: 5,
      module: { name: <>Floodplain Management Tools</>, label: 'Floodplain Management Tools', route: '/floodplain-management' },
      submodules: [
        { name: <>Letter of Map Change Analysis</>, label: 'Letter of Map Change Analysis', route: ROUTES.LOMC.HOME }
      ]
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
    if (selectedItem) {
      const selectedTool = toolsDropdown.find(tool => 
        tool.module.label === selectedItem || 
        tool.submodules.some(sub => sub.label === selectedItem)
      );
      if (selectedTool) {
        const submodule = selectedTool.submodules.find(sub => sub.label === selectedItem);
        const route = submodule ? submodule.route : selectedTool.module.route;
        navigate(route);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedItem('');
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
    setSearchQuery(item);
    setShowDropdown(false);
    searchRef.current?.blur();
    
    // Navigate to the selected route
    const selectedTool = toolsDropdown.find(tool => 
      tool.module.label === item || 
      tool.submodules.some(sub => sub.label === item)
    );
    if (selectedTool) {
      const submodule = selectedTool.submodules.find(sub => sub.label === item);
      const route = submodule ? submodule.route : selectedTool.module.route;
      navigate(route);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedItem('');
    setShowDropdown(false);
    searchRef.current?.focus();
  };

  const getFilteredTools = () => {
    if (!searchQuery.trim()) {
      return toolsDropdown;
    }

    const query = searchQuery.toLowerCase();
    return toolsDropdown.map(tool => ({
      ...tool,
      submodules: tool.submodules.filter(sub => 
        sub.label.toLowerCase().includes(query) || 
        tool.module.label.toLowerCase().includes(query)
      )
    })).filter(tool => 
      tool.module.label.toLowerCase().includes(query) || 
      tool.submodules.length > 0
    );
  };

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(id);
  }, [carouselImages.length]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div className="relative overflow-hidden w-full h-[81.05vh] xl:h-[88.05vh]">
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={carouselImages[currentImageIndex].src} alt={carouselImages[currentImageIndex].alt} className="w-full h-full object-cover opacity-65" />
          <div className="absolute top-3 left-[36%] flex flex-col">
            <span className="inline-flex items-center rounded-full shadow-2xl drop-shadow-2xl overflow-hidden">
              <button
                type="button"
                onClick={search}
                className="cursor-pointer bg-medium-green text-white rounded-l-full hover:bg-dark-green transition-colors duration-150 px-6 py-3 text-lg font-semibold hover:text-mhfd-dark-blue hover:bg-soft-blue"
              >
                Search
              </button>
              <div className="bg-mhfd-dark-blue bg-opacity-75 text-white rounded-r-full relative">
                <input
                  type="text"
                  ref={searchRef}
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  placeholder="Search Floodware..."
                  aria-label="Search"
                  className="bg-white w-[420px] h-12 bg-opacity-20 placeholder-black placeholder-opacity-60 text-gray-500 text-lg px-4 pr-12 rounded-r-full focus:ring-2 focus:ring-mhfd-dark-blue focus:outline-none"
                />
                <When condition={searchQuery.length > 0}>
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-mhfd-dark-blue hover:scale-110 transition-all duration-150 cursor-pointer"
                  >
                    <IoIosClose className="h-7 w-7" />
                  </button>
                </When>
              </div>
            </span>

            {/* Dropdown */}
            <When condition={showDropdown}>
              <div 
                ref={dropdownRef}
                className="absolute top-14 left-0 right-0 bg-white rounded-2xl shadow-2xl max-h-96 overflow-y-auto z-50 border border-gray-200 [&::-webkit-scrollbar]:w-4 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-mhfd-dark-blue [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-medium-green"
              >
                {getFilteredTools().length > 0 ? (
                  getFilteredTools().map((tool) => (
                    <div key={tool.id} className="border-b border-gray-100 last:border-b-0">
                      <div 
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer font-semibold text-mhfd-dark-blue"
                        onClick={() => handleSelectItem(tool.module.label)}
                      >
                        {tool.module.name}
                      </div>
                      {tool.submodules.length > 0 && (
                        <div className="bg-gray-50">
                          {tool.submodules.map((submodule, idx) => (
                            <div
                              key={idx}
                              className="px-8 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 border-t border-gray-200"
                              onClick={() => handleSelectItem(submodule.label)}
                            >
                              {submodule.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500 text-center">
                    No tools found
                  </div>
                )}
              </div>
            </When>
          </div>
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