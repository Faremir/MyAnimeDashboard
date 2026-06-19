import type { ScheduledEpisodeReference } from './schedule.types';

/**
 * Seed schedule records used by ScheduleRepository during the mock-data phase.
 */
export const mockSchedule: ScheduledEpisodeReference[] = [
    {
        id: 1,
        animeId: 1,
        airDateTime: new Date('2026-06-15T18:30:00'),
        episodeNumber: 13,
        watchUrl: 'https://example.com/watch/frieren-13',
    },
    {
        id: 2,
        animeId: 4,
        airDateTime: new Date('2026-06-15T21:00:00'),
        episodeNumber: 2,
    },
    {
        id: 3,
        animeId: 2,
        airDateTime: new Date('2026-06-16T19:00:00'),
        episodeNumber: 1,
        watchUrl: 'https://example.com/watch/vinland-saga-1',
    },
    {
        id: 4,
        animeId: 3,
        airDateTime: new Date('2026-06-17T20:15:00'),
        episodeNumber: 25,
        watchUrl: 'https://example.com/watch/vinland-saga-s2-25',
    },
    {
        id: 5,
        animeId: 1,
        airDateTime: new Date('2026-06-19T18:30:00'),
        episodeNumber: 14,
        watchUrl: 'https://example.com/watch/frieren-14',
    },
    {
        id: 6,
        animeId: 4,
        airDateTime: new Date('2026-06-20T21:00:00'),
        episodeNumber: 3,
    },
    {
        id: 7,
        animeId: 2,
        airDateTime: new Date('2026-06-21T17:45:00'),
        episodeNumber: 2,
    },

    // Previous week sample data. This proves week navigation works.
    {
        id: 8,
        animeId: 1,
        airDateTime: new Date('2026-06-08T18:30:00'),
        episodeNumber: 12,
        watchUrl: 'https://example.com/watch/frieren-12',
    },
    {
        id: 9,
        animeId: 4,
        airDateTime: new Date('2026-06-10T21:00:00'),
        episodeNumber: 1,
    },

    // Next week sample data. This proves week navigation works.
    {
        id: 10,
        animeId: 1,
        airDateTime: new Date('2026-06-22T18:30:00'),
        episodeNumber: 15,
        watchUrl: 'https://example.com/watch/frieren-15',
    },
    {
        id: 11,
        animeId: 2,
        airDateTime: new Date('2026-06-24T19:00:00'),
        episodeNumber: 3,
    },
];
