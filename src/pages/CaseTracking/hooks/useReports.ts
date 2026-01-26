import { useGetAllCasesQuery } from '@/api/useGetAllCasesQuery';
import { useGetCaseByIdQuery } from '@/api/useGetCaseByIdQuery';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';

export const useReports = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<string>('');
    const [selectedCase, setSelectedCase] = useState<string | null>(null);
    const { reports } = useGetCaseByIdQuery(selectedFile);
    const { cases } = useGetAllCasesQuery();

    const selectFile = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedFile(e.target.value);
    };

    const handleUploadClick = (): void => {
        fileInputRef.current?.click();
    };

    if (!selectedFile && cases.length > 0) setSelectedFile(cases[0]);

    useEffect(() => {
        const foundCase = cases.find(c => c === selectedFile) || null;
        setSelectedCase(foundCase);
    }, [selectedFile, cases]);

    return {
        fileInputRef,
        cases,
        reports,
        selectedFile,
        selectedCase,
        selectFile,
        handleUploadClick,
    }
}