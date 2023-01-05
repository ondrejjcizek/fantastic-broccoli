import type { Invoice, LineItem } from 'src/global';

/**
 * Takes all the line items and adds them up
 * @param {Array|undedined} lineItems
 * @returns {number}
 */

export const sumLineItems = (lineItems: LineItem[] | undefined): number => {
    if (!lineItems) return 0;
    return lineItems.reduce((prevValue, curValue) => prevValue + curValue.amount, 0);
};

/**
 * Takes a number and returns the number with 2 decimals places
 * @param {number} myNum
 * @returns {string}
 */

export const twoDecimals = (myNum: number): string => {
    return myNum.toFixed(2);
};

/**
 * Adds a thousands separator
 * @param {string} myNum
 * @returns {string}
 */

export const addThousandsSeparator = (myNum: number): string => {
    return myNum
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        .replace('.', ',');
};

/**
 * Takes all the invoices and finds the total
 * @param {Invoice} invoices
 * @returns {invoice}
 */

export const sumInvoices = (invoices: Invoice[] | undefined): number => {
    if (!invoices) return 0;
    return invoices.reduce((prevValue, curValue) => {
        const invoiceSum = sumLineItems(curValue.lineItems);
        return prevValue + invoiceSum;
    }, 0);
};
