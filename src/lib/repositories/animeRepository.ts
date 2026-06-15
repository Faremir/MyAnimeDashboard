import { findMockAnimeById, getMockAnimeRelations } from '@lib/mock/library';
import type { Anime, AnimeId, AnimeRelationView } from '@lib/types/anime';

export const animeRepository = {
    findById(animeId: AnimeId): Anime | undefined {
        return findMockAnimeById(animeId);
    },

    getRelations(animeId: AnimeId): AnimeRelationView[] {
        return getMockAnimeRelations(animeId);
    },
};
