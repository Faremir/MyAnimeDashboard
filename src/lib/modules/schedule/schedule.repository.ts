import { type AnimeRepository, animeRepository } from '@lib/modules/anime';
import type { WeekStartDay } from '@lib/shared/utils/date';
import { addDays, addWeeks, getWeekStart, isDateInRange, isSameDay } from '@lib/shared/utils/date';

import { mockSchedule } from './schedule.mock';
import type {
    ScheduleDay,
    ScheduledEpisodeReference,
    ScheduledEpisodeView,
    ScheduleFilterStatus,
    ScheduleWeekQuery,
    ScheduleWeekView,
} from './schedule.types';

class ScheduleRepositoryImpl implements ScheduleRepository {
    public constructor(
        private readonly scheduledEpisodes: ScheduledEpisodeReference[],
        private readonly weekStartsOn: WeekStartDay,
        private readonly animeRepository: AnimeRepository,
    ) {}

    public findScheduleWeek(query: ScheduleWeekQuery = {}): ScheduleWeekView {
        const { date = new Date(), filterStatus = 'all' } = query;

        const weekStart = getWeekStart(date, this.weekStartsOn);
        const weekEndExclusive = addWeeks(weekStart, 1);
        const weekEnd = addDays(weekEndExclusive, -1);

        const weekEpisodes = this.scheduledEpisodes
            .filter(
                (episode) =>
                    isDateInRange(episode.airDateTime, weekStart, weekEndExclusive) &&
                    this.matchesFilter(episode, filterStatus),
            )
            .map((episode) => this.hydrateScheduledEpisode(episode));

        const days = this.createScheduleDays(weekStart, weekEpisodes);

        return {
            startDate: weekStart,
            endDate: weekEnd,
            days,
            episodeCount: weekEpisodes.length,
        };
    }

    private hydrateScheduledEpisode(episode: ScheduledEpisodeReference): ScheduledEpisodeView {
        return {
            ...episode,
            anime: this.animeRepository.getAnime(episode.animeId),
        };
    }

    private matchesFilter(episode: ScheduledEpisodeReference, filterStatus: ScheduleFilterStatus): boolean {
        if (filterStatus === 'all') {
            return true;
        }

        if (filterStatus === 'not-in-library') {
            return episode.libraryStatus === undefined;
        }

        return episode.libraryStatus === filterStatus;
    }

    private sortEpisodesByAirTime(episodes: ScheduledEpisodeView[]): ScheduledEpisodeView[] {
        return [...episodes].sort((left, right) => left.airDateTime.getTime() - right.airDateTime.getTime());
    }

    private createScheduleDays(weekStart: Date, episodes: ScheduledEpisodeView[]): ScheduleDay[] {
        const scheduleDays: ScheduleDay[] = [];

        for (let dayOffset = 0; dayOffset < 7; dayOffset += 1) {
            const date = addDays(weekStart, dayOffset);
            const dayEpisodes = episodes.filter((episode) => isSameDay(episode.airDateTime, date));

            scheduleDays.push({
                date,
                episodes: this.sortEpisodesByAirTime(dayEpisodes),
            });
        }

        return scheduleDays;
    }
}

/**
 *
 */
export interface ScheduleRepository {
    /**
     *
     * @param query
     */
    findScheduleWeek(query?: ScheduleWeekQuery): ScheduleWeekView;
}

export const scheduleRepository = new ScheduleRepositoryImpl(mockSchedule, 'monday', animeRepository);
