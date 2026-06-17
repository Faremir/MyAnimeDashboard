import { writable } from 'svelte/store';

import type { AnimeId } from './anime.types';

export const selectedAnimeId = writable<AnimeId | null>(null);
