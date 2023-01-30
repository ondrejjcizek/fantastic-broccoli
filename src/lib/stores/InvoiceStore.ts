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

    const isSuccessful = await addLineItems(lineItems, invoiceId);
    if (!isSuccessful) return;

    // update the store
    invoices.update((prev: Invoice[]) => [...prev, { ...invoiceToAdd, id: invoiceId }]);

    snackbar.send({ message: 'Vaše faktura byla úspéšně vytvořena', type: 'success' });

    return invoiceToAdd;
};

const addLineItems = async (
    lineItems: LineItem[] | undefined,
    invoiceId: string
): Promise<boolean> => {
    let isSuccessful = true;

    // loop over all the lineItem and add the invoice ID
    if (lineItems && lineItems.length > 0) {
        const newLineItems = lineItems.map((lineItem: LineItem) => ({
            ...lineItem,
            invoiceId
        }));

        // add the lineItems to Supabase
        const lineItemsResult = await supabase.from('lineItems').insert(newLineItems);

        if (lineItemsResult.error) {
            console.log('updatovani');
            displayErrorMessage(lineItemsResult.error as Error);
            isSuccessful = false;
        }
    }

    return isSuccessful;
};

const deleteLineItems = async (invoiceId: string): Promise<boolean> => {
    let isSuccessful = true;

    const { data, error } = await supabase.from('lineItems').delete().eq('invoiceId', invoiceId);

    if (error) {
        console.log('mazani');
        displayErrorMessage(error as Error);
        isSuccessful = false;
    }

    return isSuccessful;
};

export const updateInvoice = async (invoiceToUpdate: Invoice) => {
    const { lineItems, client, ...updatedInvoice } = invoiceToUpdate;

    // delete all line items
    let isSuccessful = await deleteLineItems(invoiceToUpdate.id);
    if (!isSuccessful) return;

    // add new line items
    isSuccessful = await addLineItems(lineItems, invoiceToUpdate.id);
    if (!isSuccessful) return;

    // update the invoice within supabase
    const { data, error } = await supabase
        .from('invoice')
        .update({ ...updatedInvoice, clientId: client.id })
        .eq('id', updatedInvoice.id);

    if (error) {
        displayErrorMessage(error as Error);
        return;
    }

    // update the store
    invoices.update((prev: Invoice[]) =>
        prev.map((cur: Invoice) => (cur.id === invoiceToUpdate.id ? invoiceToUpdate : cur))
    );

    // display a success message
    snackbar.send({ message: 'Vaše faktura byla úspěšně upravena', type: 'success' });

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
