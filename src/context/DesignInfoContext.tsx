import type { Culvert, DesignInfo } from '@/types/designInfo';
import { createContext, useContext, useState, type ReactNode } from 'react';
import PATHS from '@/routes';
import { useNavigate } from 'react-router-dom';

type DesignInfoProvider = {
    children: ReactNode
}

type DesignInfoContext = {
    designInformation: DesignInfo|null
    uploadDesignInfo: (info: DesignInfo) => void
    createProject: (projectName: string, projectId: string, culvertType: 'pipe' | 'box', culvertId: string) => void
    addCulvert: (culvertType: 'pipe' | 'box', culvertId: string) => void
    getCulvertKey: (culvert: Culvert) => string
    selectedCulvert: Culvert | null
    handleCulvertClick: (culvert: Culvert) => void
    updateDesignInfo: (updatedCulvert: Culvert) => void
}

const DesignInfoContext = createContext({} as DesignInfoContext);

export const useDesignInfo = () => useContext(DesignInfoContext);

export const DesignInfoProvider = ({ children }: DesignInfoProvider) => {
    const [designInformation, setDesignInformation] = useState<DesignInfo|null>(null)
    const [selectedCulvert, setSelectedCulvert] = useState<Culvert | null>(null);
    const navigate = useNavigate();


    const uploadDesignInfo = (info: DesignInfo) => {
        setDesignInformation(info)
        // Select first culvert by default
        if (info.culverts && info.culverts.length > 0) {
            setSelectedCulvert(info.culverts[0]);
        }
        // Redirect to conduit flow page
        navigate(PATHS.CULVERT.CONDUIT_FLOW);
    }

    const createProject = (projectName: string, projectId: string, culvertType: 'pipe' | 'box', culvertId: string) => {
        const culvertIdNum = parseInt(culvertId, 10);
        
        const newCulvert: Culvert = culvertType === 'pipe' 
            ? { type: 'pipe', pipeId: culvertIdNum }
            : { type: 'box', boxId: culvertIdNum };
        
        const newDesignInfo: DesignInfo = {
            projectName,
            projectId: parseInt(projectId, 10),
            culverts: [newCulvert]
        };
        
        setDesignInformation(newDesignInfo);
        setSelectedCulvert(newCulvert);
        navigate(PATHS.CULVERT.CONDUIT_FLOW);
    }

    const getCulvertKey = (culvert: Culvert) => {
        return culvert.type === 'pipe' ? `pipe-${culvert.pipeId}` : `box-${culvert.boxId}`;
    };

    const handleCulvertClick = (culvert: Culvert) => {
        const selectedKey = selectedCulvert ? getCulvertKey(selectedCulvert) : null;
        const culvertKey = getCulvertKey(culvert);
        setSelectedCulvert(selectedKey === culvertKey ? null : culvert);
    };

    const addCulvert = (culvertType: 'pipe' | 'box', culvertId: string) => {
        if (!designInformation) return;

        const culvertIdNum = parseInt(culvertId, 10);
        const newCulvert: Culvert = culvertType === 'pipe' 
            ? { type: 'pipe', pipeId: culvertIdNum }
            : { type: 'box', boxId: culvertIdNum };

        const updatedCulverts = [...(designInformation.culverts || []), newCulvert];

        setDesignInformation({
            ...designInformation,
            culverts: updatedCulverts
        });
        setSelectedCulvert(newCulvert);
    };

    const updateDesignInfo = (updatedCulvert: Culvert) => {
        if (!designInformation) return;

        const updatedCulverts = designInformation.culverts?.map(culvert => {
            const culvertKey = getCulvertKey(culvert);
            const updatedKey = getCulvertKey(updatedCulvert);
            return culvertKey === updatedKey ? updatedCulvert : culvert;
        });

        setDesignInformation({
            ...designInformation,
            culverts: updatedCulverts
        });
    }
    
    return (
        <DesignInfoContext.Provider value={{
            designInformation,
            uploadDesignInfo,
            createProject,
            addCulvert,
            getCulvertKey,
            selectedCulvert,
            handleCulvertClick,
            updateDesignInfo
        }}>
            {children}
        </DesignInfoContext.Provider>
    )
}