import { mockScheduledEpisodes } from '@lib/mock/schedule';
import type { ScheduleDay, ScheduledEpisode, ScheduleFilterStatus, WeekStartDay } from '@lib/types/schedule';
import { addDays, addWeeks, daysInWeek, getWeekStart, isDateInRange, isSameDay } from '@lib/utils/date';

const sortEpisodesByAirTime = (episodes: ScheduledEpisode[]): ScheduledEpisode[] => {
    return [...episodes].sort((left, right) => left.airDateTime.getTime() - right.airDateTime.getTime());
};

const matchesFilter = (episode: ScheduledEpisode, filterStatus: ScheduleFilterStatus): boolean => {
    if (filterStatus === 'all') {
        return true;
    }

    if (filterStatus === 'not-in-library') {
        return episode.libraryStatus === undefined;
    }

    return episode.libraryStatus === filterStatus;
};

const createScheduleDays = (weekStart: Date, episodes: ScheduledEpisode[]): ScheduleDay[] => {
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
    getWeekStart(date: Date, weekStartsOn: WeekStartDay): Date {
        return getWeekStart(date, weekStartsOn);
    },

    addWeeks(date: Date, weeks: number): Date {
        return addWeeks(date, weeks);
    },

    isCurrentDay(date: Date, currentDate: Date = new Date()): boolean {
        return isSameDay(date, currentDate);
    },

    findWeek(weekStart: Date, weekStartsOn: WeekStartDay, filterStatus: ScheduleFilterStatus = 'all'): ScheduleDay[] {
        const normalizedWeekStart = this.getWeekStart(weekStart, weekStartsOn);
        const weekEnd = this.addWeeks(normalizedWeekStart, 1);

        const weekEpisodes = mockScheduledEpisodes.filter(
            (episode) =>
                isDateInRange(episode.airDateTime, normalizedWeekStart, weekEnd) &&
                matchesFilter(episode, filterStatus),
        );

        return createScheduleDays(normalizedWeekStart, weekEpisodes);
    },
};
