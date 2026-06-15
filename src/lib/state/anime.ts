import {writable} from 'svelte/store';

import type {AnimeId} from '@lib/types/anime';

export const selectedAnimeId = writable<AnimeId | null>(null);