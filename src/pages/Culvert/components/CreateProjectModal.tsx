import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IoClose } from 'react-icons/io5';
import type { CulvertType } from '@/types/designInfo';
import { useState } from 'react';
import { When } from '@/hocs/When';

const projectSchema = z.object({
    projectName: z.string().min(1, 'Project name is required').max(100, 'Project name must be less than 100 characters'),
    projectId: z.string().min(1, 'Project ID is required').max(50, 'Project ID must be less than 50 characters'),
    culvertId: z.string().min(1, 'Culvert ID is required').max(50, 'Culvert ID must be less than 50 characters')
});

type ProjectFormData = z.infer<typeof projectSchema>;

type NewProjectModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ProjectFormData, culvertType: CulvertType) => void;
}

export const CreateProjectModal = ({ isOpen, onClose, onSubmit }: NewProjectModalProps) => {
    const [culvertType, setCulvertType] = useState<CulvertType>('pipe');
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema)
    });

    const handleFormSubmit: SubmitHandler<ProjectFormData> = (data) => {
        onSubmit(data, culvertType);
        reset();
        onClose();
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40" style={{ zIndex: 9999 }} onClick={handleClose}>
            <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-8 w-full max-w-md relative transform transition-all" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={handleClose}
                    className="cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Close modal"
                >
                    <IoClose size={24} />
                </button>

                <div className="flex items-center justify-between mb-6 mt-2">
                    <h2 className="text-2xl font-bold text-mhfd-dark-blue">Create New Project</h2>
                    
                    <div className="relative flex items-center gap-2 bg-gray-100 rounded-full p-1">
                        {/* Sliding background */}
                        <div 
                            className="absolute top-1 bottom-1 bg-mhfd-dark-blue rounded-full shadow-md transition-all duration-300 ease-in-out"
                            style={{
                                left: culvertType === 'pipe' ? '4px' : 'calc(50% + 0px)',
                                right: culvertType === 'pipe' ? 'calc(50% + 0px)' : '4px'
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => setCulvertType('pipe')}
                            className={`cursor-pointer relative z-10 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-300 ${
                                culvertType === 'pipe'
                                    ? 'text-white'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Pipe
                        </button>
                        <button
                            type="button"
                            onClick={() => setCulvertType('box')}
                            className={`cursor-pointer relative z-10 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-300 ${
                                culvertType === 'box'
                                    ? 'text-white'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Box
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="projectName" className="block text-sm font-semibold text-gray-700 mb-2">
                            Project Name
                        </label>
                        <input
                            id="projectName"
                            type="text"
                            {...register('projectName')}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-mhfd-dark-blue transition-all duration-200 text-gray-900"
                            placeholder="Enter project name"
                        />
                        {errors.projectName && (
                            <p className="text-red-500 text-xs mt-1">{errors.projectName.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="projectId" className="block text-sm font-semibold text-gray-700 mb-2">
                            Project ID
                        </label>
                        <input
                            id="projectId"
                            type="text"
                            {...register('projectId')}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-mhfd-dark-blue transition-all duration-200 text-gray-900"
                            placeholder="Enter project ID"
                        />
                        {errors.projectId && (
                            <p className="text-red-500 text-xs mt-1">{errors.projectId.message}</p>
                        )}
                    </div>

                    <When condition={culvertType === 'pipe'}>
                        <div>
                            <label htmlFor="culvertId" className="block text-sm font-semibold text-gray-700 mb-2">
                                Pipe ID
                            </label>
                            <input
                                id="culvertId"
                                type="text"
                                {...register('culvertId')}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-mhfd-dark-blue transition-all duration-200 text-gray-900"
                                placeholder="Enter pipe ID"
                            />
                            {errors.culvertId && (
                                <p className="text-red-500 text-xs mt-1">{errors.culvertId.message}</p>
                            )}
                        </div>
                    </When>

                    <When condition={culvertType === 'box'}>
                        <div>
                            <label htmlFor="culvertId" className="block text-sm font-semibold text-gray-700 mb-2">
                                Box ID
                            </label>
                            <input
                                id="culvertId"
                                type="text"
                                {...register('culvertId')}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-mhfd-dark-blue transition-all duration-200 text-gray-900"
                                placeholder="Enter box ID"
                            />
                            {errors.culvertId && (
                                <p className="text-red-500 text-xs mt-1">{errors.culvertId.message}</p>
                            )}
                        </div>
                    </When>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="cursor-pointer flex-1 px-4 py-2 bg-white text-slate-700 font-semibold rounded-full border-2 border-slate-700 hover:bg-slate-300 hover:text-black hover:scale-105 transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer flex-1 px-4 py-2 bg-white text-slate-700 font-semibold rounded-full border-2 border-slate-700 hover:bg-slate-300 hover:text-black hover:scale-105 transition-all duration-200"
                        >
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}