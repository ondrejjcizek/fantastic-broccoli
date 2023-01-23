import { writable } from 'svelte/store';
import type { Settings } from '../../global';

import data from '../../seed.json';

export const settings = writable<Settings>();

export const loadSettings = () => {
    settings.set(data.settings);
};
