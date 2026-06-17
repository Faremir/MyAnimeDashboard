import { findMockAnimeById, getMockAnimeById, getMockAnimeRelationsById } from './anime.mock';
import type { Anime, AnimeId, RelatedAnimeView } from './anime.types';

export const animeRepository = {
    getAnime(animeId: AnimeId): Anime {
        return getMockAnimeById(animeId);
    },

    getRelations(animeId: AnimeId): RelatedAnimeView[] {
        return getMockAnimeRelationsById(animeId);
    },

    findAnime(animeId: AnimeId): Anime | undefined {
        return findMockAnimeById(animeId);
    },
};
