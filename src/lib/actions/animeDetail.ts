import { selectedAnimeId } from '@lib/stores/anime';

import type { AnimeId } from '@lib/types/anime';

export const openAnimeDetail = (animeId: AnimeId) => {
    selectedAnimeId.set(animeId);
};

export const closeAnimeDetail = () => {
    selectedAnimeId.set(null);
};