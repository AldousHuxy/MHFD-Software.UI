import { useQuery } from '@tanstack/react-query';
import { server } from './axios';
import type { AxiosResponse } from 'axios';
import type { Case } from '@/types/report';

export const useGetAllCasesQuery = () => {
    const {
        data: cases,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['all-cases'],
        queryFn: async () => (await server.get<never, AxiosResponse<Case[], Error>, unknown>('/cases/all')).data,
        initialData: [] as Case[],
    });

    return {
        cases,
        isLoading,
        isError,
        error,
    };
}