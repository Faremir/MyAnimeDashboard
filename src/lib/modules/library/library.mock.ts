import type { LibraryEntry } from './library.types';

/**
 * Seed library records used by LibraryRepository during the mock-data phase.
 */
export const mockLibrary: LibraryEntry[] = [
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
