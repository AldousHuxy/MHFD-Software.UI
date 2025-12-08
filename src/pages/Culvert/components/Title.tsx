import { useDesignInfo } from "@/context/DesignInfoContext";
import { When } from "@/hocs/When";

export const Title = () => {
    const { designInformation, selectedCulvert } = useDesignInfo();

    return (
        <When condition={!!designInformation}>
            <div className="text-center">
                <h1 className="text-3xl font-bold text-mhfd-dark-blue mb-1">{designInformation?.projectName} {selectedCulvert ? (selectedCulvert.type === 'pipe' ? `#${selectedCulvert.pipeId}` : `#${selectedCulvert.boxId}`) : ''}</h1>
            </div>
        </When>
    );
}