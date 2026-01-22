import { useQuery } from '@tanstack/react-query';
import { server } from './axios';
import type { AxiosResponse } from 'axios';
import type { Report } from '@/types/report';

export const useGetCaseByIdQuery = (filename: string = 'LOMC-CaseTrackingReport_10.6.2025') => {
    const {
        data: reports,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['cases', filename],
        queryFn: async () => (await server.get<never, AxiosResponse<Report[], Error>, unknown>(`/cases?filename=${filename}`)).data,
        initialData: [] as Report[],
    });

    return {
        reports,
        isLoading,
        isError,
        error,
    };
}