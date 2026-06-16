import { mockAnime } from '@lib/mock/library';
import type { Anime } from '@lib/types/anime';
import type { LibraryStatus } from '@lib/types/library';
import type { ScheduledEpisode } from '@lib/types/schedule';

type MockScheduledEpisodeSeed = {
    id: number;
    animeId: number;
    airDateTime: string;
    episodeNumber: number;
    watchUrl?: string;
    libraryStatus?: LibraryStatus;
};

const mockScheduledEpisodeSeeds: MockScheduledEpisodeSeed[] = [
    {
        id: 1,
        animeId: 1,
        airDateTime: '2026-06-15T18:30:00',
        episodeNumber: 13,
        watchUrl: 'https://example.com/watch/frieren-13',
        libraryStatus: 'watching',
    },
    {
        id: 2,
        animeId: 4,
        airDateTime: '2026-06-15T21:00:00',
        episodeNumber: 2,
        libraryStatus: 'watching',
    },
    {
        id: 3,
        animeId: 2,
        airDateTime: '2026-06-16T19:00:00',
        episodeNumber: 1,
        watchUrl: 'https://example.com/watch/vinland-saga-1',
    },
    {
        id: 4,
        animeId: 3,
        airDateTime: '2026-06-17T20:15:00',
        episodeNumber: 25,
        watchUrl: 'https://example.com/watch/vinland-saga-s2-25',
        libraryStatus: 'completed',
    },
    {
        id: 5,
        animeId: 1,
        airDateTime: '2026-06-19T18:30:00',
        episodeNumber: 14,
        watchUrl: 'https://example.com/watch/frieren-14',
        libraryStatus: 'paused',
    },
    {
        id: 6,
        animeId: 4,
        airDateTime: '2026-06-20T21:00:00',
        episodeNumber: 3,
        libraryStatus: 'dropped',
    },
    {
        id: 7,
        animeId: 2,
        airDateTime: '2026-06-21T17:45:00',
        episodeNumber: 2,
        libraryStatus: 'planned',
    },

    // Previous week sample data. This proves week navigation works.
    {
        id: 8,
        animeId: 1,
        airDateTime: '2026-06-08T18:30:00',
        episodeNumber: 12,
        watchUrl: 'https://example.com/watch/frieren-12',
        libraryStatus: 'watching',
    },
    {
        id: 9,
        animeId: 4,
        airDateTime: '2026-06-10T21:00:00',
        episodeNumber: 1,
        libraryStatus: 'planned',
    },

    // Next week sample data. This proves week navigation works.
    {
        id: 10,
        animeId: 1,
        airDateTime: '2026-06-22T18:30:00',
        episodeNumber: 15,
        watchUrl: 'https://example.com/watch/frieren-15',
        libraryStatus: 'watching',
    },
    {
        id: 11,
        animeId: 2,
        airDateTime: '2026-06-24T19:00:00',
        episodeNumber: 3,
        libraryStatus: 'planned',
    },
];

const getMockAnime = (animeId: number): Anime => {
    const anime = mockAnime.find((item) => item.id === animeId);

    if (!anime) {
        throw new Error(`Mock anime with id ${animeId} was not found.`);
    }

    return anime;
};

export const mockScheduledEpisodes: ScheduledEpisode[] = mockScheduledEpisodeSeeds.map((seed) => ({
    id: seed.id,
    anime: getMockAnime(seed.animeId),
    episodeNumber: seed.episodeNumber,
    airDateTime: new Date(seed.airDateTime),
    watchUrl: seed.watchUrl,
    libraryStatus: seed.libraryStatus,
}));
