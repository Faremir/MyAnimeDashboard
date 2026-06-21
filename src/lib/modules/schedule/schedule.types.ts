import type { Anime, AnimeId } from '@lib/modules/anime';
import type { LibraryStatus } from '@lib/modules/library';

// Global contracts

/**
 * Stable MAD scheduled episode identifier.
 */
export type EpisodeScheduleId = number;

/**
 * Status filter values supported by the Schedule repository.
 */
export type ScheduleFilterStatus = 'all' | 'not-in-library' | LibraryStatus;

/**
 * Query options accepted by the Schedule repository.
 */
export type WeekScheduleQuery = {
    date?: Date;
    filterStatus?: ScheduleFilterStatus;
};

// Provider-neutral contracts

/**
 * Provider-neutral concrete airing episode before MAD matches it to a local
 * scheduled episode record.
 *
 * AniList can provide exact airing timestamps and episode numbers, but this
 * shape deliberately does not contain MAD-owned ScheduleEpisodeId or AnimeId
 * values yet.
 */
export type EpisodeScheduleMetadata = {
    episodeNumber: number;
    airDateTime: Date;
};

// Local contracts

/**
 * Schedule-owned episode reference.
 *
 * Schedule owns airing and availability references only. User watch state is
 * owned by Library and is added later when the repository builds a view.
 */
export type EpisodeSchedule = EpisodeScheduleMetadata & {
    id: EpisodeScheduleId;
    animeId: AnimeId;
    watchUrl?: string;
};

// UI contracts

/**
 * Scheduled episode hydrated with anime metadata and derived library status.
 *
 * The optional library status is read from LibraryRepository so Schedule views
 * can reflect local watch state without storing that state themselves.
 */
export type EpisodeScheduleView = EpisodeSchedule & {
    anime: Anime;
    libraryStatus?: LibraryStatus;
};

/**
 * Complete week view returned by the Schedule repository.
 */
export type WeekScheduleView = {
    startDate: Date;
    endDate: Date;
    days: DayScheduleView[];
    episodeCount: number;
};

/**
 * One calendar day in a schedule week view.
 */
export type DayScheduleView = {
    date: Date;
    episodes: EpisodeScheduleView[];
};
