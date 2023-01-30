import type { Invoice, Error, LineItem } from '$global';
import { writable } from 'svelte/store';
import supabase from '$utils/supabase';
import { displayErrorMessage } from '$utils/handleError';
import { snackbar } from '$lib/stores/SnackbarStore';

export const invoices = writable<Invoice[]>([]);

export const loadInvoices = async () => {
    const { data, error } = await supabase
        .from('invoice')
        .select('*, client(id, name), lineItems(*)');
    if (error) {
        console.error(error);
        return;
    }
    invoices.set(data as Invoice[]);
};

export const addInvoice = async (invoiceToAdd: Invoice) => {
    const { lineItems, client, ...newInvoice } = invoiceToAdd;
    // add the invoice to Supabase
    const invoiceResults = await supabase
        .from('invoice')
        .insert([{ ...newInvoice, clientId: client.id }])
        .select();

    if (invoiceResults.error) {
        displayErrorMessage(invoiceResults.error as Error);
        return;
    }

    // get the invoice ID
    const invoiceId = invoiceResults.data[0].id;

    // loop over all the lineItem and add the invoice ID
    if (lineItems && lineItems.length > 0) {
        const newLineItems = lineItems.map((lineItem: LineItem) => ({
            ...lineItem,
            invoiceId
        }));

        // add the lineItems to Supabase
        const lineItemsResult = await supabase.from('lineItems').insert(newLineItems);

        if (lineItemsResult.error) {
            displayErrorMessage(lineItemsResult.error as Error);
            return;
        }
    }

    // update the store
    invoices.update((prev: Invoice[]) => [...prev, { ...invoiceToAdd, id: invoiceId }]);
    snackbar.send({ message: 'Vaše faktura byla úspéšně vytvořena', type: 'success' });
    return invoiceToAdd;
};

export const updateInvoice = (invoiceToUpdate: Invoice) => {
    invoices.update((prev: Invoice[]) =>
        prev.map((cur: Invoice) => (cur.id === invoiceToUpdate.id ? invoiceToUpdate : cur))
    );
    return invoiceToUpdate;
};

export const deleteInvoice = (invoiceToDelete: Invoice) => {
    invoices.update((prev: Invoice[]) =>
        prev.filter((cur: Invoice) => cur.id !== invoiceToDelete.id)
    );
    return invoiceToDelete;
};

export const getInvoiceById = async (id: string) => {
    const { data, error } = await supabase
        .from('invoice')
        .select('*, client(id, name), lineItems(*)')
        .eq('id', id);

    if (error) {
        console.error(error);
        return;
    }
    if (data && data[0]) return data[0] as Invoice;
    console.warn('cannot find invoice with id' + id);
};
