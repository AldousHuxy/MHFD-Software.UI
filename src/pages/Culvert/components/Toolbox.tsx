import { useDesignInfo } from '@/context/DesignInfoContext';
import { PiToolboxDuotone } from 'react-icons/pi';
import { useState, useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { When } from '@/hocs/When';
import type { Culvert, CulvertType } from '@/types/designInfo';
import { MdOutlinePrint } from "react-icons/md";
import { FileUtils } from '@/utils/file';
import { NewCulvertModal } from './NewCulvertModal';

export const Toolbox = () => {
    const { designInformation, selectedCulvert, handleCulvertClick, getCulvertKey, addCulvert } = useDesignInfo();
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!listRef.current) return;

        const pills = listRef.current.querySelectorAll('.culvert-pill');
        
        if (isOpen) {
            animate(pills, {
                translateY: [50, 0],
                opacity: [0, 1],
                delay: stagger(100),
                duration: 500,
                easing: 'easeOutElastic(1, .8)'
            });
        } else {
            animate(pills, {
                translateY: [0, 50],
                opacity: [1, 0],
                delay: stagger(50),
                direction: 'reverse',
                duration: 300,
                easing: 'easeInQuad'
            });
        }
    }, [isOpen]);

    const getCulvertLabel = (culvert: Culvert) => {
        if (culvert.type === 'pipe') {
            return `#${culvert.pipeId}`;
        } else {
            return `#${culvert.boxId}`;
        }
    };

    const handleNewCulvertSubmit = (data: { culvertId: string }, culvertType: CulvertType) => {
        addCulvert(culvertType, data.culvertId);
    };

    const dowloadDesignInfo = () => {
        if (!designInformation) return;

        // Use FileUtils to download the design information as a CSV file
        const csvData = FileUtils.designInfoToExcel(designInformation);

        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${designInformation.projectName || 'design_info'}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <When condition={!!(designInformation?.culverts && designInformation.culverts.length > 0)}>
            <div 
                className="fixed bottom-4 sm:bottom-16 right-3 sm:right-6 z-50"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                {designInformation?.culverts && designInformation.culverts.length > 0 && (
                    <div 
                        ref={listRef}
                        className="absolute bottom-14 sm:bottom-18 right-0 flex flex-col gap-2 sm:gap-3 pb-6"
                        style={{ 
                            pointerEvents: 'auto',
                            visibility: isOpen ? 'visible' : 'hidden'
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="culvert-pill px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-base shadow-lg border-2 border-dashed transition-all duration-200 cursor-pointer whitespace-nowrap font-medium rounded-full bg-gray-100 text-gray-400 border-gray-400 hover:bg-medium-green hover:text-white hover:border-medium-green hover:scale-105 hover:shadow-xl"
                            style={{ opacity: 0 }}
                        >
                            New Culvert
                        </button>
                        {designInformation.culverts.map(culvert => {
                            const culvertKey = getCulvertKey(culvert);
                            const selectedKey = selectedCulvert ? getCulvertKey(selectedCulvert) : null;
                            const isSelected = selectedKey === culvertKey;
                            
                            return (
                                <div
                                    key={culvertKey}
                                    onClick={() => handleCulvertClick(culvert)}
                                    className={`culvert-pill px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base shadow-lg border-2 transition-all duration-200 cursor-pointer whitespace-nowrap text-center font-medium ${
                                        culvert.type === 'pipe' ? 'rounded-full' : 'rounded-md'
                                    } ${
                                        isSelected 
                                            ? 'bg-mhfd-dark-blue text-white border-mhfd-dark-blue scale-105 shadow-xl ring-2 ring-mhfd-dark-blue ring-offset-2' 
                                            : 'bg-white text-gray-800 border-mhfd-dark-blue hover:bg-mhfd-dark-blue hover:text-white'
                                    }`}
                                    style={{ opacity: 0 }}
                                >
                                    {getCulvertLabel(culvert)}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Toolbox Button with Add Button */}
                <div 
                    className={`relative transition-all duration-300 ${isOpen ? 'rotate-12' : 'hover:rotate-12'}`}
                >
                    <button 
                        className="cursor-pointer w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-r from-mhfd-purple to-mhfd-blue text-slate-50 rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300"
                        aria-label="Open toolbox"
                    >
                        <PiToolboxDuotone size={24} className="sm:hidden" />
                        <PiToolboxDuotone size={32} className="hidden sm:block" />
                    </button>
                    
                    {/* Print Button */}
                    <button
                        onClick={dowloadDesignInfo}
                        className="cursor-pointer absolute top-0 right-0 w-5 h-5 sm:w-6 sm:h-6 bg-mhfd-dark-blue text-white rounded-full shadow-md flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-200"
                        aria-label="Print"
                    >
                        <MdOutlinePrint size={12} className="sm:hidden" />
                        <MdOutlinePrint size={14} className="hidden sm:block" />
                    </button>
                </div>
            </div>
            <NewCulvertModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSubmit={handleNewCulvertSubmit}
            />
        </When>
    )
}