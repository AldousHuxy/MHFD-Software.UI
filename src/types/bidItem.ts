export type BidItem = {
    'Bid Item No.': number
    'Bid Item Code': string
    'Standard Item Description': string
    'Quantity': number
    'Pay Unit ': string
    'Unit Price': number|string
    'Total Cost of Bid Item': number|string
    'Project': string
    'Contractor': string
    'Date': number
    'Bid Type': string
    'Total Project Cost': number|string
    'Amount'?: number
    'Comment'?: string
}

export type BidItemPricing = {
    sheetName: string
    data: BidItem[]
}