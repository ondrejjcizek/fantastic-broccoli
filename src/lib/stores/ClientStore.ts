import supabase from '$utils/supabase';
import { writable } from 'svelte/store';
import { ClientStatus } from '../../enums';
import type { Client, Error } from '$global';
import { displayErrorMessage } from '$utils/handleError';
import { snackbar } from '$lib/stores/SnackbarStore';
import { deleteClientInvoices } from './InvoiceStore';

export const clients = writable<Client[]>([]);

export const loadClients = async () => {
    const { data, error } = await supabase
        .from('client')
        .select('*, invoice(id, invoiceStatus, lineItems(*))');

    if (error) {
        console.error(error);
        return;
    }

    clients.set(data as Client[]);
};
// null value in column "userId" of relation "client" violates not-null constraint
export const addClient = async (clientToAdd: Client) => {
    const { data, error } = await supabase
        .from('client')
        .insert([{ ...clientToAdd, clientStatus: ClientStatus.active }])
        .select();

    if (error) {
        displayErrorMessage(error as Error);
        return;
    }

    const id = data[0].id;

    snackbar.send({
        message: 'Nový klient byl úspěšně vytvořen',
        type: 'success'
    });

    clients.update((prev: Client[]) => [
        ...prev,
        { ...clientToAdd, clientStatus: ClientStatus.active, id: id }
    ]);
    return { ...clientToAdd, id: id };
};

export const updateClient = async (clientToUpdate: Client) => {
    const { invoice, ...newClient } = clientToUpdate;

    const { data, error } = await supabase.from('client').update(newClient).eq('id', newClient.id);

    if (error) {
        displayErrorMessage(error as Error);
        return;
    }

    clients.update((prev) =>
        prev.map((cur: Client) => (cur.id === clientToUpdate.id ? clientToUpdate : cur))
    );
    return clientToUpdate;
};

export const getClientById = async (id: string) => {
    const { data, error } = await supabase
        .from('client')
        .select(
            '*, invoice(id, invoiceStatus, invoiceNumber, dueDate, client(id, name), lineItems(*))'
        )
        .eq('id', id);

    if (error) {
        console.error(error);
        return;
    }
    if (data && data[0]) return data[0] as Client;

    console.warn('We cannot find a client');
};

export const deleteClient = async (clientToDelete: Client) => {
    // delete the associated invoices in Supabase
    const isSuccessful = await deleteClientInvoices(clientToDelete.id);
    if (!isSuccessful) return;

    // delete the client within Supabase
    const { error } = await supabase.from('client').delete().eq('id', clientToDelete.id);

    if (error) {
        displayErrorMessage(error as Error);
        return;
    }

    // update the store
    clients.update((prev: Client[]) => prev.filter((cur: Client) => cur.id !== clientToDelete.id));

    // display a success message
    snackbar.send({
        message: 'Klient byl úspěšně vymazán',
        type: 'success'
    });

    return;
};
