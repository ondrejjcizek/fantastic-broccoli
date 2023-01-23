import supabase from '$utils/supabase';
import { writable } from 'svelte/store';
import { ClientStatus } from '../../enums';
import type { Client } from '../../global';
import data from '../../seed.json';

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

export const addClient = (clientToAdd: Client) => {
    clients.update((prev: Client[]) => [
        ...prev,
        { ...clientToAdd, clientStatus: ClientStatus.active }
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
