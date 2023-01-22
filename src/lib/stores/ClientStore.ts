import { writable } from 'svelte/store';
import { ClientStatus } from '../../enums';
import type { Client } from '../../global';
import data from '../../seed.json';

export const clients = writable<Client[]>([]);

export const loadClients = () => {
    clients.set(data.clients as Client[]);
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
