import { useQuery } from '@tanstack/react-query';
import { server } from './axios';
import type { AxiosResponse } from 'axios';

export const useGetAllCasesQuery = () => {
    const {
        data: cases,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['all-cases'],
        queryFn: async () => (await server.get<never, AxiosResponse<string[], Error>, unknown>('/cases/all')).data,
        initialData: [] as string[],
    });

    return {
        cases,
        isLoading,
        isError,
        error,
    };
}