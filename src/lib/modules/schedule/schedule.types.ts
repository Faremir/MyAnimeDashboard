import type { Anime, AnimeId } from '@lib/modules/anime';
import type { LibraryStatus, WatchStateAction } from '@lib/modules/library';

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

export type ScheduleWatchStateHandler = (episode: ScheduledEpisodeView, action: WatchStateAction) => void;
