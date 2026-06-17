import { writable } from 'svelte/store';

import type { NavigationItemId, NavigationSectionId } from './navigation.types';

export const activeSectionId = writable<NavigationSectionId>('dashboard');
export const activeChildId = writable<NavigationItemId | null>(null);
