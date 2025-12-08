import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Title } from './components/Title';
import { useDesignInfo } from '@/context/DesignInfoContext';

const profileSchema = z.object({
    barrelDiameterOrHeight: z.number().positive('Barrel diameter/height must be positive'),
    barrelLength: z.number().positive('Barrel length must be positive'),
    barrelInvertSlope: z.number().positive('Barrel invert slope must be positive'),
    downstreamInvertElevation: z.number(),
    downstreamTopEmbankmentElevation: z.number(),
    upstreamTopEmbankmentElevation: z.number(),
    designHeadwaterDepth: z.number().positive('Design headwater depth must be positive'),
    tailwaterDepth: z.number().positive('Tailwater depth must be positive')
});

type ProfileForm = z.infer<typeof profileSchema>;

const Profile = () => {
    const { selectedCulvert, updateDesignInfo } = useDesignInfo();

    const getDefaultValues = (): Partial<ProfileForm> => {
        if (!selectedCulvert?.profile) {
            return {};
        }

        return {
            barrelDiameterOrHeight: selectedCulvert.profile.barrelDiameterOrHeight,
            barrelLength: selectedCulvert.profile.barrelLength,
            barrelInvertSlope: selectedCulvert.profile.barrelInvertSlope,
            downstreamInvertElevation: selectedCulvert.profile.downstreamInvertElevation,
            downstreamTopEmbankmentElevation: selectedCulvert.profile.downstreamTopEmbankmentElevation,
            upstreamTopEmbankmentElevation: selectedCulvert.profile.upstreamTopEmbankmentElevation,
            designHeadwaterDepth: selectedCulvert.profile.designHeadwaterDepth,
            tailwaterDepth: selectedCulvert.profile.tailwaterDepth,
        };
    };

    const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
        resolver: zodResolver(profileSchema),
        defaultValues: getDefaultValues()
    });

    const onSubmit: SubmitHandler<ProfileForm> = (data) => {
        if (!selectedCulvert) return;
        
        const updatedCulvert = {
            ...selectedCulvert,
            profile: data
        };
        updateDesignInfo(updatedCulvert);
    };

    return (
        <div className="max-w-5xl mx-auto p-4">
            <Title />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div className="bg-white rounded-lg shadow-md p-3">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                        <div>
                            <label htmlFor="barrelDiameterOrHeight" className="block text-xs font-semibold text-gray-700 mb-1">
                                Barrel Diameter/Height (ft)
                            </label>
                            <input
                                id="barrelDiameterOrHeight"
                                type="number"
                                step="0.1"
                                {...register('barrelDiameterOrHeight', { valueAsNumber: true })}
                                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                            />
                            {errors.barrelDiameterOrHeight && (
                                <p className="text-red-500 text-xs mt-0.5">{errors.barrelDiameterOrHeight.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="barrelLength" className="block text-xs font-semibold text-gray-700 mb-1">
                                Barrel Length (ft)
                            </label>
                            <input
                                id="barrelLength"
                                type="number"
                                step="0.1"
                                {...register('barrelLength', { valueAsNumber: true })}
                                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                            />
                            {errors.barrelLength && (
                                <p className="text-red-500 text-xs mt-0.5">{errors.barrelLength.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="barrelInvertSlope" className="block text-xs font-semibold text-gray-700 mb-1">
                                Barrel Invert Slope
                            </label>
                            <input
                                id="barrelInvertSlope"
                                type="number"
                                step="0.0001"
                                {...register('barrelInvertSlope', { valueAsNumber: true })}
                                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                            />
                            {errors.barrelInvertSlope && (
                                <p className="text-red-500 text-xs mt-0.5">{errors.barrelInvertSlope.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="downstreamInvertElevation" className="block text-xs font-semibold text-gray-700 mb-1">
                                Downstream Invert Elevation (ft)
                            </label>
                            <input
                                id="downstreamInvertElevation"
                                type="number"
                                step="0.1"
                                {...register('downstreamInvertElevation', { valueAsNumber: true })}
                                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                            />
                            {errors.downstreamInvertElevation && (
                                <p className="text-red-500 text-xs mt-0.5">{errors.downstreamInvertElevation.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="downstreamTopEmbankmentElevation" className="block text-xs font-semibold text-gray-700 mb-1">
                                Downstream Top Embankment Elevation (ft)
                            </label>
                            <input
                                id="downstreamTopEmbankmentElevation"
                                type="number"
                                step="0.1"
                                {...register('downstreamTopEmbankmentElevation', { valueAsNumber: true })}
                                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                            />
                            {errors.downstreamTopEmbankmentElevation && (
                                <p className="text-red-500 text-xs mt-0.5">{errors.downstreamTopEmbankmentElevation.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="upstreamTopEmbankmentElevation" className="block text-xs font-semibold text-gray-700 mb-1">
                                Upstream Top Embankment Elevation (ft)
                            </label>
                            <input
                                id="upstreamTopEmbankmentElevation"
                                type="number"
                                step="0.1"
                                {...register('upstreamTopEmbankmentElevation', { valueAsNumber: true })}
                                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                            />
                            {errors.upstreamTopEmbankmentElevation && (
                                <p className="text-red-500 text-xs mt-0.5">{errors.upstreamTopEmbankmentElevation.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="designHeadwaterDepth" className="block text-xs font-semibold text-gray-700 mb-1">
                                Design Headwater Depth (ft)
                            </label>
                            <input
                                id="designHeadwaterDepth"
                                type="number"
                                step="0.1"
                                {...register('designHeadwaterDepth', { valueAsNumber: true })}
                                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                            />
                            {errors.designHeadwaterDepth && (
                                <p className="text-red-500 text-xs mt-0.5">{errors.designHeadwaterDepth.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="tailwaterDepth" className="block text-xs font-semibold text-gray-700 mb-1">
                                Tailwater Depth (ft)
                            </label>
                            <input
                                id="tailwaterDepth"
                                type="number"
                                step="0.1"
                                {...register('tailwaterDepth', { valueAsNumber: true })}
                                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-transparent"
                            />
                            {errors.tailwaterDepth && (
                                <p className="text-red-500 text-xs mt-0.5">{errors.tailwaterDepth.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm bg-medium-green text-white font-semibold rounded-lg hover:bg-opacity-90 hover:scale-105 transition-all duration-200"
                    >
                        Generate Profile
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Profile;