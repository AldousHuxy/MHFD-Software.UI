import { useMutation, useQueryClient } from '@tanstack/react-query';
import { server } from './axios';
import type { AxiosResponse } from 'axios';
import type { Report } from '@/types/report';
import toast from 'react-hot-toast';

export const useParseCasesMutation = () => {
    const queryClient = useQueryClient();

    const {
        mutateAsync: parseCases,
        isError,
        error,
        isPending,
    } = useMutation({
        mutationKey: ['parseCases'],
        mutationFn: async ({ arrayBuffer, filename }: { arrayBuffer: ArrayBuffer; filename: string }) => {
            const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
            const formData = new FormData();
            formData.append('file', blob, filename);
            return (await server.post<never, AxiosResponse<Report[], Error>, FormData>('/cases/parse', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })).data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cases'] });
            toast.success('File uploaded successfully!');
        }
    });

    return {
        parseCases,
        isPending,
        isError,
        error,
    };
}