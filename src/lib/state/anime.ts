import type { AnimeId } from '@lib/types/anime';
import { writable } from 'svelte/store';

export const selectedAnimeId = writable<AnimeId | null>(null);
