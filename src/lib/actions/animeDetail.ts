import { selectedAnimeId } from '@lib/state/anime';
import type { AnimeId } from '@lib/types/anime';

export const openAnimeDetail = (animeId: AnimeId) => {
    selectedAnimeId.set(animeId);
};

export const closeAnimeDetail = () => {
    selectedAnimeId.set(null);
};
