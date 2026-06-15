import { writable } from 'svelte/store';

export const activeSectionId = writable<string>('dashboard');
export const activeChildId = writable<string | null>(null);
