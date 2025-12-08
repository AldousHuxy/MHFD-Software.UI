import { When } from '@/hocs/When';
import PATHS from '@/routes';
import { NavLink, useLocation } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";
import { BiUpload } from "react-icons/bi";
import { useState, useRef, type ChangeEvent } from 'react';
import { CreateProjectModal } from './CreateProjectModal';
import { useDesignInfo } from '@/context/DesignInfoContext';

export const Navbar = () => {
    const { pathname } = useLocation();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { designInformation, uploadDesignInfo, createProject } = useDesignInfo();
    const isActive = (path: string): boolean => pathname === path;

    const createNewProject = (): void => setIsOpen(true);

    const handleUploadClick = (): void => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader()
            
            reader.onload = function (e) {
                uploadDesignInfo(JSON.parse(e.target?.result as string))
            }
                
            reader.readAsText(file)
        }
    };
    
    return (
        <nav className="bg-slate-500 p-2 sm:p-4 text-white overflow-x-auto">
            <ul className="flex items-center gap-2 sm:gap-4 min-w-max">
                <li>
                    <NavLink to={PATHS.CULVERT.HOME} className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-base rounded-full inline-block hover:bg-opacity-80 hover:scale-105 transition-all duration-200 whitespace-nowrap ${
                        isActive(PATHS.CULVERT.HOME) ? 'bg-mhfd-yellow text-mhfd-dark-blue font-semibold underline' : 'bg-slate-700'
                    }`}>
                        Getting Started
                    </NavLink>
                </li>
                <When condition={!!designInformation}>
                    <NavLink to={PATHS.CULVERT.CONDUIT_FLOW} className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-base rounded-full inline-block hover:bg-opacity-80 hover:scale-105 transition-all duration-200 whitespace-nowrap ${
                        isActive(PATHS.CULVERT.CONDUIT_FLOW) ? 'bg-mhfd-yellow text-mhfd-dark-blue font-semibold underline' : 'bg-slate-700'
                    }`}>
                        Conduit Flow
                    </NavLink>
                </When>
                <When condition={!!designInformation}>
                    <NavLink to={PATHS.CULVERT.CULVERT_RATING} className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-base rounded-full inline-block hover:bg-opacity-80 hover:scale-105 transition-all duration-200 whitespace-nowrap ${
                        isActive(PATHS.CULVERT.CULVERT_RATING) ? 'bg-mhfd-yellow text-mhfd-dark-blue font-semibold underline' : 'bg-slate-700'
                    }`}>
                        Culvert Rating
                    </NavLink>
                </When>
                <When condition={!!designInformation}>
                    <NavLink to={PATHS.CULVERT.HW_OUTLET_PROTECTION} className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-base rounded-full inline-block hover:bg-opacity-80 hover:scale-105 transition-all duration-200 whitespace-nowrap ${
                        isActive(PATHS.CULVERT.HW_OUTLET_PROTECTION) ? 'bg-mhfd-yellow text-mhfd-dark-blue font-semibold underline' : 'bg-slate-700'
                    }`}>
                        HW & Outlet Protection
                    </NavLink>
                </When>
                <When condition={!!designInformation}>
                    <NavLink to={PATHS.CULVERT.PROFILE} className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-base rounded-full inline-block hover:bg-opacity-80 hover:scale-105 transition-all duration-200 whitespace-nowrap ${
                        isActive(PATHS.CULVERT.PROFILE) ? 'bg-mhfd-yellow text-mhfd-dark-blue font-semibold underline' : 'bg-slate-700'
                    }`}>
                        Profile
                    </NavLink>
                </When>
                <When condition={!designInformation}>
                    <li>
                        <button 
                            className="cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-base bg-slate-700 text-white rounded-full hover:bg-mhfd-yellow hover:text-white hover:bg-medium-green hover:scale-105 hover:shadow-lg transition-all duration-200 flex items-center gap-1 whitespace-nowrap"
                            onClick={createNewProject}
                        >
                            <IoMdAdd size={16} className="sm:hidden" />
                            <IoMdAdd size={20} className="hidden sm:block" /> 
                            <span>New Project</span>
                        </button>
                    </li>
                </When>
                <When condition={!designInformation}>
                    <li>
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".json,.txt,.csv"
                        />
                        <button 
                            className="cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-base bg-slate-700 text-white rounded-full hover:bg-mhfd-yellow hover:text-white hover:bg-soft-blue hover:scale-105 hover:shadow-lg transition-all duration-200 flex items-center gap-1 whitespace-nowrap"
                            onClick={handleUploadClick}
                        >
                            <BiUpload size={16} className="sm:hidden" />
                            <BiUpload size={20} className="hidden sm:block" /> 
                            <span>Upload Project</span>
                        </button>
                    </li>
                </When>

                <li className="ml-auto">
                    <NavLink to={PATHS.CULVERT.DOCUMENTATION} className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-base rounded-full inline-block hover:bg-opacity-80 hover:scale-105 transition-all duration-200 whitespace-nowrap ${
                        isActive(PATHS.CULVERT.DOCUMENTATION) ? 'bg-mhfd-yellow text-mhfd-dark-blue font-semibold underline' : 'bg-slate-700'
                    }`}>
                        Documentation
                    </NavLink>
                </li>

                {/* Previous version nav item */}
                <li>
                    <NavLink to={PATHS.CULVERT.PREVIOUS_VERSIONS} className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-base rounded-full inline-block hover:bg-opacity-80 hover:scale-105 transition-all duration-200 whitespace-nowrap ${
                        isActive(PATHS.CULVERT.PREVIOUS_VERSIONS) ? 'bg-mhfd-yellow text-mhfd-dark-blue font-semibold underline' : 'bg-slate-700'
                    }`}>
                        Versions
                    </NavLink>
                </li>
            </ul>
            <CreateProjectModal 
                isOpen={isOpen} 
                onClose={() => setIsOpen(false)} 
                onSubmit={(data, culvertType) => createProject(data.projectName, data.projectId, culvertType, data.culvertId)} 
            />
        </nav>
    )
}

export default Navbar;