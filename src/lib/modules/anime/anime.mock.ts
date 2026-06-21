import type { Anime } from './anime.types';

/**
 * Seed anime records used by AnimeRepository during the mock-data phase.
 */
export const mockAnime: Anime[] = [
    {
        id: 1,
        malReferenceId: 52991,
        anilistReferenceId: 52991,
        title: 'Sousou no Frieren',
        titleEnglish: "Frieren: Beyond Journey's End",
        titleNative: '葬送のフリーレン',
        mediaType: 'tv',
        episodes: 28,
        airingStatus: 'finished',
        releaseDate: new Date('2023-09-29'),
        season: 'fall',
        isAdult: false,
        coverImage: 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg',
        relations: [],
    },
    {
        id: 2,
        malReferenceId: 37521,
        anilistReferenceId: 37521,
        title: 'Vinland Saga',
        mediaType: 'tv',
        episodes: 24,
        airingStatus: 'finished',
        releaseDate: new Date('2019-07-08'),
        season: 'summer',
        isAdult: false,
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
        malReferenceId: 49387,
        anilistReferenceId: 49387,
        title: 'Vinland Saga Season 2',
        mediaType: 'tv',
        episodes: 24,
        airingStatus: 'finished',
        releaseDate: new Date('2023-01-10'),
        season: 'winter',
        isAdult: false,
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
        malReferenceId: 49388,
        anilistReferenceId: 49388,
        title: 'Vinland Saga Season 3',
        mediaType: 'tv',
        episodes: 24,
        airingStatus: 'finished',
        releaseDate: new Date('2023-01-10'),
        season: 'winter',
        isAdult: false,
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
