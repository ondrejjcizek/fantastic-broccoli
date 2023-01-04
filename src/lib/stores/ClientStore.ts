import { writable } from 'svelte/store';
import type { Client } from 'src/global';
import data from '../../seed.json';

export const clients = writable<Client[]>([]);

export const loadClients = () => {
  clients.set(data.clients);
};
