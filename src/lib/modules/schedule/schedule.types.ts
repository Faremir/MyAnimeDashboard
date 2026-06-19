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
 * The current libraryStatus field is temporary preview data. The next ownership
 * refactor should derive that status from Library instead of storing it here.
 */
export type ScheduledEpisodeReference = {
    id: ScheduleEpisodeId;
    animeId: AnimeId;
    episodeNumber: number;
    airDateTime: Date;
    watchUrl?: string;
    libraryStatus?: LibraryStatus;
};

/**
 * Scheduled episode hydrated with anime metadata for rendering.
 */
export type ScheduledEpisodeView = ScheduledEpisodeReference & {
    anime: Anime;
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
