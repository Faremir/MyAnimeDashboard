import type { Anime } from './anime.types';

/**
 * Seed anime records used by AnimeRepository during the mock-data phase.
 */
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
        synopsis: 'After the defeat of the Demon King, an elven mage reflects on time, memory, and human connection.',
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
