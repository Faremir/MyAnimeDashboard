import type { Anime } from '@lib/types/anime';
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
        releaseDate: '2023-09-29',
        season: 'fall',
        source: 'manga',
        genres: ['Adventure', 'Drama', 'Fantasy'],
        ageRating: 'pg_13',
        coverImage: undefined,
        bannerImage: undefined,
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
        releaseDate: '2019-07-08',
        season: 'summer',
        source: 'manga',
        genres: ['Action', 'Adventure', 'Drama'],
        ageRating: 'r_17',
        publicScore: 8.7,
        relations: [],
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
        releaseDate: '2023-01-10',
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
    },
    {
        id: 2,
        animeId: 3,
        status: 'completed',
        progress: 24,
        score: 10,
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