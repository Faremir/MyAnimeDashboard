import { mockScheduledEpisodes } from '@lib/mock/schedule';
import type { ScheduleDay, ScheduledEpisode } from '@lib/types/schedule';

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

const sortEpisodesByAirTime = (episodes: ScheduledEpisode[]): ScheduledEpisode[] => {
    return [...episodes].sort((left, right) => left.airDateTime.getTime() - right.airDateTime.getTime());
};

export const scheduleRepository = {
    findWeek(startDate: Date = new Date('2026-06-15T00:00:00')): ScheduleDay[] {
        const weekStart = startOfDay(startDate);

        return Array.from({ length: 7 }, (_, dayOffset): ScheduleDay => {
            const date = addDays(weekStart, dayOffset);
            const episodes = mockScheduledEpisodes.filter((episode) => isSameDay(episode.airDateTime, date));

            return {
                date,
                episodes: sortEpisodesByAirTime(episodes),
            };
        });
    },
};
