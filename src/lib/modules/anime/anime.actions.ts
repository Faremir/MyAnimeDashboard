import { selectedAnimeId } from './anime.state';
import type { AnimeId } from './anime.types';

export const openAnimeDetail = (animeId: AnimeId) => {
    selectedAnimeId.set(animeId);
};

export const closeAnimeDetail = () => {
    selectedAnimeId.set(null);
};
