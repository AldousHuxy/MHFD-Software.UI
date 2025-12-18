import pricing from '@/data/MHFD-Bid-Pricing-Database.json';
import type { BidItem, BidItemPricing } from '@/types/bidItem';
import { getBidItemsByCodes } from '@/utils/bidItem';
import { formatCurrency } from '@/utils/formatCurrency';
import { useRef, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

type BidItemForm = {
    query: string;
}

const BidItem = () => {
    const { handleSubmit } = useForm<BidItemForm>();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterField, setFilterField] = useState<'Standard Item Description' | 'Project' | 'Contractor'>('Standard Item Description');
    const inputRef = useRef<HTMLInputElement>(null);

    const bidItems: BidItem[] = getBidItemsByCodes(pricing as BidItemPricing, [
        'GN-01-001', 'GN-02-001', 'GN-03-001', 'GN-04-001', 'GN-05-001', 'GN-06-001',
        'GN-07-001', 'ESC-01-001', 'ESC-20-001', 'FN-01-004', 'FN-01-004', 'ESC-13-001',
        'ESC-03-001', 'ESC-05-001', 'ESC-17-002', 'ESC-19-001', 'ESC-19-001', 'ESC-09-001',
        'RR-06-014', 'RR-06-006', 'RR-06-019', 'RR-06-020', 'ESP-06-004'
    ]);

    const bidItemHeaders = Object.keys(bidItems[0]);

    const bidItemIdx = bidItemHeaders.indexOf('Bid Item No.');
    if (bidItemIdx > -1) {
        bidItemHeaders.splice(bidItemIdx, 1);
    }

    const dateIdx = bidItemHeaders.indexOf('Date');
    if (dateIdx > -1) {
        bidItemHeaders.splice(dateIdx, 1);
    }

    bidItems.forEach(item => {
        delete (item as any)['Bid Item No.'];
        delete (item as any)['Date'];
    });

    bidItems.forEach(item => {
        item['Unit Price'] = formatCurrency(Number(item['Unit Price']));
        item['Total Cost of Bid Item'] = formatCurrency(Number(item['Total Cost of Bid Item']));
        item['Total Project Cost'] = formatCurrency(Number(item['Total Project Cost']));
    });

    const filteredBidItems = searchQuery
        ? bidItems.filter(item => 
            item[filterField].toLowerCase().includes(searchQuery.toLowerCase())
          )
        : bidItems;

    const onSubmit: SubmitHandler<BidItemForm> = data => {
        console.log(data);
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <form className="h-full flex flex-col p-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-slate-100 rounded-xl shadow-md p-6 mb-6">
                <div className="flex gap-4 items-center max-w-4xl mx-auto">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-medium-green text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-sm whitespace-nowrap"
                    >
                        Submit
                    </button>
                    <select
                        value={filterField}
                        onChange={(e) => setFilterField(e.target.value as 'Standard Item Description' | 'Project' | 'Contractor')}
                        className="px-4 py-2 border-2 border-mhfd-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-purple focus:border-transparent text-sm bg-white"
                    >
                        <option value="Standard Item Description">Description</option>
                        <option value="Project">Project</option>
                        <option value="Contractor">Contractor</option>
                    </select>
                    <input
                        type="text"
                        ref={inputRef}
                        onChange={handleSearchChange}
                        placeholder={`Search by ${filterField}...`}
                        className="flex-1 px-4 py-2 border-2 border-mhfd-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-mhfd-purple focus:border-transparent text-sm"
                    />
                </div>
            </div>
            <div className="flex-1 min-h-0">
                <div className="w-full h-full overflow-auto border border-gray-300 rounded-lg shadow-sm">
                    <table className="w-full table-auto border-collapse">
                        <thead className="bg-gray-100 sticky top-0">
                            <tr className="text-left">
                                {bidItemHeaders.map((header) => (
                                    <th key={header} className="border border-gray-300 px-2 py-1 text-xs whitespace-nowrap">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredBidItems.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    {bidItemHeaders.map((header) => (
                                        <td key={header} className="border border-gray-300 px-2 py-1 text-xs">{(item as any)[header]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </form>
    );
}

export default BidItem;