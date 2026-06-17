import { animeRepository } from '@lib/modules/anime';
import type { WeekStartDay } from '@lib/shared/utils/date';
import { addDays, addWeeks, daysInWeek, getWeekStart, isDateInRange, isSameDay } from '@lib/shared/utils/date';

import { mockScheduledEpisodes } from './schedule.mock';
import type {
    ScheduleDay,
    ScheduledEpisodeReference,
    ScheduledEpisodeView,
    ScheduleFilterStatus,
} from './schedule.types';

const hydrateScheduledEpisode = (episode: ScheduledEpisodeReference): ScheduledEpisodeView => {
    return {
        ...episode,
        anime: animeRepository.getAnime(episode.animeId),
    };
};

const sortEpisodesByAirTime = (episodes: ScheduledEpisodeView[]): ScheduledEpisodeView[] => {
    return [...episodes].sort((left, right) => left.airDateTime.getTime() - right.airDateTime.getTime());
};

const matchesFilter = (episode: ScheduledEpisodeReference, filterStatus: ScheduleFilterStatus): boolean => {
    if (filterStatus === 'all') {
        return true;
    }

    if (filterStatus === 'not-in-library') {
        return episode.libraryStatus === undefined;
    }

    return episode.libraryStatus === filterStatus;
};

const createScheduleDays = (weekStart: Date, episodes: ScheduledEpisodeView[]): ScheduleDay[] => {
    return Array.from({ length: daysInWeek }, (_, dayOffset): ScheduleDay => {
        const date = addDays(weekStart, dayOffset);
        const dayEpisodes = episodes.filter((episode) => isSameDay(episode.airDateTime, date));

        return {
            date,
            episodes: sortEpisodesByAirTime(dayEpisodes),
        };
    });
};

export const scheduleRepository = {
    findWeek(weekStart: Date, weekStartsOn: WeekStartDay, filterStatus: ScheduleFilterStatus = 'all'): ScheduleDay[] {
        const normalizedWeekStart = getWeekStart(weekStart, weekStartsOn);
        const weekEnd = addWeeks(normalizedWeekStart, 1);

        const weekEpisodes = mockScheduledEpisodes
            .filter(
                (episode) =>
                    isDateInRange(episode.airDateTime, normalizedWeekStart, weekEnd) &&
                    matchesFilter(episode, filterStatus),
            )
            .map(hydrateScheduledEpisode);

        return createScheduleDays(normalizedWeekStart, weekEpisodes);
    },
};
