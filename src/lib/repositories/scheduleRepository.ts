import { mockScheduledEpisodes } from '@lib/mock/schedule';
import type { ScheduleDay, ScheduledEpisode, ScheduleFilterStatus, WeekStartDay } from '@lib/types/schedule';

const daysInWeek = 7;
const millisecondsInDay = 24 * 60 * 60 * 1000;

const startOfDay = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const addDays = (date: Date, days: number): Date => {
    return new Date(startOfDay(date).getTime() + days * millisecondsInDay);
};

const isSameDay = (left: Date, right: Date): boolean => {
    return startOfDay(left).getTime() === startOfDay(right).getTime();
};

const isDateInRange = (date: Date, start: Date, end: Date): boolean => {
    const time = date.getTime();

    return time >= start.getTime() && time < end.getTime();
};

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
        const dayStart = startOfDay(date);
        const dayOfWeek = dayStart.getDay();

        const offset = weekStartsOn === 'monday' ? (dayOfWeek === 0 ? -6 : 1 - dayOfWeek) : -dayOfWeek;

        return addDays(dayStart, offset);
    },

    addWeeks(date: Date, weeks: number): Date {
        return addDays(date, weeks * daysInWeek);
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
