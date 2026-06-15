import type { Anime, AnimeId, RelatedAnime } from '@lib/types/anime';
import type { AnimeLibraryEntry, AnimeLibraryListItem } from '@lib/types/library';

export const mockAnime: Anime[] = [
  {
    id: 1,
    externalIds: {
      malId: 52991,
    },
    title: 'Sousou no Frieren',
    titleEnglish: "Frieren: Beyond Journey's End",
    titleJapanese: '葬送のフリーレン',
    mediaType: 'tv',
    episodes: 28,
    airingStatus: 'finished_airing',
    releaseDate: new Date('2023-09-29'),
    season: 'fall',
    source: 'manga',
    genres: ['Adventure', 'Drama', 'Fantasy'],
    ageRating: 'pg_13',
    coverImage: 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg',
    bannerImage: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg',
    synopsis:
      'After the defeat of the Demon King, an elven mage reflects on time, memory, and human connection.',
    publicScore: 9.3,
    relations: [],
  },
  {
    id: 2,
    externalIds: {
      malId: 37521,
    },
    title: 'Vinland Saga',
    mediaType: 'tv',
    episodes: 24,
    airingStatus: 'finished_airing',
    releaseDate: new Date('2019-07-08'),
    season: 'summer',
    source: 'manga',
    genres: ['Action', 'Adventure', 'Drama'],
    ageRating: 'r_17',
    publicScore: 8.7,
    relations: [
      {
        relationType: 'sequel',
        animeId: 3,
      },
      {
        relationType: 'sequel',
        animeId: 4,
      },
    ],
  },
  {
    id: 3,
    externalIds: {
      malId: 49387,
    },
    title: 'Vinland Saga Season 2',
    mediaType: 'tv',
    episodes: 24,
    airingStatus: 'finished_airing',
    releaseDate: new Date('2023-01-10'),
    season: 'winter',
    source: 'manga',
    genres: ['Action', 'Adventure', 'Drama'],
    ageRating: 'r_17',
    publicScore: 8.8,
    relations: [
      {
        relationType: 'prequel',
        animeId: 2,
      },
      {
        relationType: 'sequel',
        animeId: 4,
      },
    ],
  },
  {
    id: 4,
    externalIds: {
      malId: 49388,
    },
    title: 'Vinland Saga Season 3',
    mediaType: 'tv',
    episodes: 24,
    airingStatus: 'finished_airing',
    releaseDate: new Date('2023-01-10'),
    season: 'winter',
    source: 'manga',
    genres: ['Action', 'Adventure', 'Drama'],
    ageRating: 'r_17',
    publicScore: 8.8,
    relations: [
      {
        relationType: 'prequel',
        animeId: 2,
      },
      {
        relationType: 'prequel',
        animeId: 3,
      },
    ],
  },
];

export const mockLibraryEntries: AnimeLibraryEntry[] = [
  {
    id: 1,
    animeId: 1,
    status: 'watching',
    progress: 12,
    score: 9,
    addedAt: new Date('2026-03-25T12:00:00Z'),
    updatedAt: new Date('2026-05-25T12:00:00Z'),
  },
  {
    id: 2,
    animeId: 4,
    status: 'watching',
    progress: 1,
    score: 10,
    addedAt: new Date('2026-03-15T13:00:00Z'),
    updatedAt: new Date('2026-06-15T13:00:00Z'),
  },
  {
    id: 3,
    animeId: 3,
    status: 'completed',
    progress: 24,
    score: 10,
    addedAt: new Date('2026-05-25T12:00:00Z'),
    updatedAt: new Date('2026-06-15T12:00:00Z'),
  },
];

export const mockLibraryListItems: AnimeLibraryListItem[] = mockLibraryEntries
  .map((entry) => {
    const anime = mockAnime.find((item) => item.id === entry.animeId);

    if (!anime) {
      return null;
    }

    return {
      ...entry,
      anime,
    };
  })
  .filter((entry): entry is AnimeLibraryListItem => entry !== null);

export const findMockAnimeById = (animeId: AnimeId) => {
  return mockAnime.find((anime) => anime.id === animeId);
};

type MockAnimeRelationView = {
  relationType: RelatedAnime['relationType'];
  anime: Anime;
};

export const getMockAnimeRelations = (animeId: AnimeId): MockAnimeRelationView[] => {
  const anime = findMockAnimeById(animeId);

  if (!anime) {
    return [];
  }

  return anime.relations
    .map((relation): MockAnimeRelationView | null => {
      const relatedAnime = findMockAnimeById(relation.animeId);

      if (!relatedAnime) {
        return null;
      }

      return {
        relationType: relation.relationType,
        anime: relatedAnime,
      };
    })
    .filter((relation): relation is MockAnimeRelationView => relation !== null);
};
