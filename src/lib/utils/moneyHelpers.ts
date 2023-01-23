import type { Invoice, LineItem } from '$global';

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
 * Takes the lineItems and discount and determines the invoice total
 * @param {Array|undefined} lineItems
 * @param {number|undefined} discount
 * @returns {number}
 */

export const invoiceTotal = (
    lineItems: LineItem[] | undefined,
    discount: number | undefined
): number => {
    const lineItemsSum = sumLineItems(lineItems);
    if (discount) {
        const invoiceDiscount = lineItemsSum * (discount / 100);
        return lineItemsSum - invoiceDiscount;
    }
    return lineItemsSum;
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
        const invoiceSum = invoiceTotal(curValue.lineItems, curValue.discount);
        return prevValue + invoiceSum;
    }, 0);
};
