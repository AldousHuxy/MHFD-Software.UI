import { useRef, type ChangeEvent } from 'react';
import { BiUpload } from "react-icons/bi";
import { When } from '@/hocs/When';
import { useParseCasesMutation } from '@/api/useParseCasesMutation';
import { useReports } from './hooks/useReports';

const CaseTracking = () => {
    const { cases, reports, selectedFile, selectFile } = useReports();
    const { parseCases, isPending } = useParseCasesMutation();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const headings = [
        'Project ID',
        'Case #',
        'Type',
        'Analyst/Engineer',
        'Status',
        'City',
        'County',
        'Received',
    ];

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'active':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'inactive':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const handleUploadClick = (): void => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = async function (e) {
                const arrayBuffer = e.target?.result;
                if (arrayBuffer instanceof ArrayBuffer) {
                    try {
                        await parseCases({ arrayBuffer, filename: file.name });
                    } catch (error) {
                        console.error('Error parsing PDF:', error);
                    }
                }
            };
            
            reader.readAsArrayBuffer(file);
        }
    };
    
    return (
        <div className="max-w-8xl mx-auto sm:p-4 space-y-3 sm:space-y-4">
            <div className="text-center">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-mhfd-dark-blue mb-1">Case Tracking Report</h1>
                <p className="text-gray-600 text-xs sm:text-sm">Monitor and track CLOMR and LOMR project proposals</p>
            </div>

            <When condition={reports.length > 0}>
                <section className="bg-white rounded-lg shadow-md sm:p-4">
                    <div className="flex items-center justify-between mb-3 gap-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-mhfd-dark-blue flex items-center gap-2">
                            LOMC CASE TRACKING
                        </h2>
                        <div className="flex items-center gap-3">
                            <select
                                value={selectedFile}
                                onChange={selectFile}
                                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-white text-mhfd-dark-blue border-2 border-mhfd-dark-blue rounded-full hover:bg-gray-50 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-mhfd-yellow focus:border-mhfd-yellow"
                            >
                                {cases.map((caseFile) => (
                                    <option key={caseFile.filename} value={caseFile.filename}>
                                        {caseFile.filename}
                                    </option>
                                ))}
                            </select>
                            <div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept=".pdf"
                                />
                                <button 
                                    className="cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-mhfd-dark-blue text-white rounded-full hover:bg-soft-blue hover:scale-105 hover:shadow-lg transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    onClick={handleUploadClick}
                                    disabled={isPending}
                                >
                                    <BiUpload size={16} className="sm:hidden" />
                                    <BiUpload size={18} className="hidden sm:block" /> 
                                    <span>{isPending ? 'Processing...' : 'Upload PDF Report'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="overflow-auto max-h-[400px]">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-mhfd-dark-blue sticky top-0 z-10">
                                <tr>
                                    {headings.map((heading) => (
                                        <th 
                                            key={heading}
                                            scope="col" 
                                            className="px-3 py-1.5 text-left text-xs font-semibold text-white uppercase tracking-wider"
                                        >
                                            {heading}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {reports.map((report, index) => (
                                    <tr 
                                        key={index}
                                        className={`${
                                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                        } hover:bg-blue-50 transition-colors duration-150 cursor-pointer`}
                                    >
                                        <td className="px-3 py-1.5 whitespace-nowrap text-xs sm:text-sm font-medium text-mhfd-dark-blue">
                                            <div className="relative group">
                                                <span className="cursor-pointer">
                                                    {report.projectId}
                                                </span>
                                                <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block z-10 w-max max-w-xs">
                                                    <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 shadow-lg">
                                                        {report.projectId}
                                                        <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-1.5 whitespace-nowrap text-xs sm:text-sm text-gray-700">
                                            {report.caseNum}
                                        </td>
                                        <td className="px-3 py-1.5 whitespace-nowrap text-xs sm:text-sm text-gray-700">
                                            {report.type}
                                        </td>
                                        <td className="px-3 py-1.5 whitespace-nowrap text-xs sm:text-sm text-gray-700">
                                            {report.analystOrEngineer}
                                        </td>
                                        <td className="px-3 py-1.5 whitespace-nowrap">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(report.status)}`}>
                                                {report.status}
                                            </span>
                                        </td>
                                        <td className="px-3 py-1.5 whitespace-nowrap text-xs sm:text-sm text-gray-700">
                                            {report.city}
                                        </td>
                                        <td className="px-3 py-1.5 whitespace-nowrap text-xs sm:text-sm text-gray-700">
                                            {report.county}
                                        </td>
                                        <td className="px-3 py-1.5 whitespace-nowrap text-xs sm:text-sm text-gray-700">
                                            {new Date(report.received).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-3 text-xs text-gray-500 flex items-center justify-between">
                        <span>Showing {reports.length} case{reports.length !== 1 ? 's' : ''}</span>
                        <span className="text-mhfd-dark-blue font-semibold">Total Active: {reports.filter(report => report.status === 'Active').length}</span>
                    </div>
                </section>
            </When>
        </div>
    );
}

export default CaseTracking;