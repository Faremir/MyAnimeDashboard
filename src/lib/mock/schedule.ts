import { mockAnime } from '@lib/mock/library';
import type { ScheduledEpisode } from '@lib/types/schedule';

const getMockAnime = (animeId: number) => {
    const anime = mockAnime.find((item) => item.id === animeId);

    if (!anime) {
        throw new Error(`Mock anime with id ${animeId} was not found.`);
    }

    return anime;
};

export const mockScheduledEpisodes: ScheduledEpisode[] = [
    {
        id: 1,
        anime: getMockAnime(1),
        episodeNumber: 13,
        airDateTime: new Date('2026-06-15T18:30:00'),
        watchUrl: 'https://example.com/watch/frieren-13',
        libraryStatus: 'watching',
    },
    {
        id: 2,
        anime: getMockAnime(4),
        episodeNumber: 2,
        airDateTime: new Date('2026-06-15T21:00:00'),
        libraryStatus: 'watching',
    },
    {
        id: 3,
        anime: getMockAnime(2),
        episodeNumber: 1,
        airDateTime: new Date('2026-06-16T19:00:00'),
        watchUrl: 'https://example.com/watch/vinland-saga-1',
        libraryStatus: 'planned',
    },
    {
        id: 4,
        anime: getMockAnime(3),
        episodeNumber: 25,
        airDateTime: new Date('2026-06-17T20:15:00'),
        libraryStatus: 'completed',
    },
    {
        id: 5,
        anime: getMockAnime(1),
        episodeNumber: 14,
        airDateTime: new Date('2026-06-19T18:30:00'),
        watchUrl: 'https://example.com/watch/frieren-14',
        libraryStatus: 'paused',
    },
    {
        id: 6,
        anime: getMockAnime(4),
        episodeNumber: 3,
        airDateTime: new Date('2026-06-20T21:00:00'),
        libraryStatus: 'dropped',
    },
];
