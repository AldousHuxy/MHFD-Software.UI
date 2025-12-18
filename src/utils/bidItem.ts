import type { BidItem, BidItemPricing } from '@/types/bidItem';

export const getBidItemById = (pricing: BidItemPricing, id: number): BidItem => {
    const item = pricing.data.find((bidItem: BidItem) => bidItem['Bid Item No.'] === id);

    if (item) {
        return item;
    }

    throw new Error(`Bid Item with ID ${id} not found.`);
}

export const getBidItemsByIds = (pricing: BidItemPricing, ids: number[]): BidItem[] => {
    return ids.map(id => getBidItemById(pricing, id));
}

export const getBidItemByCode = (pricing: BidItemPricing, code: string): BidItem => {
    const item = pricing.data.find((bidItem: BidItem) => bidItem['Bid Item Code'] === code);

    if (item) {
        return item;
    }

    throw new Error(`Bid Item with code ${code} not found.`);
}

export const getBidItemsByCodes = (pricing: BidItemPricing, codes: string[]): BidItem[] => {
    return codes.map(code => getBidItemByCode(pricing, code));
}