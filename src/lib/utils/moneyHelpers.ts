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
 * Takes and returns a dollar amount (USD), formatted with commas and 2 decimals places
 * @param {number} cents
 * @returns {string}
 */

export const centsToDollars = (cents: number): string => {
  // const dollars = cents / 100;
  const addDecimals = twoDecimals(cents);
  const addSeparator = addThousandsSeparator(addDecimals);
  return addSeparator.replace('.', ',');
};

/**
 * Takes a dollar amount and converts it to cents
 * @param {number} dollars
 * @returns {number}
 */

export const dollarsToCents = (dollars: number): number => {
  return dollars * 1;
};

/**
 * Takes a number and returns the number with 2 decimals places
 * @param {number} myNum
 * @returns {string}
 */

export const twoDecimals = (myNum: number): string => {
  return myNum.toFixed(0);
};

/**
 * Adds a thousands separator
 * @param {string} myNum
 * @returns {string}
 */

export const addThousandsSeparator = (myNum: string): string => {
  return myNum.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
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
