import { useGetAllCasesQuery } from '@/api/useGetAllCasesQuery';
import { useGetCaseByIdQuery } from '@/api/useGetCaseByIdQuery';
import type { Case } from '@/types/report';
import { useEffect, useState, type ChangeEvent } from 'react';

export const useReports = () => {
    const [selectedFile, setSelectedFile] = useState<string>('');
    const [selectedCase, setSelectedCase] = useState<Case | null>(null);
    const { reports } = useGetCaseByIdQuery(selectedFile);
    const { cases } = useGetAllCasesQuery();

    const selectFile = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedFile(e.target.value);
    };

    if (!selectedFile && cases.length > 0) setSelectedFile(cases[0].filename);

    useEffect(() => {
        const foundCase = cases.find(c => c.filename === selectedFile) || null;
        setSelectedCase(foundCase);
    }, [selectedFile, cases]);

    return {
        cases,
        reports,
        selectedFile,
        selectedCase,
        selectFile,
    }
}