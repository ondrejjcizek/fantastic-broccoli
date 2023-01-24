import supabase from '$utils/supabase';
import { writable } from 'svelte/store';
import { ClientStatus } from '../../enums';
import type { Client } from '$global';
import { snackbar } from '$stores/SnackbarStore';

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
        console.log(data);
        console.error(error);
        snackbar.send({ message: error.message, type: 'error' });
        return;
    }

    const id = data[0].id;

    clients.update((prev: Client[]) => [
        ...prev,
        { ...clientToAdd, clientStatus: ClientStatus.active, id: id }
    ]);
    return clientToAdd;
};

export const updateClient = (clientToUpdate: Client) => {
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
