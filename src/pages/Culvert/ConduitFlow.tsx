import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Title } from './components/Title';
import { useDesignInfo } from '@/context/DesignInfoContext';
import { When } from '@/hocs/When';

const pipeConduitFlowSchema = z.object({
    type: z.literal('pipe'),
    pipeInvertSlope: z.number().positive('Pipe invert slope must be positive'),
    pipeManningsNValue: z.number().positive('Manning\'s N value must be positive'),
    pipeDiameter: z.number().positive('Pipe diameter must be positive'),
    designDischarge: z.number().positive('Design discharge must be positive')
});

const boxConduitFlowSchema = z.object({
    type: z.literal('box'),
    boxConduitInvertSlope: z.number().positive('Box conduit invert slope must be positive'),
    boxManningsNValue: z.number().positive('Manning\'s N value must be positive'),
    boxWidth: z.number().positive('Box width must be positive'),
    boxHeight: z.number().positive('Box height must be positive'),
    designDischarge: z.number().positive('Design discharge must be positive')
});

const conduitFlowSchema = z.discriminatedUnion('type', [
    pipeConduitFlowSchema,
    boxConduitFlowSchema
]);

type ConduitFlowForm = z.infer<typeof conduitFlowSchema>;

const ConduitFlow = () => {
    const { selectedCulvert, updateDesignInfo } = useDesignInfo();

    const getDefaultValues = (): Partial<ConduitFlowForm> => {
        if (!selectedCulvert) {
            return { type: 'pipe' };
        }

        const baseValues = {
            type: selectedCulvert.type,
        };

        if (!selectedCulvert.conduitFlow) {
            return baseValues;
        }

        if (selectedCulvert.type === 'pipe') {
            return {
                ...baseValues,
                pipeInvertSlope: selectedCulvert.conduitFlow.pipeInvertSlope,
                pipeManningsNValue: selectedCulvert.conduitFlow.pipeManningsNValue,
                pipeDiameter: selectedCulvert.conduitFlow.pipeDiameter,
                designDischarge: selectedCulvert.conduitFlow.designDischarge,
            };
        } else {
            return {
                ...baseValues,
                boxConduitInvertSlope: selectedCulvert.conduitFlow.boxConduitInvertSlope,
                boxManningsNValue: selectedCulvert.conduitFlow.boxManningsNValue,
                boxWidth: selectedCulvert.conduitFlow.boxWidth,
                boxHeight: selectedCulvert.conduitFlow.boxHeight,
                designDischarge: selectedCulvert.conduitFlow.designDischarge,
            };
        }
    };

    const { register, handleSubmit, formState: { errors } } = useForm<ConduitFlowForm>({
        resolver: zodResolver(conduitFlowSchema),
        defaultValues: getDefaultValues()
    });

    const onSubmit: SubmitHandler<ConduitFlowForm> = (data) => {
        if (!selectedCulvert) return;
        
        if (selectedCulvert.type === 'pipe' && data.type === 'pipe') {
            const updatedCulvert = {
                ...selectedCulvert,
                conduitFlow: data
            };
            updateDesignInfo(updatedCulvert);
        } else if (selectedCulvert.type === 'box' && data.type === 'box') {
            const updatedCulvert = {
                ...selectedCulvert,
                conduitFlow: data
            };
            updateDesignInfo(updatedCulvert);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-3 sm:p-4">
            <Title />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 sm:space-y-3">
                {/* Pipe Conduit Fields */}
                <When condition={selectedCulvert?.type === 'pipe'}>
                    <div className="bg-white rounded-lg shadow-md p-2.5 sm:p-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                            <div>
                                <label htmlFor="pipeInvertSlope" className="block text-[11px] sm:text-xs font-semibold text-gray-700 mb-1">
                                    Pipe Invert Slope
                                </label>
                                <input
                                    id="pipeInvertSlope"
                                    type="number"
                                    step="0.0001"
                                    {...register('pipeInvertSlope', { valueAsNumber: true })}
                                    className="w-full px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="pipeManningsNValue" className="block text-xs font-semibold text-gray-700 mb-1">
                                    Manning's N Value
                                </label>
                                <input
                                    id="pipeManningsNValue"
                                    type="number"
                                    step="0.001"
                                    {...register('pipeManningsNValue', { valueAsNumber: true })}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="pipeDiameter" className="block text-xs font-semibold text-gray-700 mb-1">
                                    Pipe Diameter (ft)
                                </label>
                                <input
                                    id="pipeDiameter"
                                    type="number"
                                    step="0.1"
                                    {...register('pipeDiameter', { valueAsNumber: true })}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="designDischarge" className="block text-xs font-semibold text-gray-700 mb-1">
                                    Design Discharge (cfs)
                                </label>
                                <input
                                    id="designDischarge"
                                    type="number"
                                    step="0.1"
                                    {...register('designDischarge', { valueAsNumber: true })}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                                />
                                {errors.designDischarge && (
                                    <p className="text-red-500 text-xs mt-0.5">{errors.designDischarge?.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </When>

                {/* Box Conduit Fields */}
                <When condition={selectedCulvert?.type === 'box'}>
                    <div className="bg-white rounded-lg shadow-md p-3">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                            <div>
                                <label htmlFor="boxConduitInvertSlope" className="block text-xs font-semibold text-gray-700 mb-1">
                                    Box Conduit Invert Slope
                                </label>
                                <input
                                    id="boxConduitInvertSlope"
                                    type="number"
                                    step="0.0001"
                                    {...register('boxConduitInvertSlope', { valueAsNumber: true })}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="boxManningsNValue" className="block text-xs font-semibold text-gray-700 mb-1">
                                    Manning's N Value
                                </label>
                                <input
                                    id="boxManningsNValue"
                                    type="number"
                                    step="0.001"
                                    {...register('boxManningsNValue', { valueAsNumber: true })}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="boxWidth" className="block text-xs font-semibold text-gray-700 mb-1">
                                    Box Width (ft)
                                </label>
                                <input
                                    id="boxWidth"
                                    type="number"
                                    step="0.1"
                                    {...register('boxWidth', { valueAsNumber: true })}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="boxHeight" className="block text-xs font-semibold text-gray-700 mb-1">
                                    Box Height (ft)
                                </label>
                                <input
                                    id="boxHeight"
                                    type="number"
                                    step="0.1"
                                    {...register('boxHeight', { valueAsNumber: true })}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="designDischarge" className="block text-xs font-semibold text-gray-700 mb-1">
                                    Design Discharge (cfs)
                                </label>
                                <input
                                    id="designDischarge"
                                    type="number"
                                    step="0.1"
                                    {...register('designDischarge', { valueAsNumber: true })}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                                />
                                {errors.designDischarge && (
                                    <p className="text-red-500 text-xs mt-0.5">{errors.designDischarge.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </When>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm bg-medium-green text-white font-semibold rounded-lg hover:bg-opacity-90 hover:scale-105 transition-all duration-200"
                    >
                        Calculate Flow
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ConduitFlow;