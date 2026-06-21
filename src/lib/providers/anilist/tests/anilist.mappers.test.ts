import { describe, expect, it } from 'vitest';

import { mapAnilistAiringSchedule, mapAnilistAnimeMetadata, mapAnilistAnimeRelationMetadata } from '../anilist.mappers';
import type { AnilistAnime, AnilistAnimeRelation, AnilistEpisodeAiringSchedule } from '../anilist.types';

const createAnilistAnime = (overrides: Partial<AnilistAnime> = {}): AnilistAnime => {
    return {
        id: 163077,
        idMal: 54835,
        title: {
            romaji: 'Kono Sekai wa Fukanzen Sugiru',
            english: 'Quality Assurance in Another World',
            native: 'Native title',
        },
        synonyms: ['KonoFuka', null, 'Konofuka alt'],
        format: 'TV',
        status: 'FINISHED',
        episodes: 13,
        startDate: {
            year: 2024,
            month: 7,
            day: 6,
        },
        season: 'SUMMER',
        isAdult: false,
        coverImage: {
            extraLarge: 'https://img.example/extra.jpg',
            large: 'https://img.example/large.jpg',
            medium: 'https://img.example/medium.jpg',
        },
        relations: {
            edges: [],
        },
        ...overrides,
    };
};

describe('mapAnilistAnimeMetadata', () => {
    it('maps AniList anime metadata into MAD anime metadata', () => {
        const media: AnilistAnime = {
            id: 163077,
            idMal: 54835,
            title: {
                romaji: 'Kono Sekai wa Fukanzen Sugiru',
                english: 'Quality Assurance in Another World',
                native: 'この世界は不完全すぎる',
            },
            synonyms: ['KonoFuka', null, 'このふか'],
            format: 'TV',
            status: 'FINISHED',
            episodes: 13,
            startDate: {
                year: 2024,
                month: 7,
                day: 6,
            },
            season: 'SUMMER',
            isAdult: false,
            coverImage: {
                extraLarge: 'https://img.example/extra.jpg',
                large: 'https://img.example/large.jpg',
                medium: 'https://img.example/medium.jpg',
            },
            relations: {
                edges: [],
            },
        };

        const result = mapAnilistAnimeMetadata(media);

        expect(result.value).toEqual({
            anilistReferenceId: 163077,
            malReferenceId: 54835,
            title: 'Kono Sekai wa Fukanzen Sugiru',
            titleEnglish: 'Quality Assurance in Another World',
            titleNative: 'この世界は不完全すぎる',
            synonyms: ['KonoFuka', 'このふか'],
            mediaType: 'tv',
            episodes: 13,
            airingStatus: 'finished',
            releaseDate: new Date(2024, 6, 6),
            season: 'summer',
            isAdult: false,
            coverImage: 'https://img.example/extra.jpg',
        });

        expect(result.externalIdentities).toEqual([
            {
                sourceId: 'anilist',
                entityKind: 'anime',
                value: '163077',
            },
            {
                sourceId: 'myanimelist',
                entityKind: 'anime',
                value: '54835',
            },
        ]);
    });
    it('omits optional metadata when AniList values are missing', () => {
        const media = createAnilistAnime({
            id: 1,
            idMal: null,
            title: {
                romaji: null,
                english: 'English fallback',
                native: 'Native fallback',
            },
            synonyms: null,
            episodes: null,
            startDate: {
                year: 2024,
                month: null,
                day: 6,
            },
            season: null,
            isAdult: null,
            coverImage: {
                extraLarge: null,
                large: null,
                medium: 'https://img.example/medium.jpg',
            },
        });

        const result = mapAnilistAnimeMetadata(media);

        expect(result.value.title).toBe('English fallback');
        expect(result.value.malReferenceId).toBeUndefined();
        expect(result.value.synonyms).toBeUndefined();
        expect(result.value.episodes).toBeUndefined();
        expect(result.value.releaseDate).toBeUndefined();
        expect(result.value.season).toBeUndefined();
        expect(result.value.isAdult).toBe(false);
        expect(result.value.coverImage).toBe('https://img.example/medium.jpg');

        expect(result.externalIdentities).toEqual([
            {
                sourceId: 'anilist',
                entityKind: 'anime',
                value: '1',
            },
        ]);
    });
    it('maps unknown AniList enum values to safe MAD fallback values', () => {
        const media = createAnilistAnime({
            title: null,
            format: 'MANGA',
            status: null,
            season: null,
        });

        const result = mapAnilistAnimeMetadata(media);

        expect(result.value.title).toBe('Untitled anime');
        expect(result.value.mediaType).toBe('unknown');
        expect(result.value.airingStatus).toBe('unknown');
        expect(result.value.season).toBeUndefined();
    });
    it('falls back to native anime title when romaji and english titles are missing', () => {
        const result = mapAnilistAnimeMetadata(
            createAnilistAnime({
                title: {
                    romaji: null,
                    english: null,
                    native: 'Native fallback title',
                },
            }),
        );

        expect(result.value.title).toBe('Native fallback title');
    });
    it.each([
        [
            {
                extraLarge: null,
                large: 'https://img.example/large.jpg',
                medium: 'https://img.example/medium.jpg',
            },
            'https://img.example/large.jpg',
        ],
        [
            {
                extraLarge: null,
                large: null,
                medium: null,
            },
            undefined,
        ],
        [null, undefined],
    ] as const)('maps AniList cover image fallback to %s', (coverImage, expectedCoverImage) => {
        const result = mapAnilistAnimeMetadata(
            createAnilistAnime({
                coverImage,
            }),
        );

        expect(result.value.coverImage).toBe(expectedCoverImage);
    });
    it.each([
        ['SPRING', 'spring'],
        ['SUMMER', 'summer'],
        ['FALL', 'fall'],
        ['WINTER', 'winter'],
        [null, undefined],
    ] as const)('maps AniList season %s to MAD season %s', (season, expectedSeason) => {
        const result = mapAnilistAnimeMetadata(
            createAnilistAnime({
                season,
            }),
        );

        expect(result.value.season).toBe(expectedSeason);
    });
    it.each([
        ['TV', 'tv'],
        ['TV_SHORT', 'tv'],
        ['MOVIE', 'movie'],
        ['OVA', 'ova'],
        ['ONA', 'ona'],
        ['SPECIAL', 'special'],
        ['MUSIC', 'music'],
        ['MANGA', 'unknown'],
        [null, 'unknown'],
    ] as const)('maps AniList format %s to MAD media type %s', (format, mediaType) => {
        const result = mapAnilistAnimeMetadata(
            createAnilistAnime({
                format,
            }),
        );

        expect(result.value.mediaType).toBe(mediaType);
    });
    it.each([
        ['FINISHED', 'finished'],
        ['RELEASING', 'releasing'],
        ['NOT_YET_RELEASED', 'not_yet_released'],
        ['CANCELLED', 'cancelled'],
        ['HIATUS', 'paused'],
        [null, 'unknown'],
    ] as const)('maps AniList status %s to MAD airing status %s', (status, airingStatus) => {
        const result = mapAnilistAnimeMetadata(
            createAnilistAnime({
                status,
            }),
        );

        expect(result.value.airingStatus).toBe(airingStatus);
    });
    it.each([
        ['PREQUEL', 'prequel'],
        ['SEQUEL', 'sequel'],
        ['PARENT', 'parent_story'],
        ['SIDE_STORY', 'side_story'],
        ['SUMMARY', 'summary'],
        ['ALTERNATIVE', 'alternative_version'],
        ['SPIN_OFF', 'spin_off'],
        ['ADAPTATION', 'adaptation'],
        ['CHARACTER', 'character'],
        ['OTHER', 'other'],
        [null, 'other'],
    ] as const)('maps AniList relation type %s to MAD relation type %s', (relationType, expectedRelationType) => {
        const edges: AnilistAnimeRelation[] = [
            {
                relationType,
                node: {
                    id: 200,
                    idMal: 300,
                    type: 'ANIME',
                    title: {
                        romaji: 'Related Anime',
                        english: null,
                        native: null,
                    },
                    synonyms: null,
                    format: 'TV',
                    status: 'FINISHED',
                    episodes: null,
                    season: null,
                    isAdult: false,
                    startDate: null,
                    coverImage: null,
                },
            },
        ];

        const result = mapAnilistAnimeRelationMetadata(edges);

        expect(result[0]?.value.relationType).toBe(expectedRelationType);
    });
});
describe('mapAnilistAnimeRelationMetadata', () => {
    it('maps anime relation edges and ignores non-anime or empty edges', () => {
        const edges: AnilistAnimeRelation[] = [
            {
                relationType: 'SEQUEL',
                node: {
                    id: 200,
                    idMal: null,
                    type: 'ANIME',
                    title: {
                        romaji: null,
                        english: 'Next Season',
                        native: null,
                    },
                    synonyms: null,
                    format: 'TV',
                    status: 'RELEASING',
                    episodes: null,
                    season: null,
                    isAdult: false,
                    startDate: null,
                    coverImage: null,
                },
            },
            {
                relationType: 'ADAPTATION',
                node: {
                    id: 300,
                    idMal: null,
                    type: 'MANGA',
                    title: {
                        romaji: 'Source Manga',
                        english: null,
                        native: null,
                    },
                    synonyms: null,
                    format: 'MANGA',
                    status: 'FINISHED',
                    episodes: null,
                    season: null,
                    isAdult: false,
                    startDate: null,
                    coverImage: null,
                },
            },
            null,
        ];

        const result = mapAnilistAnimeRelationMetadata(edges);

        expect(result).toEqual([
            {
                value: {
                    relationType: 'sequel',
                    title: 'Next Season',
                },
                externalIdentities: [
                    {
                        sourceId: 'anilist',
                        entityKind: 'anime',
                        value: '200',
                    },
                ],
            },
        ]);
    });
    it('falls back to native relation title when romaji and english titles are missing', () => {
        const edges: AnilistAnimeRelation[] = [
            {
                relationType: 'SEQUEL',
                node: {
                    id: 200,
                    idMal: null,
                    type: 'ANIME',
                    title: {
                        romaji: null,
                        english: null,
                        native: 'Native relation title',
                    },
                    synonyms: null,
                    format: 'TV',
                    status: 'FINISHED',
                    episodes: null,
                    season: null,
                    isAdult: false,
                    startDate: null,
                    coverImage: null,
                },
            },
        ];

        const result = mapAnilistAnimeRelationMetadata(edges);

        expect(result[0]?.value.title).toBe('Native relation title');
    });
    it('omits relation title when AniList relation title is missing', () => {
        const edges: AnilistAnimeRelation[] = [
            {
                relationType: 'SEQUEL',
                node: {
                    id: 200,
                    idMal: null,
                    type: 'ANIME',
                    title: null,
                    synonyms: null,
                    format: 'TV',
                    status: 'FINISHED',
                    episodes: null,
                    season: null,
                    isAdult: false,
                    startDate: null,
                    coverImage: null,
                },
            },
        ];

        const result = mapAnilistAnimeRelationMetadata(edges);

        expect(result[0]?.value.title).toBeUndefined();
    });
});
describe('mapAnilistAiringSchedule', () => {
    it('maps AniList airing schedule nodes into episode schedule metadata', () => {
        const node: AnilistEpisodeAiringSchedule = {
            id: 382766,
            airingAt: 1720200180,
            episode: 1,
            media: {
                id: 163077,
                idMal: 54835,
                title: null,
                synonyms: null,
                format: 'TV',
                status: 'RELEASING',
                episodes: 13,
                season: 'SUMMER',
                isAdult: false,
                startDate: null,
                coverImage: null,
            },
        };

        const result = mapAnilistAiringSchedule(node);

        expect(result.value).toEqual({
            episodeNumber: 1,
            airDateTime: new Date(1720200180 * 1000),
        });

        expect(result.externalIdentities).toEqual([
            {
                sourceId: 'anilist',
                entityKind: 'schedule-airing',
                value: '382766',
            },
            {
                sourceId: 'anilist',
                entityKind: 'anime',
                value: '163077',
            },
            {
                sourceId: 'myanimelist',
                entityKind: 'anime',
                value: '54835',
            },
        ]);
    });
    it('maps airing schedule identity even when nested media is missing', () => {
        const node: AnilistEpisodeAiringSchedule = {
            id: 382766,
            airingAt: 1720200180,
            episode: 1,
            media: null,
        };

        const result = mapAnilistAiringSchedule(node);

        expect(result.value).toEqual({
            episodeNumber: 1,
            airDateTime: new Date(1720200180 * 1000),
        });

        expect(result.externalIdentities).toEqual([
            {
                sourceId: 'anilist',
                entityKind: 'schedule-airing',
                value: '382766',
            },
        ]);
    });
});
