import type { Anime, AnimeId } from '@lib/modules/anime';
import type { LibraryStatus } from '@lib/modules/library';
export type ScheduleEpisodeId = number;

export type ScheduleFilterStatus = 'all' | 'not-in-library' | LibraryStatus;

export type ScheduledEpisodeReference = {
    id: ScheduleEpisodeId;
    animeId: AnimeId;
    episodeNumber: number;
    airDateTime: Date;
    watchUrl?: string;
    libraryStatus?: LibraryStatus;
};

export type ScheduledEpisodeView = ScheduledEpisodeReference & {
    anime: Anime;
};

export type ScheduleDay = {
    date: Date;
    episodes: ScheduledEpisodeView[];
};

export type ScheduleWeekQuery = {
    date?: Date;
    filterStatus?: ScheduleFilterStatus;
};

export type ScheduleWeekView = {
    startDate: Date;
    endDate: Date;
    days: ScheduleDay[];
    episodeCount: number;
};
