import { findMockAnimeById, getMockAnimeRelations } from '@lib/mock/library';

import type { Anime, AnimeId, RelatedAnime } from '@lib/types/anime';

export type AnimeRelationView = {
  relationType: RelatedAnime['relationType'];
  anime: Anime;
};

export const animeRepository = {
  findById(animeId: AnimeId): Anime | undefined {
    return findMockAnimeById(animeId);
  },

  getRelations(animeId: AnimeId): AnimeRelationView[] {
    return getMockAnimeRelations(animeId);
  },
};
