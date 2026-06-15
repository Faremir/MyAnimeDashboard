import type { Anime } from './anime';
import type { LibraryStatus, WatchStateAction } from './library';

export type ScheduleEpisodeId = number;

export type ScheduledEpisode = {
    id: ScheduleEpisodeId;
    anime: Anime;
    episodeNumber: number;
    airDateTime: Date;
    watchUrl?: string;
    libraryStatus?: LibraryStatus;
};

export type ScheduleDay = {
    date: Date;
    episodes: ScheduledEpisode[];
};

export type ScheduleWatchStateHandler = (episode: ScheduledEpisode, action: WatchStateAction) => void;
