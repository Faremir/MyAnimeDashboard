import type { Anime, AnimeId } from '@lib/modules/anime';
import type { LibraryStatus } from '@lib/modules/library';

/**
 * Stable MAD scheduled episode identifier.
 */
export type ScheduleEpisodeId = number;

/**
 * Status filter values supported by the Schedule repository.
 */
export type ScheduleFilterStatus = 'all' | 'not-in-library' | LibraryStatus;

/**
 * Schedule-owned episode reference.
 *
 * Schedule owns airing and availability references only. User watch state is
 * owned by Library and is added later when the repository builds a view.
 */
export type ScheduledEpisodeReference = {
    id: ScheduleEpisodeId;
    animeId: AnimeId;
    episodeNumber: number;
    airDateTime: Date;
    watchUrl?: string;
};

/**
 * Scheduled episode hydrated with anime metadata and derived library status.
 *
 * The optional library status is read from LibraryRepository so Schedule views
 * can reflect local watch state without storing that state themselves.
 */
export type ScheduledEpisodeView = ScheduledEpisodeReference & {
    anime: Anime;
    libraryStatus?: LibraryStatus;
};

/**
 * One calendar day in a schedule week view.
 */
export type ScheduleDay = {
    date: Date;
    episodes: ScheduledEpisodeView[];
};

/**
 * Query options accepted by the Schedule repository.
 */
export type ScheduleWeekQuery = {
    date?: Date;
    filterStatus?: ScheduleFilterStatus;
};

/**
 * Complete week view returned by the Schedule repository.
 */
export type ScheduleWeekView = {
    startDate: Date;
    endDate: Date;
    days: ScheduleDay[];
    episodeCount: number;
};
