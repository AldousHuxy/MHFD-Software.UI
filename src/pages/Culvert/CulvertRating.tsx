import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PIPE_INLET_EDGE_TYPES, BOX_INLET_EDGE_TYPES, type PipeInletEdgeType, type BoxInletEdgeType } from '@/types/inletEdgeType';
import { Title } from './components/Title';
import { useDesignInfo } from '@/context/DesignInfoContext';
import { When } from '@/hocs/When';

const pipeCulvertRatingSchema = z.object({
    type: z.literal('pipe'),
    barrelDiameter: z.number().positive('Barrel diameter must be positive'),
    inletEdgeType: z.enum(Object.keys(PIPE_INLET_EDGE_TYPES) as [PipeInletEdgeType, ...PipeInletEdgeType[]])
});

const boxCulvertRatingSchema = z.object({
    type: z.literal('box'),
    barrelHeight: z.number().positive('Barrel height must be positive'),
    barrelWidth: z.number().positive('Barrel width must be positive'),
    inletEdgeType: z.enum(Object.keys(BOX_INLET_EDGE_TYPES) as [BoxInletEdgeType, ...BoxInletEdgeType[]]),
    numOfBarrels: z.number().int().positive('Number of barrels must be a positive integer'),
    inletElevationAtCulvertInlet: z.number(),
    isSlope: z.boolean().optional(),
    outletElevationOrSlope: z.number(),
    culvertLength: z.number().positive('Culvert length must be positive'),
    manningsRoughness: z.number().positive('Manning\'s roughness must be positive'),
    bendLossCoefficient: z.number().min(0, 'Bend loss coefficient must be non-negative'),
    exitLossCoefficient: z.number().min(0, 'Exit loss coefficient must be non-negative')
});

const culvertRatingSchema = z.discriminatedUnion('type', [
    pipeCulvertRatingSchema,
    boxCulvertRatingSchema
]);

type CulvertRatingForm = z.infer<typeof culvertRatingSchema>;

const CulvertRating = () => {
    const { selectedCulvert, updateDesignInfo } = useDesignInfo();

    const getDefaultValues = (): Partial<CulvertRatingForm> => {
        if (!selectedCulvert) {
            return { type: 'pipe' };
        }

        const baseValues = {
            type: selectedCulvert.type,
        };

        if (!selectedCulvert.culvertRating) {
            return baseValues;
        }

        if (selectedCulvert.type === 'pipe') {
            return {
                type: 'pipe' as const,
                barrelDiameter: selectedCulvert.culvertRating.barrelDiameter,
                inletEdgeType: selectedCulvert.culvertRating.inletEdgeType,
            };
        } else {
            return {
                type: 'box' as const,
                barrelHeight: selectedCulvert.culvertRating.barrelHeight,
                barrelWidth: selectedCulvert.culvertRating.barrelWidth,
                inletEdgeType: selectedCulvert.culvertRating.inletEdgeType,
                numOfBarrels: selectedCulvert.culvertRating.numOfBarrels,
                inletElevationAtCulvertInlet: selectedCulvert.culvertRating.inletElevationAtCulvertInlet,
                isSlope: selectedCulvert.culvertRating.isSlope,
                outletElevationOrSlope: selectedCulvert.culvertRating.outletElevationOrSlope,
                culvertLength: selectedCulvert.culvertRating.culvertLength,
                manningsRoughness: selectedCulvert.culvertRating.manningsRoughness,
                bendLossCoefficient: selectedCulvert.culvertRating.bendLossCoefficient,
                exitLossCoefficient: selectedCulvert.culvertRating.exitLossCoefficient,
            };
        }
    };
    
    const { register, handleSubmit, formState: { errors } } = useForm<CulvertRatingForm>({
        resolver: zodResolver(culvertRatingSchema),
        defaultValues: getDefaultValues()
    });

    const onSubmit: SubmitHandler<CulvertRatingForm> = (data) => {
        if (!selectedCulvert) return;
        
        if (selectedCulvert.type === 'pipe' && data.type === 'pipe') {
            const updatedCulvert = {
                ...selectedCulvert,
                culvertRating: data
            };
            updateDesignInfo(updatedCulvert);
        } else if (selectedCulvert.type === 'box' && data.type === 'box') {
            const updatedCulvert = {
                ...selectedCulvert,
                culvertRating: data
            };
            updateDesignInfo(updatedCulvert);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-4">
            <Title />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                {/* Pipe Culvert Rating Fields */}
                <When condition={selectedCulvert?.type === 'pipe'}>
                    <div className="bg-white rounded-lg shadow-md p-3">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="barrelDiameter" className="block text-xs font-semibold text-gray-700 mb-1">
                                    Barrel Diameter (ft)
                                </label>
                                <input
                                    id="barrelDiameter"
                                    type="number"
                                    step="0.1"
                                    {...register('barrelDiameter', { valueAsNumber: true })}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="inletEdgeType" className="block text-xs font-semibold text-gray-700 mb-1">
                                    Inlet Edge Type
                                </label>
                                <select
                                    id="inletEdgeType"
                                    {...register('inletEdgeType')}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                                >
                                    {Object.entries(PIPE_INLET_EDGE_TYPES).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                                {errors.inletEdgeType && (
                                    <p className="text-red-500 text-xs mt-0.5">{errors.inletEdgeType.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </When>

                {/* Box Culvert Rating Fields */}
                <When condition={selectedCulvert?.type === 'box'}>
                    <div className="bg-white rounded-lg shadow-md p-3">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                            <div>
                                <label htmlFor="barrelHeight" className="block text-xs font-semibold text-gray-700 mb-1">
                                    Barrel Height (ft)
                                </label>
                                <input
                                    id="barrelHeight"
                                    type="number"
                                    step="0.1"
                                    {...register('barrelHeight', { valueAsNumber: true })}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="barrelWidth" className="block text-xs font-semibold text-gray-700 mb-1">
                                    Barrel Width (ft)
                                </label>
                                <input
                                    id="barrelWidth"
                                    type="number"
                                    step="0.1"
                                    {...register('barrelWidth', { valueAsNumber: true })}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="numOfBarrels" className="block text-xs font-semibold text-gray-700 mb-1">
                                    Number of Barrels
                                </label>
                                <input
                                    id="numOfBarrels"
                                    type="number"
                                    {...register('numOfBarrels', { valueAsNumber: true })}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                                />
                            </div>

                            <div className="lg:col-span-3">
                                <label htmlFor="inletEdgeType" className="block text-xs font-semibold text-gray-700 mb-1">
                                    Inlet Edge Type
                                </label>
                                <select
                                    id="inletEdgeType"
                                    {...register('inletEdgeType')}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                                >
                                    {Object.entries(BOX_INLET_EDGE_TYPES).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                                {errors.inletEdgeType && (
                                    <p className="text-red-500 text-xs mt-0.5">{errors.inletEdgeType.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="inletElevationAtCulvertInlet" className="block text-xs font-semibold text-gray-700 mb-1">
                                    Inlet Elevation (ft)
                                </label>
                                <input
                                    id="inletElevationAtCulvertInlet"
                                    type="number"
                                    step="0.1"
                                    {...register('inletElevationAtCulvertInlet', { valueAsNumber: true })}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="outletElevationOrSlope" className="block text-xs font-semibold text-gray-700 mb-1">
                                    Outlet Elevation/Slope
                                </label>
                                <input
                                    id="outletElevationOrSlope"
                                    type="number"
                                    step="0.0001"
                                    {...register('outletElevationOrSlope', { valueAsNumber: true })}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="culvertLength" className="block text-xs font-semibold text-gray-700 mb-1">
                                    Culvert Length (ft)
                                </label>
                                <input
                                    id="culvertLength"
                                    type="number"
                                    step="0.1"
                                    {...register('culvertLength', { valueAsNumber: true })}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="manningsRoughness" className="block text-xs font-semibold text-gray-700 mb-1">
                                    Manning's Roughness
                                </label>
                                <input
                                    id="manningsRoughness"
                                    type="number"
                                    step="0.001"
                                    {...register('manningsRoughness', { valueAsNumber: true })}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="bendLossCoefficient" className="block text-xs font-semibold text-gray-700 mb-1">
                                    Bend Loss Coefficient
                                </label>
                                <input
                                    id="bendLossCoefficient"
                                    type="number"
                                    step="0.01"
                                    {...register('bendLossCoefficient', { valueAsNumber: true })}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="exitLossCoefficient" className="block text-xs font-semibold text-gray-700 mb-1">
                                    Exit Loss Coefficient
                                </label>
                                <input
                                    id="exitLossCoefficient"
                                    type="number"
                                    step="0.01"
                                    {...register('exitLossCoefficient', { valueAsNumber: true })}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                </When>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm bg-medium-green text-white font-semibold rounded-lg hover:bg-opacity-90 hover:scale-105 transition-all duration-200"
                    >
                        Calculate Rating
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CulvertRating;