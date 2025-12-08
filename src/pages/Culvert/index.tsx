import { useState } from 'react';
import { IoMdAdd } from "react-icons/io";

const CulvertHome = () => {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const cards = [
        { id: 'conduit', title: 'Conduit Flow', description: 'Calculates normal and critical flow conditions in a circular pipe or box culvert.' },
        { id: 'rating', title: 'Culvert Rating', description: 'Determines the headwater for a circular or rectangular culvert.' },
        { id: 'hw', title: 'HW & Outlet Protection', description: 'Determines the headwater and required outlet protection sizes.' },
        { id: 'profile', title: 'Profile', description: 'Determines the vertical profile of the culvert and soil cover.' },
        { id: 'design', title: 'Documentation', description: 'Design Information on the usage of this software.' },
        { id: 'versions', title: 'Versions', description: 'Previous versions of this software.' },
    ];

    return (
        <div className="max-w-7xl mx-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            <div className="text-center">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-mhfd-dark-blue mb-1">Culvert Hydraulics <span className="sm:text-xl md:text-2xl text-slate-500">v5.0.0</span></h1>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                <section className="bg-white rounded-lg shadow-md p-3 sm:p-4 border-l-4 border-black">
                    <h2 className="text-lg sm:text-xl font-semibold text-mhfd-dark-blue mb-2 flex items-center gap-2">
                        <span className="text-mhfd-yellow text-xs sm:text-sm">●</span> Purpose
                    </h2>
                    <p className="text-gray-700 text-xs sm:text-sm leading-snug">
                        This web page aids in analyzing the flow in circular and box culverts, and calculate the vertical profile along the culvert.
                    </p>
                    <p className="text-gray-700 text-xs sm:text-sm leading-snug mt-2">
                        <span className="font-semibold text-sm sm:text-md">To get started</span>, create a new project using the <span className="border border-mhfd-yellow text-mhfd-yellow px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm rounded-full inline-flex items-center"><IoMdAdd className="inline-block mr-1" /> New Project</span> button in the navigation bar above. Once a project is created, additional sections will become available for detailed analyses.
                    </p>
                </section>

                <section className="bg-white rounded-lg shadow-md p-3 sm:p-4 border-l-4 border-medium-green">
                    <h2 className="text-lg sm:text-xl font-semibold text-mhfd-dark-blue mb-2 flex items-center gap-2">
                        <span className="text-medium-green text-xs sm:text-sm">●</span> Functionality
                    </h2>
                    <div className="space-y-1.5">
                        <div className="flex items-start gap-2 text-gray-700 text-[10px] sm:text-xs bg-gray-50 p-1.5 sm:p-2 rounded">
                            <span className="text-medium-green font-bold text-sm">✓</span>
                            <span>Calculate normal and critical flow conditions in a circular pipe.</span>
                        </div>
                        <div className="flex items-start gap-2 text-gray-700 text-[10px] sm:text-xs bg-gray-50 p-1.5 sm:p-2 rounded">
                            <span className="text-medium-green font-bold text-xs sm:text-sm">✓</span>
                            <span>Calculate normal and critical flow conditions in a box culvert.</span>
                        </div>
                        <div className="flex items-start gap-2 text-gray-700 text-[10px] sm:text-xs bg-gray-50 p-1.5 sm:p-2 rounded">
                            <span className="text-medium-green font-bold text-xs sm:text-sm">✓</span>
                            <span>Determine headwater depth for a culvert by comparing inlet vs. outlet control.</span>
                        </div>
                        <div className="flex items-start gap-2 text-gray-700 text-[10px] sm:text-xs bg-gray-50 p-1.5 sm:p-2 rounded">
                            <span className="text-medium-green font-bold text-xs sm:text-sm">✓</span>
                            <span>Determine the required outlet protection and riprap sizes for a culvert.</span>
                        </div>
                        <div className="flex items-start gap-2 text-gray-700 text-[10px] sm:text-xs bg-gray-50 p-1.5 sm:p-2 rounded">
                            <span className="text-medium-green font-bold text-xs sm:text-sm">✓</span>
                            <span>Determine the vertical profile along the culvert.</span>
                        </div>
                    </div>
                </section>

                <section className="lg:col-span-2 bg-white rounded-lg shadow-md p-3 sm:p-4 border-l-4 border-black">
                    <h2 className="text-lg sm:text-xl font-semibold text-mhfd-dark-blue mb-2 flex items-center gap-2">
                        <span className="text-mhfd-yellow text-xs sm:text-sm">●</span> Content
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2">
                        {cards.map((card) => (
                            <div 
                                key={card.id}
                                onMouseEnter={() => setHoveredCard(card.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                className={`bg-linear-to-br from-white to-gray-50 border-2 rounded-lg p-2 sm:p-2.5 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md ${
                                    hoveredCard === card.id 
                                        ? 'bg-mhfd-yellow border-mhfd-dark-blue scale-105' 
                                        : 'border-gray-200'
                                }`}
                            >
                                <h3 className="font-bold text-mhfd-dark-blue text-[10px] sm:text-xs mb-1 leading-tight">{card.title}</h3>
                                <p className={`text-gray-700 text-[9px] sm:text-[10px] overflow-hidden transition-all duration-300 leading-tight ${
                                    hoveredCard === card.id 
                                        ? 'opacity-100 max-h-16' 
                                        : 'opacity-0 max-h-0'
                                }`}>
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default CulvertHome;